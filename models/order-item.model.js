import mongoose from "mongoose";

const { Schema, model } = mongoose;

/**
 * Iteration 5 - OrderItem model
 * TODO:
 * - Add fields:
 *   - `order` (ObjectId ref "Order", required)
 *   - `product` (ObjectId ref "Product", required)
 *   - `quantity` (Number, required, min 1)
 *   - `unitPrice` (Number, required, min 0)
 *   - `subtotal` (Number, required, min 0)
 * - Enable timestamps.
 */
const orderItemSchema = new Schema(
  {
    // TODO: implement schema fields (Iteration 5).
  },
  {
    // TODO (Iteration 5): consider enabling `timestamps: true`.
    // timestamps: true,
  }
);

export default model("OrderItem", orderItemSchema);
