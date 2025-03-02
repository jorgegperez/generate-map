"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { File, IFile } from "@/models/File";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/mongodb";

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
    if (!session?.user?.id) {
      return { success: false, error: "Unauthorized" };
    }

    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "No file provided" };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileKey = `${session.user.id}/${file.name}`;

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: fileKey,
      ContentType: file.type,
      Body: buffer,
    });

    await s3Client.send(putObjectCommand);

    const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    const fileDoc = await File.create({
      fileName: file.name,
      fileKey,
      fileUrl,
      uploadedBy: session.user.id,
      fileSize: buffer.length,
      mimeType: file.type,
    });

    const cleanFileDoc: IFile = {
      _id: fileDoc._id.toString(),
      fileName: fileDoc.fileName,
      fileKey: fileDoc.fileKey,
      fileUrl: fileDoc.fileUrl,
      uploadedBy: fileDoc.uploadedBy.toString(),
      fileSize: fileDoc.fileSize,
      mimeType: fileDoc.mimeType,
      createdAt: fileDoc.createdAt?.toISOString(),
      updatedAt: fileDoc.updatedAt?.toISOString(),
    };

    return {
      success: true,
      file: cleanFileDoc,
    };
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: "Error uploading file" };
  }
}
