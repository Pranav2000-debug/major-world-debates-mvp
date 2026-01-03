import { GoogleGenAI } from "@google/genai";
import { ApiError } from "../../utils/ApiError.js";
import { loadPrompt } from "./utils/loadPrompt.js";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateDebateAnalysis({ text }) {
  const basePrompt = loadPrompt("counterDebate.prompt.txt");
  const finalPrompt = basePrompt.replace("{{TEXT}}", text);

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: finalPrompt,
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // disabling chain of thought
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
      throw new Error("Gemini returned non-JSON output");
    }

    return {
      counterDebate: parsedResponse.counterDebate ?? "",
      strengths: parsedResponse.strengths ?? [],
      weaknesses: parsedResponse.weaknesses ?? [],
      grammarNotes: parsedResponse.grammarNotes ?? [],
      rating: Number(parsedResponse.rating) || 0,
      resources: parsedResponse.resources ?? [],
    };
  } catch (error) {
    console.log("Gemini service error!!", error);
    throw new ApiError(500, "AI generation failed");
  }
}
