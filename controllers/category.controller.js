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
  const categories = await Category.find().sort({ createdAt: -1 });
  res.status(200).json(categories);
};

const detail = async (req, res) => {
  /**
   * Iteration 2 - Category CRUD
   * TODO:
   * - Find category by id (`req.params.id`).
   * - If not found: throw `createError(404, "Category not found")`.
   * - Respond with JSON.
   */
  const category = await Category.findById(req.params.id);
  if (!category) {
    throw createError(404, "Category not found");
  }
  res.status(200).json(category);
};

const create = async (req, res) => {
  /**
   * Iteration 2 - Category CRUD
   * TODO:
   * - Create category from `req.body`.
   * - Respond with 201 + created document.
   */
  const category = await Category.create(req.body);
  res.status(201).json(category);
};

const update = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) {
    throw createError(404, "Category not found");
  }

  res.status(200).json(category);
};

const remove = async (req, res) => {
  /**
   * Iteration 2 - Category CRUD
   * TODO:
   * - Delete category by id.
   * - If not found: throw `createError(404, "Category not found")`.
   * - Respond with 204 (no content).
   */
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    throw createError(404, "Category not found");
  }

  res.status(204).send();
};

export default {
  list,
  detail,
  create,
  update,
  remove,
};
