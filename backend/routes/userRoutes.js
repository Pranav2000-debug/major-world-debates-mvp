import express from "express";
import { login, signup, verifyEmail } from "../controllers/userController.js";

const userRouter = express.Router();

// PUBLIC ROUTES *
userRouter.post("/sign-up", signup);
userRouter.post("/log-in", login);

userRouter.get("/verify-email/:verificationToken", verifyEmail);

export default userRouter;
