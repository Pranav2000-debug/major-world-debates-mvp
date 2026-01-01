import { ApiError } from "../../utils/ApiError.js";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
export async function analyzeDebateSutaibility({ text }) {
  // todo
  try {
    if (!text || !text.trim()) throw new ApiError(400, "Empty text provided for debate analysis");

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: ` You are a strict debate suitability classifier.
     Your task:
     Determine whether the given document is suitable for a formal debate.
 
 A document is debate-suitable ONLY if:
 - It presents a clear controversial issue
 - There are at least two opposing viewpoints (explicit or implicit)
 - The issue can reasonably be argued from multiple sides
 
 If the document is NOT debate-suitable:
 - Set isDebate to false
 - Provide a short reason
 - Do NOT invent arguments
 - Do NOT summarize the document
 
 If the document IS debate-suitable:
 - Set isDebate to true
 - Identify the main debate topic concisely
 
 Output rules:
 - Return STRICT JSON only
 - Follow the exact schema
 - Do NOT include markdown
 - Do NOT include extra keys
 
 JSON schema:
 {
   "isDebate": boolean,
   "confidence": number,
   "reason": string,
   "detectedTopic": string | null
 }
 
 Document content:
 """${text}"""
 `,
      config: {
        thinkingConfig: {
          thinkingBudget: -1, // disabling chain of thought
        },
      },
    });
    const rawResponse = response.text;
    const cleanedRawResponse = rawResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(cleanedRawResponse);
    } catch (error) {
      throw new Error("Gemini returned non-JSON output for debate gate");
    }

    // schema validation
    if (
      typeof parsedResponse.isDebate !== "boolean" ||
      typeof parsedResponse.confidence !== "number" ||
      typeof parsedResponse.reason !== "string" ||
      !("detectedTopic" in parsedResponse)
    ) {
      throw new Error("Debate gate response schema mismatch");
    }
    return {
      isDebate: parsedResponse.isDebate,
      confidence: parsedResponse.confidence,
      reason: parsedResponse.reason,
      detectedTopic: parsedResponse.detectedTopic ?? null,
    };
  } catch (error) {
    console.log("Gemini debate gate error!!", error);
    throw new ApiError(500, "Debate suitability analysis failed");
  }
}
