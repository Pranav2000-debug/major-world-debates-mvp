import express from "express";
import { getCurrentUser } from "../controllers/userController.js";
import { verifyJwtOptional } from "../middleware/verifyOptionalJwt.js";

const userRouter = express.Router();

userRouter.get("/me", verifyJwtOptional, getCurrentUser);

export default userRouter;

