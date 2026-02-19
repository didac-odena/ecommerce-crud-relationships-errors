import createError from "http-errors";
import Customer from "../models/customer.model.js";

const list = async (req, res) => {
  const customers = await Customer.find().sort({ createdAt: -1 });
  res.json(customers);
};

const detail = async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    throw createError(404, "Customer not found");
  }

  res.json(customer);
};

const create = async (req, res) => {
  const customer = await Customer.create(req.body);
  res.status(201).json(customer);
};

const update = async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!customer) {
    throw createError(404, "Customer not found");
  }

  res.json(customer);
};

const remove = async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);

  if (!customer) {
    throw createError(404, "Customer not found");
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
