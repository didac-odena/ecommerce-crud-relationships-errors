import mongoose from "mongoose";

const { Schema, model } = mongoose;

const customerSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "Customer firstName is required"],
      trim: true
    },
    lastName: {
      type: String,
      required: [true, "Customer lastName is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Customer email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email format is invalid"]
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

export default model("Customer", customerSchema);
