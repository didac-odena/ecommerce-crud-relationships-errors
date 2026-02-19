import mongoose from "mongoose";
import createError from "http-errors";

import Product from "../models/product.model.js";
import Category from "../models/category.model.js";

const list = async (req, res) => {
  /**
   * Iteration 3 - Product CRUD + Category relation
   * TODO:
   * - List products and `populate("category")`.
   * - Sort by newest first by default.
   *
   * Iteration 8 - Filters + pagination
   * TODO (suggested query params):
   * - `category` (ObjectId): filter by category
   * - `minPrice` / `maxPrice`: filter by price range
   * - `page` / `limit`: pagination
   * - `sortPrice=asc|desc`: sort by price
   *
   * Suggested response shape (Iteration 8):
   * - `{ meta: { page, limit, total, totalPages }, data: [...] }`
   */
  throw createError(501, "Product list not implemented yet (Iterations 3 & 8)");
};

const detail = async (req, res) => {
  /**
   * Iteration 3 - Product CRUD + Category relation
   * TODO:
   * - Find product by id and `populate("category")`.
   * - If not found: throw `createError(404, "Product not found")`.
   */
  throw createError(501, "Product detail not implemented yet (Iteration 3)");
};

const create = async (req, res) => {
  /**
   * Iteration 3 - Product CRUD + Category relation
   * TODO:
   * - Validate that `req.body.category` exists (Category.findById).
   * - If missing: throw `createError(400, "Category not found")`.
   * - Create the product, then return it with `populate("category")`.
   * - Respond with 201.
   */
  throw createError(501, "Product create not implemented yet (Iteration 3)");
};

const update = async (req, res) => {
  /**
   * Iteration 3 - Product CRUD + Category relation
   * TODO:
   * - If `req.body.category` is present, validate it exists.
   * - Update product by id with `{ new: true, runValidators: true }`.
   * - Populate category in the response.
   * - If not found: throw `createError(404, "Product not found")`.
   */
  throw createError(501, "Product update not implemented yet (Iteration 3)");
};

const remove = async (req, res) => {
  /**
   * Iteration 3 - Product CRUD
   * TODO:
   * - Delete product by id.
   * - If not found: throw `createError(404, "Product not found")`.
   * - Respond with 204 (no content).
   */
  throw createError(501, "Product remove not implemented yet (Iteration 3)");
};

export default {
  list,
  detail,
  create,
  update,
  remove
};
