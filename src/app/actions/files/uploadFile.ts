"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getServerSession, Session } from "next-auth";
import { File, IFile } from "@/models/File";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";

import { OpenAI, Settings, LlamaParseReader } from "llamaindex";
import fs from "fs";
import os from "os";
import path from "path";
import { writeFile } from "fs/promises";
import { fileProcessingQueue } from "@/lib/queue";
import { EProcessingStatus } from "@/constants";

Settings.llm = new OpenAI({ model: "gpt-4o-mini" });

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function uploadFile(formData: FormData) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    const file = formData.get("file") as File;
    if (!file) return { success: false, error: "No file provided" };

    const buffer = Buffer.from(await file.arrayBuffer());

    const tempDir = os.tmpdir();
    const uniquePrefix =
      Date.now() + "-" + Math.random().toString(36).substring(2);
    const tempFilePath = path.join(tempDir, `${uniquePrefix}-${file.name}`);

    try {
      if (buffer.length > 50 * 1024 * 1024) {
        return { success: false, error: "File size exceeds limit" };
      }
      const { fileUrl, fileKey } = await uploadFileToS3(file, session, buffer);

      await writeFile(tempFilePath, buffer);
      const reader = new LlamaParseReader({ resultType: "markdown" });
      const documents = await reader.loadData(tempFilePath);
      const markdownText = documents.map((doc) => doc.text).join("\n");

      const fileDoc = await File.create({
        fileName: file.name,
        fileKey,
        fileUrl,
        uploadedBy: session.user.id,
        fileSize: buffer.length,
        mimeType: file.type,
        markdownText,
        processingStatus: EProcessingStatus.PENDING,
      });

      await fileProcessingQueue.add("processMarkdown", {
        fileId: fileDoc._id.toString(),
        markdownText,
      });

      const cleanFileDoc: IFile = {
        _id: fileDoc._id.toString(),
        fileName: fileDoc.fileName,
        fileKey: fileDoc.fileKey,
        fileUrl: fileDoc.fileUrl,
        uploadedBy: fileDoc.uploadedBy.toString(),
        fileSize: fileDoc.fileSize,
        mimeType: fileDoc.mimeType,
        markdownText: fileDoc.markdownText,
        processingStatus: fileDoc.processingStatus,
        createdAt: fileDoc.createdAt?.toISOString(),
        updatedAt: fileDoc.updatedAt?.toISOString(),
      };

      return { success: true, file: cleanFileDoc };
    } finally {
      try {
        if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
      } catch (cleanupError) {
        console.error("Error cleaning up temp file:", cleanupError);
      }
    }
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: "Error uploading file" };
  }
}

async function uploadFileToS3(file: File, session: Session, buffer: Buffer) {
  const fileKey = `${session.user.id}/${file.name}`;

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileKey,
    ContentType: file.type,
    Body: buffer,
  });

  await s3Client.send(putObjectCommand);

  const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

  return { fileUrl, fileKey };
}
