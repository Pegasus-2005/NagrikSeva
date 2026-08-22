import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { queryKnowledgeBase, resolveCanonicalState } from "./data/knowledgeBase.js";
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
    const { description, category, state } = req.body;
    const results = queryKnowledgeBase(description || "", category || "other", state);
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

    const canonicalState = resolveCanonicalState(state);

    // 1. Local RAG lookup (strictly filtered by selected state)
    const matchedChunks = queryKnowledgeBase(description, category, canonicalState);
    const retrievedContext = matchedChunks
      .map(
        (chunk) =>
          `[Ref Source ID: ${chunk.id} | State Jurisdiction: ${chunk.state} | Source Document: ${chunk.source} | Section: ${chunk.section} | Clause/Regulation: ${chunk.clause}]\nContent: "${chunk.content}"`
      )
      .join("\n\n");

    // 2. Department routing
    const stateObj =
      DEPARTMENTS_DIRECTORY[canonicalState] || DEPARTMENTS_DIRECTORY["National/General"];
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
            "The citizen wrote their issue in Bengali or Romanized Bengali. You MUST translate/rewrite their raw description into clear, formal English for the COMPLAINT_DOCUMENT and RTI_DOCUMENT. Write CITIZEN_SUMMARY in natural, simple Bengali (বাংলা) that a village resident can easily understand.";
        } else if (language === "hi") {
          languageNote =
            "The citizen wrote their issue in Hindi or Romanized Hindi. You MUST translate/rewrite their raw description into clear, formal English for the COMPLAINT_DOCUMENT and RTI_DOCUMENT. Write CITIZEN_SUMMARY in simple, respectful Hindi (हिन्दी).";
        } else if (language === "mr") {
          languageNote =
            "The citizen wrote their issue in Marathi or Romanized Marathi. You MUST translate/rewrite their raw description into clear, formal English for the COMPLAINT_DOCUMENT and RTI_DOCUMENT. Write CITIZEN_SUMMARY in simple, respectful Marathi (मराठी).";
        } else {
          languageNote =
            "Draft all three documents in formal, legally appropriate English. Rewrite the citizen's raw description into clear, formal prose.";
        }

        const prompt = `You are 'NagrikSeva', an expert Indian legal document drafter specializing in civic grievance complaints, RTI applications, and citizen empowerment.

YOUR CRITICAL RESPONSIBILITIES:
1. UNDERSTAND THE CITIZEN'S ISSUE: The citizen may have typed in ANY language — English, Bengali, Hindi, Marathi, or even Romanized versions (e.g. "amar area te jol ashche na" = "water is not coming in my area"). You must UNDERSTAND the meaning regardless of script or language.
2. TRANSLATE & FORMALIZE: Rewrite their raw issue description into a formal, professional English complaint paragraph. NEVER copy-paste their raw text as-is into the formal letter. The complaint letter must read as if written by a professional legal advocate.
3. ABSOLUTE STATUTORY JURISDICTION RULE (CRITICAL):
   - You are generating documents STRICTLY for the state/jurisdiction: "${canonicalState}".
   - You MUST cite ONLY the clauses, acts, and municipal rules provided in the RAG context below for ${canonicalState} (or central acts like RTI Act 2005).
   - STRICT NEGATIVE CONSTRAINT: If this petition is for Maharashtra, NEVER cite Kolkata Municipal Corporation (KMC), West Bengal Electricity Regulatory Commission (WBERC), West Bengal Municipal Service Rules, or any West Bengal laws.
   - STRICT NEGATIVE CONSTRAINT: If this petition is for West Bengal, NEVER cite Brihanmumbai Municipal Corporation (BMC), Maharashtra Right to Public Services Act (RTS Maharashtra), MERC, or any Maharashtra laws.
   - Any document violating this state separation is legally invalid.
4. USE ACCURATE DETAILS: Use the exact duration the citizen reported. If they said "4 din" or "4 days" or "1-4 weeks", write the accurate period — do NOT substitute a different range.

Citizen Input:
- State Jurisdiction: ${canonicalState}
- City/District: ${city || "General municipal area"}
- Category: ${category.replace(/_/g, " ")}
- Citizen's Raw Issue (may be in any language/script): "${description}"
- Duration of Problem: ${duration}
- Previous Reference No: ${previous_ref || "None — first formal petition"}
- Document Type Requested: ${document_type}
- Citizen Details:
${citizenSignatureDetails}

Department to Address:
- Officer: ${deptInfo ? deptInfo.designation : "The Executive Engineer"}
- Department: ${deptInfo ? deptInfo.departmentName : "Public Grievances Department"}
- Address: ${deptInfo ? deptInfo.address : "Municipal Office HQ, " + canonicalState}
- Helpline: ${deptInfo ? deptInfo.helpline : "1800-XXX-XXXX"}
- SLA Guarantee: ${deptInfo ? deptInfo.expectedResolutionDays + " working days" : "As per Citizen Charter"}

STATUTORY & LEGAL CONTEXT FROM RAG (cite these in the complaint strictly for ${canonicalState}):
---------
${retrievedContext || "No specific statutory context found. Use general RTI Act 2005 and Citizen Charter provisions."}
---------

LANGUAGE INSTRUCTION:
${languageNote}

OUTPUT FORMAT — produce exactly these three sections with these exact headers:

# COMPLAINT_DOCUMENT
A formal grievance letter dated ${todayDate}, addressed to the department officer above. Must include:
- Formal subject line
- A clear, professionally rewritten paragraph explaining the citizen's issue (translated from their raw input)
- Duration and impact on residents
- At least 2-3 statutory citations from the RAG context above (strictly for ${canonicalState})
- A prayer/relief section
- Citizen's signature block

# RTI_DOCUMENT  
A formal RTI application under Section 6(1) of the RTI Act 2005, seeking:
- Maintenance logbooks and work orders for the past 6 months
- Action Taken Report on this issue
- Name and contact of the accountable officer
- Budget allocation details

# CITIZEN_SUMMARY
Simple step-by-step filing instructions for the citizen in their selected language. Include how to print, where to submit, what fee stamp to attach, and the helpline number to call if unresolved.`;

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
      // Collect ALL matched RAG citations strictly for the canonical state
      const filteredChunks = matchedChunks.filter((c) => {
        if (canonicalState === "West Bengal") return c.state === "West Bengal" || c.state === "National";
        if (canonicalState === "Maharashtra") return c.state === "Maharashtra" || c.state === "National";
        return c.state === "National";
      });

      const ragCitations = filteredChunks.length > 0
        ? filteredChunks.slice(0, 3).map((chunk, i) =>
            `${i + 1}. As per ${chunk.source}, ${chunk.section} (${chunk.clause}):\n   "${chunk.content}"`
          ).join("\n\n")
        : `1. As per the Citizen Charter and Right to Public Services Standards, Public Service Standard (Clause 3.1):\n   "Time-bound redressal of civic grievance within statutory timeframe."`;

      const deptDesignation = deptInfo
        ? deptInfo.designation
        : "The Executive Officer / Municipal Commissioner";
      const deptName = deptInfo
        ? deptInfo.departmentName
        : "Public Relations & Grievances Department";
      const deptAddress = deptInfo
        ? deptInfo.address
        : `${city || "Municipal Office"}, ${canonicalState}`;
      const slaDays = deptInfo ? deptInfo.expectedResolutionDays : 3;
      const helpline = deptInfo?.helpline || "1800-XXX-XXXX";

      let summaryLangBlock = "";
      if (language === "bn") {
        summaryLangBlock = `১. আবেদনপত্রটির ২টি কপি প্রিন্ট করে সই করুন।\n২. ১০ টাকার কোর্ট ফি স্ট্যাম্প বা পোস্টাল অর্ডার যুক্ত করুন (বিপিএল হলে সম্পূর্ণ ছাড়)।\n৩. স্থানীয় ${deptName} দপ্তরে জমা দিয়ে রিসিভিং কপিতে সিলমোহর নিন।\n৪. ${slaDays} কর্মদিবসের মধ্যে সমাধান না হলে বিভাগীয় হেল্পলাইন ${helpline}-এ যোগাযোগ করুন।`;
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

SUBJECT: FORMAL GRIEVANCE REGARDING ${category.toUpperCase().replace(/_/g, " ")} AT ${(city || state).toUpperCase()}, ${state.toUpperCase()}

Respected Sir/Madam,

I, the undersigned, a permanent resident of ${citizen_address || city || state}, hereby wish to bring to your urgent notice the following civic grievance that has been causing severe hardship to the residents of our locality.

DETAILS OF GRIEVANCE:
The ${category.replace(/_/g, " ")} service in our ward/area has been severely disrupted. As described by the affected citizen: "${description}". This disruption has persisted for a period of ${duration}, causing significant inconvenience and distress to all residents in the vicinity.

STATUTORY AND CITIZEN CHARTER GROUNDS:
The following statutory provisions and citizen charter clauses are directly applicable to this grievance:

${ragCitations}

The above provisions clearly mandate that the concerned department must address and resolve such issues within ${slaDays} working days. The continued failure to act constitutes a violation of the Citizen Charter commitments and the statutory Right to Public Services standards.

PRAYER / RELIEF SOUGHT:
In view of the above, I respectfully and urgently request your good office to:
(a) Immediately depute an inspection team to assess the ground situation;
(b) Carry out all necessary remedial works to restore the ${category.replace(/_/g, " ")} service without further delay;
(c) Provide a written acknowledgment of this complaint with a reference number and expected timeline for resolution;
(d) Take disciplinary action against any officer found negligent in discharging their duties.

I trust that your office will take prompt corrective action in this matter.

Yours faithfully,

${citizenSignatureDetails}`;

      const rtiDoc = `FORM OF APPLICATION FOR SEEKING INFORMATION UNDER SECTION 6(1) OF THE RTI ACT, 2005

To,
The Public Information Officer (PIO)
Office of ${deptName}
${deptAddress}

Subject: Application under the Right to Information Act, 2005

1. Full Name of the Applicant: ${citizen_name || "[Your Full Name]"}
2. Full Postal Address: ${citizen_address || "[Full Postal Address with Ward/PIN]"}
3. Contact Phone Number: ${citizen_phone || "[Mobile Number]"}

4. Particulars of Information Required:
   a. Certified copies of daily maintenance logbooks and work orders pertaining to ${category.replace(/_/g, " ")} services in ${city || "our ward"} for the last 6 months.
   b. Status report and official Action Taken Report (ATR) on all citizen complaints received regarding: "${description}".
   c. Name, designation, and official contact details of the officer directly accountable for resolving ${category.replace(/_/g, " ")} issues within the statutory ${slaDays}-day SLA period as per the Citizen Charter.
   d. Certified copies of budget allocation statements, contractor payment vouchers, and tender documents for all ${category.replace(/_/g, " ")} repair/maintenance works undertaken in the last 12 months in this ward.
   e. Details of any pending complaints or unresolved grievances related to ${category.replace(/_/g, " ")} in our area, along with reasons for non-resolution.

5. Application Fee:
   ${citizen_bpl ? `* Exempt from application fee under Section 7(5) of RTI Act 2005 as a Below Poverty Line (BPL) card holder (Card No: ${citizen_bpl}). Copy of BPL card enclosed herewith.` : `* Application fee of ₹10/- (Rupees Ten Only) affixed herewith via Court Fee Stamp / Indian Postal Order payable to the PIO.`}

6. Preferred Mode of Information: Hard copy / Certified photocopy at the above postal address.

Place: ${city}, ${state}
Date: ${todayDate}

Signature of Applicant: _____________________
Name: ${citizen_name || "[Your Full Name]"}`;

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
