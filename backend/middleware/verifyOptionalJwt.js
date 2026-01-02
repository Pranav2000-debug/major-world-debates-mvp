import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJwtOptional = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    req.user = null;
    return next();
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded._id).select("-refreshToken -emailVerificationToken -emailVerificationExpiry");

    req.user = user || null;
    return next();
  } catch {
    // Invalid / expired token → treat as logged out
    req.user = null;
    return next();
  }
});
