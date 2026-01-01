import { Pdf } from "../models/pdf.model.js";
import { ApiResponse, asyncHandler } from "../utils/utilBarrel.js";

export const getMyPdfs = asyncHandler(async (req, res) => {
  const pdfs = await Pdf.find({ user: req.user._id }).sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, { pdfs }, "PDFs fetched"));
});

export const getSinglePdf = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const pdf = await Pdf.findOne({
    _id: id,
    user: req.user._id,
  });

  if (!pdf) throw new ApiError(404, "PDF not found");

  return res.status(200).json(new ApiResponse(200, { pdf }, "PDF fetched"));
});
