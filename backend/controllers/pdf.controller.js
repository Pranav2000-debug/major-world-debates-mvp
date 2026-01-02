import { Pdf } from "../models/pdf.model.js";
import { ApiResponse, asyncHandler, ApiError } from "../utils/utilBarrel.js";
import { v2 as cloudinary } from "cloudinary";

// get all pdfs for dasboard and cleanup if non debate and consumed
export const getMyPdfs = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // find non debate pdfs that have been consumed
  const toCleanup = await Pdf.find({
    user: userId,
    isConsumed: true,
    status: "completed",
    "aiResult.gate.isDebate": false,
  }).select("_id publicId");

  // delete from cloud all non debates
  await Promise.allSettled(toCleanup.map((pdf) => cloudinary.uploader.destroy(pdf.publicId, { resource_type: "image" })));

  // deleting from DB via id
  if (toCleanup.length > 0) {
    await Pdf.deleteMany({
      _id: { $in: toCleanup.map((p) => p._id) },
    });
  }
  // then return all correct ones
  const pdfs = await Pdf.find({ user: userId }).sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, { pdfs }, "PDFs fetched"));
});

// get single pdf for summary page
export const getSinglePdf = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const pdf = await Pdf.findOne({
    _id: id,
    user: req.user._id,
  });

  if (!pdf) throw new ApiError(404, "PDF not found");

  return res.status(200).json(new ApiResponse(200, { pdf }, "PDF fetched"));
});

// to mark as consumed. cleanup db controller
export const markPdfAsConsumed = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const pdf = await Pdf.findOne({
    _id: id,
    user: req.user._id,
  });

  if (!pdf) {
    throw new ApiError(404, "PDF not found");
  }

  if (!pdf.isConsumed) {
    pdf.isConsumed = true;
    await pdf.save();
  }

  return res.status(200).json(new ApiResponse(200, null, "PDF marked as consumed"));
});
