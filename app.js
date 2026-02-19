import express from "express";

import routesConfig from "./config/routes.config.js";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware.js";

/**
 * Iteration 1 - Bootstrap
 * TODO:
 * - Add request logging with `morgan("dev")`.
 * - Add body parsing with `express.json()`.
 * - Call `routesConfig(app)` to mount all API routes under `/api`.
 * - Add a 404 handler using `http-errors` (e.g. `createError(404, "Route not found")`).
 * - Register the global `errorHandlerMiddleware` at the very end.
 */

const app = express();

// TODO (Iteration 1): Register global middleware here.

routesConfig(app);

// TODO (Iteration 1): Add a 404 handler here.

app.use(errorHandlerMiddleware);

export default app;
