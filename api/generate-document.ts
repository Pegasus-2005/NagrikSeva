import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { queryKnowledgeBase } from "../src/data/knowledgeBase";
import { DEPARTMENTS_DIRECTORY } from "../src/data/departments";

dotenv.config();

export default async function handler(req: any, res: any) {
  // Allow OPTIONS pre-flight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured on this host. Please configure your environment variable in your Vercel deployment dashboard (Settings > Environment Variables) or verify your API keys.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const {
      state,
      city,
      category,
      description,
      duration,
      previous_ref,
      document_type,
      language
    } = req.body;

    if (!state || !category || !description) {
      return res.status(400).json({ error: "Missing state, category or description." });
    }

    // 1. Local RAG lookup
    const matchedChunks = queryKnowledgeBase(description, category);
    const retrievedContext = matchedChunks
      .map(chunk => `[Ref Source ID: ${chunk.id} | Source Document: ${chunk.source} | Section: ${chunk.section} | Clause/Regulation: ${chunk.clause}]\nContent: "${chunk.content}"`)
      .join("\n\n");

    // 2. Department routing
    const stateObj = DEPARTMENTS_DIRECTORY[state] || DEPARTMENTS_DIRECTORY["National/General"];
    const deptInfo = stateObj[category] || DEPARTMENTS_DIRECTORY["National/General"][category];

    // 3. Multilingual and document-type prompt tailoring
    const languageNote = language === "bn"
      ? "The user requested output in Bengali (বাংলা). Therefore, while the final official COMPLAINT_DOCUMENT and RTI_DOCUMENT should be formatted in standard formal English for actual submittal, you MUST translate the CITIZEN_SUMMARY fully into elegant, highly polished Kolkata-style Bengali (কলকাতা শৈলী বাংলা). Ensure that under the complaint you also provide a short, readable translation explanation in formal Bengali for the user's understanding. Use native, natural administrative terms like 'তথ্য জানার অধিকার আইন ২০০৫' (RTI Act 2005), 'খসড়া' (draft), 'পৌরসংস্থা' (municipal corporation), 'বিদ্যুৎ বিভ্রাট' (power cuts), 'অভিযোগপত্র' (complaint letter) instead of any machine-translated or robotic phrasing."
      : "The user requested output in English. Draft the complaint and RTI documents fully in formal, legally appropriate, and respectful bureaucratic English. Write the summary also in clear and actionable English.";

    const prompt = `
You are 'NagrikSeva' (নাগরিক সেবা), a highly specialized citizen empowerment and grievance drafting model.
Your objective is to generate clear, legally structured, and highly professional complaint letters and/or Right to Information (RTI) applications representing the citizen.

CRITICAL INSTRUCTIONS ON SCOPE AND INTEGRITY:
- You MUST only use and cite facts and rules from the provided grounding context documents below. If the provided context does not have a rule for the specific issue or helpline, advise the user with what is available, but do not hallucinate or make up government sections.
- You are strictly forbidden from writing preambles, introductory conversations, friendly comments, notes, or concluding remarks outside the structured document headers.
- Output ONLY the requested structures under the headers: # COMPLAINT_DOCUMENT, # RTI_DOCUMENT, and # CITIZEN_SUMMARY. 
- You are strictly forbidden from using exclamation marks, informal or colloquial words in English, conversational filler, or decorative bullet points that look like AI-generated list headers.
- Write with the dry, authoritative, and extremely formal persona of a Senior Registrar of Municipal Affairs. Keep everything professional and strictly grounded.

Citizen Input Parameters:
- Selected Indian State/Region: ${state}
- District/City: ${city || "General municipal area"}
- Problem Category: ${category}
- Original User Complaint Description: "${description}"
- Problem Duration/Since: ${duration}
- Previous Complaint Ref ID (if any): ${previous_ref || "None registered yet"}
- Requested Document Format: ${document_type} (options: "complaint", "rti", or "both")

Target Government Department Details:
- Recipient Designation: ${deptInfo ? deptInfo.designation : "The Executive Engineer / Chief Ward Commissioner"}
- Department Name: ${deptInfo ? deptInfo.departmentName : "Public Relations & Grievances Section"}
- Official Headquarter Address: ${deptInfo ? deptInfo.address : "Municipal Corporation Office HQ, " + state}
- Helpline Contact: ${deptInfo ? deptInfo.helpline : "1800-XXX-XXXX"}
- Legal Service SLA Timeline: ${deptInfo ? deptInfo.expectedResolutionDays + " Days" : "As per State Citizens Charter"}

Curated Regional Grounding Context:
---------
${retrievedContext}
---------

Drafting Requirements:
1. Always direct the letter to the correct recipient designation and address specified above.
2. Subject lines must be concise and formal. Reference the exact issues and durations.
3. If "rti" or "both" is specified: Add a dedicated block for Section 6/7 of RTI Act 2005. Formulate 3-4 distinct questions inquiring on status, funds allocated vs. spent on the specific area ward, officer names responsible, and outline a note mentioning payment of Rs 10 court fee / stamp.
4. Grounding and Citations: Explicitly cite sources matching the problem (e.g. citing '${matchedChunks[0]?.source || "Citizen Charter"}' or clauses like '${matchedChunks[0]?.clause || "Section 4"}') inline when discussing resolution deadlines or rights.
5. ${languageNote}
6. Always leave placeholders like [Your Name], [Signature], [Date], [Full Postal Address] at the signatures so the citizen can fill them out easily.
7. Return a structured Markdown formatting with EXACTLY the following clear header markers:

# COMPLAINT_DOCUMENT
(Your generated formal complaint letter matching standard formats, formal salutation, body paragraphs detailing the timeline and citizen charter violations, and signature block)

# RTI_DOCUMENT
(Your generated Right to Information Application under RTI Act 2005, structured perfectly with formal questions, fee notifications, and placeholders - omit this header and content ONLY if document_type is 'complaint' and 'rti' was not requested)

# CITIZEN_SUMMARY
(A clean, bilingual/Bengali/English bulletin outlining 3 action items: How to file, where to post or submit online/offline, helpline contacts, and municipal portal links)
`;

    // Call Gemini 3.5 Flash
    const content = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.2,
      }
    });

    const responseText = content.text || "No document could be drafted. Please check connection.";

    return res.status(200).json({
      rawText: responseText,
      sources: matchedChunks.map(c => ({
        id: c.id,
        source: c.source,
        source_bn: c.source_bn,
        section: c.section,
        section_bn: c.section_bn,
        clause: c.clause,
        clause_bn: c.clause_bn,
        content: c.content,
        content_bn: c.content_bn
      })),
      department: deptInfo || null
    });

  } catch (err: any) {
    console.error("Paperwork Compilation Error:", err);
    return res.status(500).json({ error: err.message || "An error occurred while compiling official drafting paperwork." });
  }
}
