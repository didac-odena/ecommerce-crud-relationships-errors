import mongoose from "mongoose";

const connectToDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ecommerce-api";
  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
};

export default connectToDatabase;
