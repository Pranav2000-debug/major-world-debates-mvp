import express from "express";
import { signup, login, logout, checkAvailability, verifyEmail } from "../controllers/userController.js";
import {verifyJwt} from "../middleware/authMiddleware.js";

const authRouter = express.Router();

// public
authRouter.post("/sign-up", signup);
authRouter.post("/log-in", login);
authRouter.get("/verify-email/:verificationToken", verifyEmail);

authRouter.get('/check-availability', checkAvailability);

// protected
authRouter.post("/logout", verifyJwt, logout);


export default authRouter;
