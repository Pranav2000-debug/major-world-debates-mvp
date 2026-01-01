import { Pdf } from "../models/pdf.model.js";
import { ApiResponse, asyncHandler } from "../utils/utilBarrel.js";

export const getMyPdfs = asyncHandler(async (req, res) => {
  const pdfs = await Pdf.find({ user: req.user._id }).sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, { pdfs }, "PDFs fetched"));
});

