import { Pdf } from "../models/pdf.model.js";
import { generateDebateAnalysis } from "../services/ai/gemini.services.js";
import { extractPdfText } from "../utils/extractPdfText.js";
import { ApiResponse, ApiError, asyncHandler } from "../utils/utilBarrel.js";

export const submitPdfToAI = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const pdf = await Pdf.findOne({
    _id: id,
    user: req.user._id,
  }).select("+extractedText");
  if (!pdf) throw new ApiError(404, "PDF not found, cannot submit to AI");

  if (pdf.status === "processing") {
    throw new ApiError(400, "PDF is already being processed");
  }

  pdf.status = "processing";
  await pdf.save();

  // AI LOGIC
  try {
    const textForAi = pdf.extractedText;
    if (!textForAi.trim()) {
      throw new ApiError(400, "No readable text found in PDF (possibly scanned)");
    }

    const geminiAiResult = await generateDebateAnalysis({ text: textForAi });

    pdf.aiResult = geminiAiResult;
    pdf.status = "completed";
    await pdf.save();
  } catch (error) {
    pdf.status = "failed";
    await pdf.save();
    throw error;
  }

  return res.status(200).json(new ApiResponse(200, { pdf }, "AI processing completed"));
});
