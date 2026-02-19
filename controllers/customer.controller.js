import createError from "http-errors";
import Customer from "../models/customer.model.js";

const list = async (req, res) => {
  /**
   * Iteration 4 - Customer CRUD
   * TODO:
   * - List customers (optionally sort by newest first).
   */
  throw createError(501, "Customer list not implemented yet (Iteration 4)");
};

const detail = async (req, res) => {
  /**
   * Iteration 4 - Customer CRUD
   * TODO:
   * - Find customer by id.
   * - If not found: throw `createError(404, "Customer not found")`.
   */
  throw createError(501, "Customer detail not implemented yet (Iteration 4)");
};

const create = async (req, res) => {
  /**
   * Iteration 4 - Customer CRUD
   * TODO:
   * - Create a customer from `req.body`.
   * - Ensure `email` is unique (handled by Mongo unique index).
   * - Respond with 201.
   *
   * Iteration 9 - Error handling
   * Tip:
   * - Duplicate email should be handled centrally in `error-handler.middleware.js` (Mongo code 11000 -> 409).
   */
  throw createError(501, "Customer create not implemented yet (Iteration 4)");
};

const update = async (req, res) => {
  /**
   * Iteration 4 - Customer CRUD
   * TODO:
   * - Update customer by id with `{ new: true, runValidators: true }`.
   * - If not found: throw `createError(404, "Customer not found")`.
   */
  throw createError(501, "Customer update not implemented yet (Iteration 4)");
};

const remove = async (req, res) => {
  /**
   * Iteration 4 - Customer CRUD
   * TODO:
   * - Delete customer by id.
   * - If not found: throw `createError(404, "Customer not found")`.
   * - Respond with 204.
   */
  throw createError(501, "Customer remove not implemented yet (Iteration 4)");
};

export default {
  list,
  detail,
  create,
  update,
  remove
};
