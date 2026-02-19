import express from "express";
import categoryController from "../controllers/category.controller.js";
import validateObjectIdMiddleware from "../middlewares/validate-object-id.middleware.js";

const router = express.Router();

// GET /api/health
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

router.post("/categories", categoryController.create);
router.get("/categories", categoryController.list);
router.get("/categories/:id", validateObjectIdMiddleware(), categoryController.detail);
router.patch("/categories/:id", validateObjectIdMiddleware(), categoryController.update);
router.delete("/categories/:id", validateObjectIdMiddleware(), categoryController.remove);

export default router;
