import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderItemSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Order item order is required"]
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Order item product is required"]
    },
    quantity: {
      type: Number,
      required: [true, "Order item quantity is required"],
      min: [1, "Quantity must be greater than 0"]
    },
    unitPrice: {
      type: Number,
      required: [true, "Order item unitPrice is required"],
      min: [0, "Unit price must be greater than or equal to 0"]
    },
    subtotal: {
      type: Number,
      required: [true, "Order item subtotal is required"],
      min: [0, "Subtotal must be greater than or equal to 0"]
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  }
);

export default model("OrderItem", orderItemSchema);
