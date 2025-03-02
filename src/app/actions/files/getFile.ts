"use server";

import { File, IFile } from "@/models/File";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getFileByOwnerId(ownerId: string) {
  const file = await File.findOne({ uploadedBy: ownerId });

  if (!file) return null;

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: file.fileKey,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  const cleanFile: IFile = {
    _id: file._id.toString(),
    fileName: file.fileName,
    fileKey: file.fileKey,
    fileUrl: signedUrl,
    uploadedBy: file.uploadedBy.toString(),
    fileSize: file.fileSize,
    mimeType: file.mimeType,
    markdownText: file.markdownText,
    processingStatus: file.processingStatus,
    createdAt: file.createdAt?.toISOString(),
    updatedAt: file.updatedAt?.toISOString(),
  };

  return cleanFile;
}
