import { uploadPdfToCloudinary } from "../cloudinary/cloudinary.js";
import { Pdf } from "../models/pdf.model.js";
import { ApiError, ApiResponse, asyncHandler } from "../utils/utilBarrel.js";
import { v2 as cloudinary } from "cloudinary";

// this controller for route /pdf uploads to cloud and DB
export const uploadPdfController = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "No PDF uploaded");

  const cloudinaryResult = await uploadPdfToCloudinary(req.file.buffer, req.file.originalname);

  if (!cloudinaryResult) throw new ApiError(500, "Failed to upload PDF, retry");

  const uploadDetails = {
    user: req.user._id,
    publicId: cloudinaryResult.public_id,
    pdfUrl: cloudinaryResult.secure_url,
    previewImageUrl: cloudinary.url(cloudinaryResult.public_id, {
      resource_type: "image",
      format: "jpg",
      transformation: [{ page: 1 }, { width: 400, crop: "fit" }],
    }),
    originalName: cloudinaryResult.original_filename,
    size: cloudinaryResult.bytes,
  };

  // DB UPLOAD ERROR, DELETE FROM CLOUD
  let pdfDoc;
  try {
    pdfDoc = await Pdf.create(uploadDetails);
  } catch (error) {
    await cloudinary.uploader.destroy(cloudinaryResult.public_id, {
      resource_type: "auto",
    });
    throw new ApiError(500, "Upload failed, please retry");
  }
  // axios accepts as res.data.data.uploadResult
  return res.status(201).json(new ApiResponse(201, { pdf: pdfDoc }, "Upload successfull"));
});

export const deletePdf = asyncHandler(async (req, res) => {
  const publicId = decodeURIComponent(req.params.publicId);

  const pdf = await Pdf.findOne({
    publicId,
    user: req.user._id,
  });

  if (!pdf) {
    throw new ApiError(404, "PDF not found, cannot delete");
  }

  // delete from cloudinary first
  await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });

  // then delete from DB
  await Pdf.deleteOne({ _id: pdf._id });

  return res.status(200).json(new ApiResponse(200, null, "PDF deleted"));
});
