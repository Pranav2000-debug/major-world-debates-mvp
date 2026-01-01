import express from "express";
import { uploadPdf as uploadPdfController } from "../controllers/upload.controller.js";
import { uploadPdf } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/authMiddleware.js";

const uploadRouter = express.Router()

uploadRouter.post("/pdf", verifyJwt, uploadPdf.single("file"), uploadPdfController);

export default uploadRouter;
