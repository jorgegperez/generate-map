"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getServerSession, Session } from "next-auth";
import { File, IFile } from "@/models/File";
import { connectDB } from "@/lib/mongodb";

import { EProcessingStatus } from "@/constants";
import { extractMarkdown } from "./processFile";
import { authOptions } from "@/lib/auth";

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

    if (buffer.length > 50 * 1024 * 1024) {
      return { success: false, error: "File size exceeds limit" };
    }

    // Upload to S3 first
    const { fileUrl, fileKey } = await uploadFileToS3(file, session, buffer);

    // Create file document with initial state
    const fileDoc = await File.create({
      fileName: file.name,
      fileKey,
      fileUrl,
      uploadedBy: session.user.id,
      fileSize: buffer.length,
      mimeType: file.type,
      processingStatus: EProcessingStatus.PENDING,
    });

    extractMarkdown(buffer, file.name, fileDoc._id.toString()).catch(
      (error) => {
        console.error("Background processing error:", error);
      }
    );

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
