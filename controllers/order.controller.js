import createError from "http-errors";
import mongoose from "mongoose";

import Customer from "../models/customer.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import OrderItem from "../models/order-item.model.js";

const getOrderWithItems = async (orderId) => {
  /**
   * Iteration 7 - Orders detail/list should include lines
   * TODO:
   * - Find the order and `populate("customer")`.
   * - If not found: return `null`.
   * - Find the order items and `populate("product")`.
   * - Return a merged object `{ ...order.toObject(), items }`.
   */
  throw createError(501, "getOrderWithItems not implemented yet (Iteration 7)");
};

const list = async (req, res) => {
  /**
   * Iteration 7 - Orders list
   * TODO:
   * - List orders and include customer + order lines (items + product).
   *
   * Iteration 8 - Orders filters
   * TODO:
   * - Filter by `status` (string)
   * - Filter by `customer` (ObjectId)
   */
  throw createError(501, "Order list not implemented yet (Iterations 7 & 8)");
};

const detail = async (req, res) => {
  /**
   * Iteration 7 - Orders detail
   * TODO:
   * - Reuse `getOrderWithItems(req.params.id)`.
   * - If not found: throw `createError(404, "Order not found")`.
   */
  throw createError(501, "Order detail not implemented yet (Iteration 7)");
};

const create = async (req, res) => {
  /**
   * Iteration 6 - Create order with lines
   * TODO:
   * - Validate `items` is a non-empty array.
   * - Validate the customer exists.
   * - Validate all products exist.
   * - Create the Order first (total 0, status "pending").
   * - Create OrderItems using:
   *   - `unitPrice` snapshot from Product.price
   *   - `subtotal = unitPrice * quantity`
   * - Compute and save Order.total.
   * - Respond with 201 + order + populated customer + populated items.
   */
  throw createError(501, "Order create not implemented yet (Iteration 6)");
};

const updateStatus = async (req, res) => {
  /**
   * Iteration 7 - Update order status
   * TODO:
   * - Update only the `status` field.
   * - Use `{ new: true, runValidators: true }` to enforce the enum.
   * - If not found: throw `createError(404, "Order not found")`.
   * - Respond with updated order + items.
   */
  throw createError(501, "Order updateStatus not implemented yet (Iteration 7)");
};

const remove = async (req, res) => {
  /**
   * Iteration 7 - Delete order
   * TODO:
   * - Delete the Order.
   * - If not found: throw `createError(404, "Order not found")`.
   * - Delete all OrderItems referencing this order (`deleteMany`).
   * - Respond with 204.
   */
  throw createError(501, "Order remove not implemented yet (Iteration 7)");
};

export default {
  list,
  detail,
  create,
  updateStatus,
  remove
};
