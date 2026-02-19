import mongoose from "mongoose";

import connectToDatabase from "../config/db.config.js";
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import Customer from "../models/customer.model.js";

const runSeed = async () => {
  try {
    await connectToDatabase();

    await Promise.all([Category.deleteMany({}), Product.deleteMany({}), Customer.deleteMany({})]);

    const [electronics, home] = await Category.create([
      { name: "Electronics", description: "Devices and accessories" },
      { name: "Home", description: "Products for home use" }
    ]);

    await Product.create([
      {
        name: "Wireless Mouse",
        description: "2.4GHz wireless mouse",
        price: 24.99,
        stock: 30,
        category: electronics._id,
        isActive: true
      },
      {
        name: "Mechanical Keyboard",
        description: "Keyboard with tactile switches",
        price: 79.99,
        stock: 20,
        category: electronics._id,
        isActive: true
      },
      {
        name: "Coffee Maker",
        description: "Automatic coffee maker",
        price: 49.5,
        stock: 12,
        category: home._id,
        isActive: true
      }
    ]);

    await Customer.create({
      firstName: "Demo",
      lastName: "Customer",
      email: "demo.customer@example.com"
    });

    console.log("Seed completed");
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    await mongoose.connection.close();
    process.exit(1);
  }
};

runSeed();
