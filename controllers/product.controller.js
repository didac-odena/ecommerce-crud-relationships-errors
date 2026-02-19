import mongoose from "mongoose";
import createError from "http-errors";

import Product from "../models/product.model.js";
import Category from "../models/category.model.js";

const list = async (req, res) => {
  const { category, minPrice, maxPrice, page = 1, limit = 10, sortPrice } = req.query;
  const parsedPage = Math.max(Number(page), 1);
  const parsedLimit = Math.max(Number(limit), 1);
  const skip = (parsedPage - 1) * parsedLimit;
  const filter = {};
  let sort = { createdAt: -1 };

  if (category && mongoose.Types.ObjectId.isValid(category)) {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};

    if (minPrice) {
      filter.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      filter.price.$lte = Number(maxPrice);
    }
  }

  if (sortPrice === "asc") {
    sort = { price: 1 };
  }

  if (sortPrice === "desc") {
    sort = { price: -1 };
  }

  const [products, total] = await Promise.all([
    Product.find(filter).populate("category").sort(sort).skip(skip).limit(parsedLimit),
    Product.countDocuments(filter)
  ]);

  res.json({
    meta: {
      page: parsedPage,
      limit: parsedLimit,
      total,
      totalPages: Math.ceil(total / parsedLimit) || 1
    },
    data: products
  });
};

const detail = async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    throw createError(404, "Product not found");
  }

  res.json(product);
};

const create = async (req, res) => {
  const categoryExists = await Category.findById(req.body.category);

  if (!categoryExists) {
    throw createError(400, "Category not found");
  }

  const createdProduct = await Product.create(req.body);
  const product = await Product.findById(createdProduct._id).populate("category");

  res.status(201).json(product);
};

const update = async (req, res) => {
  if (req.body.category) {
    const categoryExists = await Category.findById(req.body.category);

    if (!categoryExists) {
      throw createError(400, "Category not found");
    }
  }

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).populate("category");

  if (!product) {
    throw createError(404, "Product not found");
  }

  res.json(product);
};

const remove = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    throw createError(404, "Product not found");
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
