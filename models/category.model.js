import mongoose from "mongoose";

const { Schema, model } = mongoose;

/**
 * Iteration 2 - Category model
 * TODO:
 * - Add fields:
 *   - `name` (String, required, trim)
 *   - `description` (String, required, trim)
 * - Enable timestamps.
 */
const categorySchema = new Schema(
  {
    // TODO: implement schema fields (Iteration 2).
  },
  {
    // TODO (Iteration 2): consider enabling `timestamps: true`.
    // timestamps: true,
  }
);

export default model("Category", categorySchema);
