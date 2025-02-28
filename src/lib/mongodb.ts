import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection: mongoose.Connection | null;
}

const MONGO_DB_URI = process.env.MONGO_DB_URI as string;

if (!MONGO_DB_URI) {
  throw new Error("Please define the MONGO_DB_URI environment variable");
}

export async function connectDB() {
  if (global.mongooseConnection) {
    return global.mongooseConnection;
  }

  const { connection } = await mongoose.connect(MONGO_DB_URI);
  global.mongooseConnection = connection;
  return connection;
}

connectDB().catch(console.error);
