const dotenv = require("dotenv");
dotenv.config();   // MUST be first line

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const topicRoutes = require("./routes/topicsRoutes");
const userRoutes = require("./routes/userRoutes"); // <-- added

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch(err => console.error("MongoDB error:", err));

// Routes
app.use("/api/topics", topicRoutes);
app.use("/api/users", userRoutes); // <-- added

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));