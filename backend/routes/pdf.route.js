import express from "express";
import { getMyPdfs, getSinglePdf, markPdfAsConsumed } from "../controllers/pdf.controller.js";
import { verifyJwt } from "../middleware/authMiddleware.js";
import { submitPdfToAI } from "../controllers/submitPdf.controller.js";
import { submitPdfToAILimit } from "../middleware/rateLimiter.js";

const pdfRouter = express.Router();

pdfRouter.get("/", verifyJwt, getMyPdfs);
pdfRouter.get("/:id", verifyJwt, getSinglePdf);
pdfRouter.post("/:id/submit", verifyJwt, submitPdfToAILimit,submitPdfToAI);
pdfRouter.patch("/:id/consume", verifyJwt, markPdfAsConsumed);

export default pdfRouter;
