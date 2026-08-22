import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { queryKnowledgeBase } from "./data/knowledgeBase.js";
import { DEPARTMENTS_DIRECTORY } from "./data/departments.js";

dotenv.config();

const app = express();
app.use(express.json());

// ---------------------------------------------------------------------------
// In-memory database (Vercel is stateless serverless – fs is not available).
// On local dev the data persists in-process per session.
// ---------------------------------------------------------------------------
let inMemoryDb: { users: Record<string, any>; complaints: any[] } = {
  users: {},
  complaints: [],
};

// Try to load fs-based persistence only when running in a real Node.js process
// (i.e. local dev or a self-hosted server). Vercel serverless will skip this.
let fsPersist: {
  read: () => typeof inMemoryDb;
  write: (data: typeof inMemoryDb) => void;
} | null = null;

try {
  // Use createRequire so this is CJS-compatible (no top-level await needed)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const fs = require("fs") as typeof import("fs");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const path = require("path") as typeof import("path");
  const DB_FILE = path.resolve(process.cwd(), ".nagrik_db.json");

  fsPersist = {
    read: () => {
      try {
        if (fs.existsSync(DB_FILE)) {
          return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
        }
      } catch (e) {
        console.error("Error reading database:", e);
      }
      return { users: {}, complaints: [] };
    },
    write: (data) => {
      try {
        fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
      } catch (e) {
        console.error("Error writing database:", e);
      }
    },
  };

  // Hydrate in-memory from file on startup
  inMemoryDb = fsPersist.read();
} catch {
  // Running in Vercel serverless or restricted runtime – use in-memory only
  console.log("File system not available – using in-memory store.");
}

function readDatabase() {
  return inMemoryDb;
}

function writeDatabase(data: typeof inMemoryDb) {
  inMemoryDb = data;
  fsPersist?.write(data);
}

// ---------------------------------------------------------------------------
// API Endpoint: Query Knowledge Base
// ---------------------------------------------------------------------------
app.post("/api/kb/query", (req, res) => {
  try {
    const { description, category } = req.body;
    const results = queryKnowledgeBase(description || "", category || "other");
    res.json({ results });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// API Endpoint: User Profile Save/Get
// ---------------------------------------------------------------------------
app.post("/api/user/profile", (req, res) => {
  try {
    const { phone, profile } = req.body;
    if (!phone) {
      return res.status(400).json({ error: "Phone number required" });
    }
    const db = readDatabase();
    db.users[phone] = {
      ...profile,
      phone,
      updatedAt: new Date().toISOString(),
    };
    writeDatabase(db);
    res.json({ success: true, user: db.users[phone] });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/user/profile/:phone", (req, res) => {
  try {
    const db = readDatabase();
    const user = db.users[req.params.phone];
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ success: true, user });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// API Endpoint: Save / Retrieve User Complaints
// ---------------------------------------------------------------------------
app.post("/api/user/complaints", (req, res) => {
  try {
    const { complaint } = req.body;
    if (!complaint) {
      return res.status(400).json({ error: "Complaint data required" });
    }
    const db = readDatabase();
    const record = {
      ...complaint,
      id: complaint.id || `NS-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
    };
    db.complaints.unshift(record);
    writeDatabase(db);
    res.json({ success: true, record });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/user/complaints/:phone", (req, res) => {
  try {
    const db = readDatabase();
    const phone = req.params.phone;
    const userComplaints = db.complaints.filter((c: any) => c.phone === phone);
    res.json({ success: true, complaints: userComplaints });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------------------------------------------------------
// API Endpoint: Document & RTI compilation with Gemini RAG
// ---------------------------------------------------------------------------
app.post("/api/generate-document", async (req, res) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY || "";

    const {
      state,
      city,
      category,
      description,
      duration,
      previous_ref,
      document_type,
      language,
      citizen_name,
      citizen_address,
      citizen_phone,
      citizen_bpl,
    } = req.body;

    if (!state || !category || !description) {
      return res
        .status(400)
        .json({ error: "Missing state, category or description." });
    }

    // 1. Local RAG lookup
    const matchedChunks = queryKnowledgeBase(description, category);
    const retrievedContext = matchedChunks
      .map(
        (chunk) =>
          `[Ref Source ID: ${chunk.id} | Source Document: ${chunk.source} | Section: ${chunk.section} | Clause/Regulation: ${chunk.clause}]\nContent: "${chunk.content}"`
      )
      .join("\n\n");

    // 2. Department routing
    const stateObj =
      DEPARTMENTS_DIRECTORY[state] || DEPARTMENTS_DIRECTORY["National/General"];
    const deptInfo =
      stateObj && stateObj[category]
        ? stateObj[category]
        : DEPARTMENTS_DIRECTORY["National/General"][category];

    const todayDate = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const citizenSignatureDetails = citizen_name
      ? `Applicant Name: ${citizen_name}\nAddress: ${citizen_address || "[Full Postal Address]"}\nContact Phone: ${citizen_phone || "[Mobile Number]"}\nBPL Status: ${citizen_bpl ? `BPL Card Holder (Card No: ${citizen_bpl})` : "General Category"}`
      : `Applicant Name: [Your Full Name]\nAddress: [Full Postal Address with Ward/PIN]\nContact Phone: [Mobile Number]`;

    let responseText = "";

    // ---------------------------------------------------------------------------
    // Gemini AI generation (only when a real API key is present)
    // ---------------------------------------------------------------------------
    if (apiKey && apiKey.length > 20 && apiKey !== "MY_GEMINI_API_KEY") {
      try {
        const ai = new GoogleGenAI({ apiKey });

        let languageNote = "";
        if (language === "bn") {
          languageNote =
            "The user selected Bengali (বাংলা). Draft COMPLAINT_DOCUMENT and RTI_DOCUMENT in formal legal English. Write CITIZEN_SUMMARY in natural, simple Bengali (বাংলা) that a village resident can easily understand.";
        } else if (language === "hi") {
          languageNote =
            "The user selected Hindi (हिन्दी). Draft COMPLAINT_DOCUMENT and RTI_DOCUMENT in formal legal English. Write CITIZEN_SUMMARY in simple, respectful Hindi (हिन्दी).";
        } else if (language === "mr") {
          languageNote =
            "The user selected Marathi (मराठी). Draft COMPLAINT_DOCUMENT and RTI_DOCUMENT in formal legal English. Write CITIZEN_SUMMARY in simple, respectful Marathi (मराठी).";
        } else {
          languageNote =
            "Draft all three documents in formal, legally appropriate English.";
        }

        const prompt = `You are 'NagrikSeva', an Indian citizen empowerment and administrative drafting assistant.
Generate legally structured, professional complaint letters and RTI applications representing the citizen.

Citizen Input Parameters:
- State/Region: ${state}
- City/District: ${city || "General municipal area"}
- Category: ${category}
- Issue Description: "${description}"
- Problem Duration: ${duration}
- Previous Ref: ${previous_ref || "None registered yet"}
- Requested Document: ${document_type}
- Citizen Info:
${citizenSignatureDetails}

Department Details:
- Designation: ${deptInfo ? deptInfo.designation : "The Executive Engineer"}
- Department: ${deptInfo ? deptInfo.departmentName : "Public Grievances Department"}
- Address: ${deptInfo ? deptInfo.address : "Municipal Office HQ, " + state}
- Helpline: ${deptInfo ? deptInfo.helpline : "1800-XXX-XXXX"}
- SLA: ${deptInfo ? deptInfo.expectedResolutionDays + " Days" : "As per State Citizens Charter"}

Regional Grounding Context:
---------
${retrievedContext}
---------

Drafting Requirements:
1. Output exactly three sections with these exact headers on their own lines:
   # COMPLAINT_DOCUMENT
   # RTI_DOCUMENT
   # CITIZEN_SUMMARY
2. ${languageNote}
3. Include specific statutory citations from the context above.
4. Make the language strong but respectful.`;

        const content = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: prompt,
          config: { temperature: 0.2 },
        });

        responseText = content.text || "";
      } catch (geminiErr) {
        console.warn(
          "Gemini generation failed, using legal template fallback:",
          geminiErr
        );
      }
    }

    // ---------------------------------------------------------------------------
    // Deterministic Statutory Template Engine Fallback
    // (runs when no API key or Gemini call failed)
    // ---------------------------------------------------------------------------
    if (!responseText) {
      const topRule = matchedChunks[0] || {
        source: "Citizen Charter and Right to Public Services Standards",
        section: "Public Service Standard",
        clause: "Clause 3.1 / RTS Act",
        content:
          "Time-bound redressal of civic grievance within statutory timeframe.",
      };

      const deptDesignation = deptInfo
        ? deptInfo.designation
        : "The Executive Officer / Municipal Commissioner";
      const deptName = deptInfo
        ? deptInfo.departmentName
        : "Public Relations & Grievances Department";
      const deptAddress = deptInfo
        ? deptInfo.address
        : `${city || "Municipal Office"}, ${state}`;
      const slaDays = deptInfo ? deptInfo.expectedResolutionDays : 3;
      const helpline = deptInfo?.helpline || "1800-XXX-XXXX";

      let summaryLangBlock = "";
      if (language === "bn") {
        summaryLangBlock = `১. আবেদনপত্রটির ২টি কপি প্রিন্ট করে সই করুন।\n২. ১০ টাকার কোর্ট ফি স্ট্যাম্প বা পোস্টাল অর্ডার যুক্ত করুন (বিপিএল হলে সম্পূর্ণ ছাড়)।\n৩. স্থানীয় ${deptName} দপ্তরে জমা দিয়ে রিসিভিং কপিতে সিলমোহর নিন।\n৪. সমাধান না হলে বিভাগীয় হেল্পলাইন ${helpline}-এ যোগাযোগ করুন।`;
      } else if (language === "hi") {
        summaryLangBlock = `1. आवेदन पत्र की 2 प्रतियां प्रिंट करें और हस्ताक्षर करें।\n2. ₹10 का कोर्ट फीस स्टैंप या पोस्टल ऑर्डर लगाएं (बीपीएल धारकों को पूर्ण छूट)।\n3. स्थानीय ${deptName} कार्यालय में जमा करके पावती रसीद लें।\n4. ${slaDays} दिनों में समाधान न होने पर हेल्पलाइन ${helpline} पर संपर्क करें।`;
      } else if (language === "mr") {
        summaryLangBlock = `१. अर्जाच्या २ प्रती प्रिंट करून स्वाक्षरी करा.\n२. १० रुपयांचे कोर्ट फी स्टॅम्प किंवा पोस्टल ऑर्डर जोडा (BPL धारकांना मोफत).\n३. स्थानिक ${deptName} कार्यालयात जमा करून पोहोच पावतीवर शिक्का घ्या.\n४. ${slaDays} दिवसांत निवारण न झाल्यास हेल्पलाइन ${helpline} वर तक्रार नोंदवा.`;
      } else {
        summaryLangBlock = `1. Print 2 copies of the application and affix your signature.\n2. Attach a ₹10 Court Fee Stamp or Indian Postal Order (exempt for BPL holders).\n3. Submit at the local ${deptName} office and obtain a receiving stamp on your copy.\n4. If unresolved within ${slaDays} working days, call helpline ${helpline}.`;
      }

      const complaintDoc = `Date: ${todayDate}

To,
${deptDesignation}
${deptName}
${deptAddress}

SUBJECT: FORMAL GRIEVANCE REGARDING ${category.toUpperCase().replace(/_/g, " ")} AT ${(city || state).toUpperCase()}

Respected Sir/Madam,

I am writing to formally lodge an urgent civic complaint regarding the ongoing issue in our locality as detailed below:

1. Location of Grievance: ${city}, ${state}
2. Nature of Problem: ${description}
3. Duration of Neglect/Delay: ${duration}
4. Prior Complaint Reference: ${previous_ref || "First formal written petition"}

STATUTORY AND CITIZEN CHARTER GROUNDS:
As per the ${topRule.source}, ${topRule.section} (${topRule.clause}):
"${topRule.content}"

Under the Citizen Charter standards, the prescribed timeline for resolving this nature of municipal issue is ${slaDays} working days. The continued neglect is causing significant distress to residents of our locality.

PRAYER / RELIEF SOUGHT:
I respectfully request your office to immediately dispatch an inspection team, carry out necessary remedial works, and restore the public service without further delay.

Yours faithfully,

${citizenSignatureDetails}`;

      const rtiDoc = `FORM OF APPLICATION FOR SEEKING INFORMATION UNDER SECTION 6(1) OF THE RTI ACT, 2005

To,
The Public Information Officer (PIO)
Office of ${deptName}
${deptAddress}

1. Full Name of the Applicant: ${citizen_name || "[Your Full Name]"}
2. Full Postal Address: ${citizen_address || "[Full Postal Address with Ward/PIN]"}
3. Contact Phone Number: ${citizen_phone || "[Mobile Number]"}

4. Particulars of Information Required:
   a. Certified copies of daily logbooks and work orders for ${category.replace(/_/g, " ")} maintenance in ${city} for the last 6 months.
   b. Status and Action Taken Report (ATR) on citizen complaints regarding: "${description}".
   c. Name, designation, and contact details of the officer accountable for resolving this issue within ${slaDays} days as per the Citizen Charter.
   d. Copies of budget allocation and contractor expenditure vouchers for recent repairs in this ward.

5. Application Fee:
   ${citizen_bpl ? `* Exempt from fee under Section 7(5) RTI Act 2005 (BPL Card No: ${citizen_bpl}).` : `* Application fee of ₹10/- affixed via Court Fee Stamp / Indian Postal Order.`}

Place: ${city}, ${state}
Date: ${todayDate}

Signature of Applicant: _____________________`;

      responseText = `# COMPLAINT_DOCUMENT\n${complaintDoc}\n\n# RTI_DOCUMENT\n${rtiDoc}\n\n# CITIZEN_SUMMARY\n${summaryLangBlock}`;
    }

    res.json({
      rawText: responseText,
      department: deptInfo || null,
      sources: matchedChunks,
    });
  } catch (err: any) {
    console.error("generate-document error:", err);
    res
      .status(500)
      .json({ error: err.message || "Failed to generate document" });
  }
});

export default app;
