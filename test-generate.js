import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
async function testModel(modelName) {
  try {
    const res = await ai.models.generateContent({
      model: modelName,
      contents: "Generate a 1000-word essay about the history of West Bengal water supply.",
    });
    console.log(`${modelName}: SUCCESS`);
  } catch (e) {
    console.log(`${modelName}: FAILED - ${e.message}`);
  }
}

async function main() {
  await testModel("gemini-3.7-flash");
  await testModel("gemini-3.5-flash");
  await testModel("gemini-2.5-flash");
}
main();
