import { GoogleGenAI } from "@google/genai";
import { ApiError } from "../../utils/ApiError.js";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateDebateAnalysis({ text }) {
  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: ` You are a professional debate analyst.
      You will be given a debate argument written by a user.
      Your task is to critically evaluate it and generate a counter-debate of comparable depth and length.

      IMPORTANT RULES:
      - The counterDebate MUST be approximately the SAME WORD COUNT as the original text (±15%).
      - Maintain a formal, academic debate tone.
      - Do NOT summarize the user's argument.
      - Do NOT agree with the user's position.
      - Directly challenge assumptions, logic, evidence, and framing.
      - Do NOT add emotional language or insults.
      - Do NOT invent facts or sources.

      OUTPUT RULES:
      - Return STRICT JSON only.
      - Do NOT include markdown.
      - Do NOT include extra keys.
      - Do NOT explain your reasoning.

JSON FORMAT (exact):
{
  "counterDebate": string,
  "strengths": string[],
  "weaknesses": string[],
  "grammarNotes": string[],
  "rating": number,
  "resources": { "title": string, "url": string }[]
}

FIELD GUIDELINES:
- counterDebate:
  - Length should closely match the original debate text.
  - Structured, logically coherent paragraphs.
- strengths:
  - List 2-5 genuine strengths of the user's argument.
- weaknesses:
  - List 2-5 substantive weaknesses (logic, evidence, scope, assumptions).
- grammarNotes:
  - Only include real clarity or grammar issues.
  - If none exist, return an empty array.
- rating:
  - Integer from 1 to 10 representing overall debate quality.
- resources:
  - Include ONLY well-known, credible sources.
  - If unsure, return an empty array (do NOT invent links).

      Debate text:
      """${text}"""
      `,
      config: {
        thinkingConfig: {
          thinkingBudget: 0, // disabling chain of thought
        },
      },
    });

    const rawResponse = response.text;
    const cleanedRawResponse = rawResponse.replace(/```json/g, "").replace(/```/g, "").trim();
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
    console.log("Gemini service error!!",error);
    throw new ApiError(500, "AI generation failed");
  }
}
