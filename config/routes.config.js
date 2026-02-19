import express from "express";

import categoryController from "../controllers/category.controller.js";
import productController from "../controllers/product.controller.js";
import customerController from "../controllers/customer.controller.js";
import orderController from "../controllers/order.controller.js";
import validateObjectIdMiddleware from "../middlewares/validate-object-id.middleware.js";

const routesConfig = (app) => {
  const router = express.Router();

  router.get("/health", (req, res) => {
    res.json({ message: "API is running" });
  });

  router.post("/categories", categoryController.create);
  router.get("/categories", categoryController.list);
  router.get("/categories/:id", validateObjectIdMiddleware(), categoryController.detail);
  router.patch("/categories/:id", validateObjectIdMiddleware(), categoryController.update);
  router.delete("/categories/:id", validateObjectIdMiddleware(), categoryController.remove);

  router.post("/products", productController.create);
  router.get("/products", productController.list);
  router.get("/products/:id", validateObjectIdMiddleware(), productController.detail);
  router.patch("/products/:id", validateObjectIdMiddleware(), productController.update);
  router.delete("/products/:id", validateObjectIdMiddleware(), productController.remove);

  router.post("/customers", customerController.create);
  router.get("/customers", customerController.list);
  router.get("/customers/:id", validateObjectIdMiddleware(), customerController.detail);
  router.patch("/customers/:id", validateObjectIdMiddleware(), customerController.update);
  router.delete("/customers/:id", validateObjectIdMiddleware(), customerController.remove);

  router.post("/orders", orderController.create);
  router.get("/orders", orderController.list);
  router.get("/orders/:id", validateObjectIdMiddleware(), orderController.detail);
  router.patch("/orders/:id/status", validateObjectIdMiddleware(), orderController.updateStatus);
  router.delete("/orders/:id", validateObjectIdMiddleware(), orderController.remove);

  app.use("/api", router);
};

export default routesConfig;
