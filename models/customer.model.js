import mongoose from "mongoose";

const { Schema, model } = mongoose;

/**
 * Iteration 4 - Customer model
 * TODO:
 * - Add fields:
 *   - `firstName` (String, required, trim)
 *   - `lastName` (String, required, trim)
 *   - `email` (String, required, unique, lowercase, trim, match email format)
 * - Enable timestamps.
 */
const customerSchema = new Schema(
  {
    // TODO: implement schema fields (Iteration 4).
  },
  {
    // TODO (Iteration 4): consider enabling `timestamps: true`.
    // timestamps: true,
  }
);

export default model("Customer", customerSchema);
