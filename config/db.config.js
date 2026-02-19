import mongoose from "mongoose";

/**
 * Iteration 1 - Bootstrap
 * TODO:
 * - Read `process.env.MONGODB_URI` (with a sensible localhost fallback).
 * - Connect using `mongoose.connect(mongoUri)`.
 * - Decide what to log on success (optional).
 *
 * Tip:
 * - Keep this function small and only responsible for connecting.
 */
const connectToDatabase = async () => {
  const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ecommerce-api";

  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected");
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to connect to MongoDB: ${message}`);
  }
};

export default connectToDatabase;
