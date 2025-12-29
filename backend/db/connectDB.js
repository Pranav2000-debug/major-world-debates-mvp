import mongoose from "mongoose";

// Do NOT build or check indexes automatically on startup { autoIndex: false }
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { autoIndex: process.env.NODE_ENV !== "production" });
    console.log("Connection Established");
  } catch (error) {
    console.error("MongoDB Connection Error", error);
    process.exit(1);
  }
};
