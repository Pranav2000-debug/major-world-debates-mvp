import express from "express";
import { getMyPdfs, getSinglePdf } from "../controllers/pdf.controller.js";
import { verifyJwt } from "../middleware/authMiddleware.js";
import { submitPdfToAI } from "../controllers/submitPdf.controller.js";

const pdfRouter = express.Router();

pdfRouter.get("/", verifyJwt, getMyPdfs);
pdfRouter.get("/:id", verifyJwt, getSinglePdf);
pdfRouter.post("/:id/submit", verifyJwt, submitPdfToAI);

export default pdfRouter;
