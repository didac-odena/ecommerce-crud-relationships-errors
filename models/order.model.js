import mongoose from "mongoose";

const { Schema, model } = mongoose;

/**
 * Iteration 5 - Order model
 * TODO:
 * - Add fields:
 *   - `customer` (ObjectId ref "Customer", required)
 *   - `status` (String enum: pending, paid, shipped, cancelled; default pending)
 *   - `total` (Number, default 0, min 0)
 * - Enable timestamps.
 */
const orderSchema = new Schema(
  {
    // TODO: implement schema fields (Iteration 5).
  },
  {
    // TODO (Iteration 5): consider enabling `timestamps: true`.
    // timestamps: true,
  }
);

export default model("Order", orderSchema);
