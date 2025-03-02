import { EProcessingStatus } from "@/constants";
import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    fileKey: {
      type: String,
      required: true,
      unique: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fileSize: {
      type: Number,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    markdownText: {
      type: String,
      required: true,
    },
    processingStatus: {
      type: String,
      enum: EProcessingStatus,
      default: EProcessingStatus.PENDING,
    },
  },
  { timestamps: true }
);

export interface IFile {
  _id: string;
  fileName: string;
  fileKey: string;
  fileUrl: string;
  uploadedBy: string;
  fileSize: number;
  mimeType: string;
  markdownText: string;
  createdAt: string;
  updatedAt: string;
  processingStatus: EProcessingStatus;
}

export const File = mongoose.models.File || mongoose.model("File", fileSchema);
