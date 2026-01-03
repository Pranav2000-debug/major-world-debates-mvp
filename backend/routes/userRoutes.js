import express from "express";
import { changePassword, changeUsername, deleteMyAccount, getCurrentUser } from "../controllers/userController.js";
import { verifyJwtOptional } from "../middleware/verifyOptionalJwt.js";
import { verifyJwt } from "../middleware/authMiddleware.js";
import { updateUsernameLimiter } from "../middleware/rateLimiter.js";

const userRouter = express.Router();

userRouter.get("/me", verifyJwtOptional, getCurrentUser);
userRouter.post("/update-password", verifyJwt, changePassword);
userRouter.post("/update-username", verifyJwt, updateUsernameLimiter, changeUsername);
userRouter.delete("/del-acc", verifyJwt, deleteMyAccount);

export default userRouter;
