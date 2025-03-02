import { Queue, Worker } from "bullmq";
import { File } from "@/models/File";
import IORedis from "ioredis";
import { EProcessingStatus } from "@/constants";
import { connectDB } from "@/lib/mongodb";

const connection = new IORedis(process.env.UPSTASH_REDIS_URL!, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

export const fileProcessingQueue = new Queue("fileProcessing", {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  },
});

const worker = new Worker(
  "fileProcessing",
  async (job) => {
    await connectDB();

    const { fileId } = job.data;

    try {
      await File.findByIdAndUpdate(fileId, {
        processingStatus: EProcessingStatus.PROCESSING,
      });

      await File.findByIdAndUpdate(fileId, {
        processingStatus: EProcessingStatus.COMPLETED,
        // processedData will be added later
      });

      console.log(`Processed file ${fileId}`);
    } catch (error) {
      console.error(`Error processing file ${fileId}:`, error);
      await File.findByIdAndUpdate(fileId, {
        processingStatus: EProcessingStatus.FAILED,
      });
      throw error;
    }
  },
  {
    connection,
    concurrency: 1,
    removeOnComplete: {
      count: 1000,
    },
    removeOnFail: {
      count: 1000,
    },
  }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} failed:`, error);
});

process.on("SIGTERM", async () => {
  await worker.close();
  await fileProcessingQueue.close();
});
