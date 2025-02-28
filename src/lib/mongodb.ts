import mongoose from "mongoose";

if (!process.env.MONGO_DB_URI) {
  throw new Error("Please add your MONGO_DB_URI to .env.local");
}

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(
      process.env.MONGO_DB_URI ?? ""
    );

    if (connection.readyState === 1) {
      console.log("MongoDB connected");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.log("MongoDB connection error:", error);
    return Promise.reject(error);
  }
};
