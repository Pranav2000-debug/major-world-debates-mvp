import express from "express";
import { getMyPdfs } from "../controllers/pdf.controller.js";
import { verifyJwt } from "../middleware/authMiddleware.js";

const pdfRouter = express.Router();


pdfRouter.get("/", verifyJwt, getMyPdfs);

export default pdfRouter;