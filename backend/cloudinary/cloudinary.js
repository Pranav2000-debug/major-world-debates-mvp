import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadPdfToCloudinary = async (pdfFileBuffer, originalName) => {
  try {
    // Guard
    if (!pdfFileBuffer || !Buffer.isBuffer(pdfFileBuffer)) {
      return null;
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "mwd-files",
          resource_type: "image",
          use_filename: true,
          filename_override: originalName,
          allowed_formats: ["pdf"],
          unique_filename: true,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      uploadStream.end(pdfFileBuffer);
    });

    return uploadResult;
  } catch (error) {
    console.error("PDF upload to Cloudinary failed:", error);
    throw error;
  }
};
