import mongoose from "mongoose";

const { Schema, model } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model("Category", categorySchema);
