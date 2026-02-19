import mongoose from "mongoose";
import createError from "http-errors";

const validateObjectIdMiddleware = (paramName = "id") => {
  return (req, res, next) => {
    const value = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(value)) {
      return next(createError(400, `Invalid ${paramName}`));
    }

    return next();
  };
};

export default validateObjectIdMiddleware;
