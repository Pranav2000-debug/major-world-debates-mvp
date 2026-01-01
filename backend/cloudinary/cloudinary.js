import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// cloudinary receives a buffer itself after multer middleware

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadPdfToCloudinary = async (pdfFileBuffer) => {
  try {
    if (!pdfFileBuffer) return null;

    const cloudinaryResult = await new Promise((res, rej) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "mwd-files",
          resource_type: "image",
          use_filename: true,
          unique_filename: true,
        },
        (error, uploadResult) => {
          if (error) return rej(error);
          res(uploadResult);
        }
      );
      uploadStream.end(pdfFileBuffer);
    });
    return cloudinaryResult;
  } catch (error) {
    console.log("uploading image failed", error);
    throw error;
  }
};

/**
  * CLOUDINARY RETURN TYPE
  * {
  asset_id: "b9f0f9a...",
  public_id: "mwd-files/abc123",
  version: 1720000000,
  resource_type: "raw",
  type: "upload",
  format: "pdf",
  bytes: 345678,
  original_filename: "debate",
  secure_url: "https://res.cloudinary.com/.../debate.pdf",
  created_at: "2025-01-01T12:00:00Z"
}

  */
