import { queryKnowledgeBase } from "../../src/data/knowledgeBase.ts";

export default async function handler(req: any, res: any) {
  // Allow OPTIONS pre-flight as well for any cross-domain requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { description, category } = req.body;
    const results = queryKnowledgeBase(description || "", category || "other");
    return res.status(200).json({ results });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "An error occurred." });
  }
}
