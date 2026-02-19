import createError from "http-errors";
import Category from "../models/category.model.js";

const list = async (req, res) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  res.json(categories);
};

const detail = async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    throw createError(404, "Category not found");
  }

  res.json(category);
};

const create = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
};

const update = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!category) {
    throw createError(404, "Category not found");
  }

  res.json(category);
};

const remove = async (req, res) => {
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
  remove
};
