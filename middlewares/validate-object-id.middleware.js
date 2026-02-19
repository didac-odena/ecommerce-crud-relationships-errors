import mongoose from "mongoose";
import createError from "http-errors";

/**
 * Iteration 1 - Bootstrap
 * TODO:
 * - Validate `req.params[paramName]` using `mongoose.Types.ObjectId.isValid(value)`.
 * - If invalid, call `next(createError(400, ...))`.
 *
 * Tip:
 * - Default `paramName` should be `"id"`.
 */
const validateObjectIdMiddleware = (paramName = "id") => {
  return (req, res, next) => {
    // TODO: implement ObjectId validation.
    return next(createError(501, "validateObjectIdMiddleware not implemented yet (Iteration 1)"));
  };
};

export default validateObjectIdMiddleware;
