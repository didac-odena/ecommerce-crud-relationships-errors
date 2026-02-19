import createError from "http-errors";
import Category from "../models/category.model.js";

const list = async (req, res) => {
  /**
   * Iteration 2 - Category CRUD
   * TODO:
   * - Fetch all categories.
   * - Sort by newest first (createdAt descending) if you have timestamps enabled.
   * - Respond with JSON array.
   */
  throw createError(501, "Category list not implemented yet (Iteration 2)");
};

const detail = async (req, res) => {
  /**
   * Iteration 2 - Category CRUD
   * TODO:
   * - Find category by id (`req.params.id`).
   * - If not found: throw `createError(404, "Category not found")`.
   * - Respond with JSON.
   */
  throw createError(501, "Category detail not implemented yet (Iteration 2)");
};

const create = async (req, res) => {
  /**
   * Iteration 2 - Category CRUD
   * TODO:
   * - Create category from `req.body`.
   * - Respond with 201 + created document.
   */
  throw createError(501, "Category create not implemented yet (Iteration 2)");
};

const update = async (req, res) => {
  /**
   * Iteration 2 - Category CRUD
   * TODO:
   * - Update category by id with `req.body`.
   * - Use `{ new: true, runValidators: true }`.
   * - If not found: throw `createError(404, "Category not found")`.
   * - Respond with updated document.
   */
  throw createError(501, "Category update not implemented yet (Iteration 2)");
};

const remove = async (req, res) => {
  /**
   * Iteration 2 - Category CRUD
   * TODO:
   * - Delete category by id.
   * - If not found: throw `createError(404, "Category not found")`.
   * - Respond with 204 (no content).
   */
  throw createError(501, "Category remove not implemented yet (Iteration 2)");
};

export default {
  list,
  detail,
  create,
  update,
  remove
};
