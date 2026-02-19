import express from "express";
import morgan from "morgan";
import createError from "http-errors";

import router from "./config/routes.config.js";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware.js";

/**
 * Iteration 1 - Bootstrap
 * TODO:
 * - Add request logging with `morgan("dev")`.
 * - Add body parsing with `express.json()`.
 * - Mount the API router under `/api`.
 * - Add a 404 handler using `http-errors` (e.g. `createError(404, "Route not found")`).
 * - Register the global `errorHandlerMiddleware` at the very end.
 */
const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api", router);

app.use((req, res, next) => {
  const error = createError(404, "Route not found");
  next(error);
});

app.use(errorHandlerMiddleware);

export default app;
