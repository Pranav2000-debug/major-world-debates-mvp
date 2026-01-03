import { User } from "../models/User.js";
import { asyncHandler, ApiError } from "../utils/utilBarrel.js";
import jwt from "jsonwebtoken";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Unauthorized Request");
  }

  try {
    const decodedAccessToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedAccessToken._id).select("-refreshToken -emailVerificationToken -emailVerificationExpiry");
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    // join a user prop to the req object
    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new ApiError(401, "ACCESS_TOKEN_EXPIRED", {
        code: "ACCESS_TOKEN_EXPIRED",
      });
    }
    throw new ApiError(401, "Invalid Access Token");
  }
});
