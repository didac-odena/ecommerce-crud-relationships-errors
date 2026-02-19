import mongoose from "mongoose";

const { Schema, model } = mongoose;

/**
 * Iteration 3 - Product model
 * TODO:
 * - Add fields:
 *   - `name` (String, required, trim)
 *   - `description` (String, required, trim)
 *   - `price` (Number, required, min 0)
 *   - `stock` (Number, required, min 0)
 *   - `category` (ObjectId ref "Category", required)
 *   - `isActive` (Boolean, default true)
 * - Enable timestamps.
 */
const productSchema = new Schema(
  {
    // TODO: implement schema fields (Iteration 3).
  },
  {
    // TODO (Iteration 3): consider enabling `timestamps: true`.
    // timestamps: true,
  }
);

export default model("Product", productSchema);
