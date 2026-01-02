import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
  {
    // Owner
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Cloudinary
    publicId: {
      type: String,
      required: true,
      unique: true,
    },

    pdfUrl: {
      type: String,
      required: true,
    },

    previewImageUrl: {
      type: String,
      required: true,
    },

    // Metadata
    originalName: {
      type: String,
      required: true,
    },

    size: {
      type: Number, // bytes
      required: true,
    },

    status: {
      type: String,
      enum: ["uploaded", "processing", "completed", "failed"],
      default: "uploaded",
    },
    isConsumed: {
      type: Boolean,
      default: false,
      index: true,
    },

    extractedText: {
      type: String,
      default: null,
      select: false,
    },
    // AI output (future)
    aiResult: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Pdf = mongoose.model("Pdf", pdfSchema);
