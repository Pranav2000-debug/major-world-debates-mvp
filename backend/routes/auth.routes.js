import express from "express";
import { signup, login, logout, checkAvailability, verifyEmail } from "../controllers/userController.js";
import { verifyJwt } from "../middleware/authMiddleware.js";
import { loginLimiter, signupLimiter, usernameCheckLimiter, verifyEmailLimiter } from "../middleware/rateLimiter.js";

const authRouter = express.Router();

// public
authRouter.post("/sign-up", signupLimiter, signup);
authRouter.post("/log-in", loginLimiter ,login);
authRouter.get("/verify-email/:verificationToken", verifyEmailLimiter ,verifyEmail);

authRouter.get("/check-availability", usernameCheckLimiter, checkAvailability);

// protected
authRouter.post("/logout", verifyJwt, logout);

export default authRouter;
