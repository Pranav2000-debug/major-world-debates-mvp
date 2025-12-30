import express from "express";
import { getCurrentUser } from "../controllers/userController.js";
import {verifyJwt} from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/me", verifyJwt, getCurrentUser);

export default userRouter;

