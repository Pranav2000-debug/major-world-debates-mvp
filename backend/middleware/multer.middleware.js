import multer from "multer";
import { ApiError } from "../utils/utilBarrel.js";

const storage = multer.memoryStorage();

// file filter to check for PDF ONLY, boiler plate code
const fileFilter = (req, file, cb) => {
  // check for mimeType
  if (file.mimetype !== "application/pdf") {
    return cb(new ApiError(400, "Only PDF files are allowed"), false);
  }
  cb(null, true);
};

export const uploadPdf = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10mb file else reject
  },
  fileFilter,
});

/**
 * USAGE IN ROUTES
 * router.post(
  "/upload",
  verifyJwt,
  uploadPdf.single("file"),
  controllerFn
);

  frontend must upload from input tag formData and .append("file", file) -> comes from state  

  req.file then looks like after multer middleware req.file = {
  fieldname: "file",
  originalname: "debate.pdf",
  mimetype: "application/pdf",
  size: 123456,
  buffer: <Buffer ...> ____ this is what is needed for GEMINI and cloudinary stream upload
};
 */
