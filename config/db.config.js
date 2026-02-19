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
  // Example fallback (you can change DB name):
  // const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ecommerce-api";
  // await mongoose.connect(mongoUri);

  throw new Error("connectToDatabase not implemented yet (Iteration 1)");
};

export default connectToDatabase;
