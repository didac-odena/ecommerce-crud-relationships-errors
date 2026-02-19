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
  const statusCode = 500;

  return res.status(statusCode).json({
    statusCode,
    message: "Global error handler not implemented yet (Iterations 1 & 9)",
    errors: null
  });
};

export default errorHandlerMiddleware;
