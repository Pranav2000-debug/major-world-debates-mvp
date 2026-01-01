import { uploadPdfToCloudinary } from "../cloudinary/cloudinary.js";
import { ApiError, ApiResponse, asyncHandler } from "../utils/utilBarrel.js";

export const uploadPdf = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, "No PDF uploaded");

  const cloudinaryResult = await uploadPdfToCloudinary(req.file.buffer);

  if (!cloudinaryResult) throw new ApiError(500, "Failed to upload PDF, retry");

  const uploadDetails = {
    publicId: cloudinaryResult.public_id,
    url: cloudinaryResult.secure_url,
    filename: cloudinaryResult.original_filename,
    size: cloudinaryResult.bytes,
  };
  // axios accepts as res.data.data.uploadResult
  return res.status(201).json(new ApiResponse(201, { uploadDetails }, "Upload successfull"));
});
