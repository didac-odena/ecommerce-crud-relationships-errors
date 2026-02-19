import createError from "http-errors";
import mongoose from "mongoose";

import Customer from "../models/customer.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";
import OrderItem from "../models/order-item.model.js";

const getOrderWithItems = async (orderId) => {
  const order = await Order.findById(orderId).populate("customer");

  if (!order) {
    return null;
  }

  const items = await OrderItem.find({ order: order._id }).populate("product");

  return {
    ...order.toObject(),
    items
  };
};

const list = async (req, res) => {
  const filter = {};

  if (req.query.status) {
    filter.status = req.query.status;
  }

  if (req.query.customer && mongoose.Types.ObjectId.isValid(req.query.customer)) {
    filter.customer = req.query.customer;
  }

  const orders = await Order.find(filter).populate("customer").sort({ createdAt: -1 });

  const orderIds = orders.map((order) => order._id);
  const orderItems = await OrderItem.find({ order: { $in: orderIds } }).populate("product");

  const itemsByOrderId = {};
  orderItems.forEach((orderItem) => {
    const orderId = orderItem.order.toString();

    if (!itemsByOrderId[orderId]) {
      itemsByOrderId[orderId] = [];
    }

    itemsByOrderId[orderId].push(orderItem);
  });

  const response = orders.map((order) => ({
    ...order.toObject(),
    items: itemsByOrderId[order._id.toString()] || []
  }));

  res.json(response);
};

const detail = async (req, res) => {
  const order = await getOrderWithItems(req.params.id);

  if (!order) {
    throw createError(404, "Order not found");
  }

  res.json(order);
};

const create = async (req, res) => {
  const { customer, items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    throw createError(400, "Order must include at least one item");
  }

  const customerExists = await Customer.findById(customer);

  if (!customerExists) {
    throw createError(400, "Customer not found");
  }

  const productIds = items.map((item) => item.product);
  const uniqueProductIds = [...new Set(productIds)];
  const products = await Product.find({ _id: { $in: uniqueProductIds } });

  if (products.length !== uniqueProductIds.length) {
    throw createError(400, "One or more products were not found");
  }

  const productsById = {};
  products.forEach((product) => {
    productsById[product._id.toString()] = product;
  });

  const order = await Order.create({
    customer,
    status: "pending",
    total: 0
  });

  const orderItemsData = items.map((item) => {
    const quantity = Number(item.quantity);

    if (quantity <= 0) {
      throw createError(400, "Quantity must be greater than 0");
    }

    const product = productsById[item.product];
    const unitPrice = Number(product.price);
    const subtotal = unitPrice * quantity;

    return {
      order: order._id,
      product: product._id,
      quantity,
      unitPrice,
      subtotal
    };
  });

  const createdItems = await OrderItem.insertMany(orderItemsData);
  const total = createdItems.reduce((accumulator, item) => accumulator + item.subtotal, 0);

  order.total = total;
  await order.save();

  const response = await getOrderWithItems(order._id);
  res.status(201).json(response);
};

const updateStatus = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!order) {
    throw createError(404, "Order not found");
  }

  const response = await getOrderWithItems(order._id);
  res.json(response);
};

const remove = async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    throw createError(404, "Order not found");
  }

  await OrderItem.deleteMany({ order: req.params.id });
  res.status(204).send();
};

export default {
  list,
  detail,
  create,
  updateStatus,
  remove
};
