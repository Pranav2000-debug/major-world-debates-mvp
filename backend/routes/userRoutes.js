const express = require("express");
const {
  registerUser,
  loginUser,
  refreshAccessToken,
  getUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshAccessToken);
router.get("/me", protect, getUserProfile);

module.exports = router;
