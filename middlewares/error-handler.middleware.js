/**
 * Iterations 1 & 9 - Error handling
 * TODO:
 * - Return a consistent JSON shape: `{ statusCode, message, errors }`.
 * - Normalize common error types:
 *   - Mongo duplicate key (`error.code === 11000`) -> 409
 *   - Mongoose `ValidationError` -> 400 (collect field errors)
 *   - Mongoose `CastError` -> 400
 * - Fall back to `error.status || error.statusCode || 500`.
 */

const errorHandlerMiddleware = (error, req, res, next) => {
  let statusCode = error.status || error.statusCode || 500;
  let message = error.message || "Internal Server Error";
  let errors = null;

  if (error.code === 11000) {
    statusCode = 409;
    message = "Duplicate key error";
  }

  if (error.name === "ValidationError") {
    statusCode = 400;
    errors = Object.keys(error.errors).map(key => ({
      field: key,
      message: error.errors[key].message
    }));
  }

  if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid ObjectId";
  }

  return res.status(statusCode).json({
    statusCode,
    message,
    errors
  });
};

export default errorHandlerMiddleware;
