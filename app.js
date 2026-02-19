import express from "express";
import morgan from "morgan";
import createError from "http-errors";

import routesConfig from "./config/routes.config.js";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

routesConfig(app);

app.use((req, res, next) => {
  next(createError(404, "Route not found"));
});

app.use(errorHandlerMiddleware);

export default app;
