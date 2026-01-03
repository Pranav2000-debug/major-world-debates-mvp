import express from "express";
import { deletePdf, uploadPdfController } from "../controllers/upload.controller.js";
import { uploadPdf } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/authMiddleware.js";
import { uploadPdfLimiter } from "../middleware/rateLimiter.js";

const uploadRouter = express.Router()

uploadRouter.post("/pdf", verifyJwt, uploadPdfLimiter,uploadPdf.single("file"), uploadPdfController);
uploadRouter.delete("/pdf/:publicId", verifyJwt, deletePdf)

export default uploadRouter;
