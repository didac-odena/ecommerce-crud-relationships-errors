const errorHandlerMiddleware = (error, req, res, next) => {
  if (error.code === 11000) {
    const duplicateField = Object.keys(error.keyPattern || {})[0] || "field";
    return res.status(409).json({
      statusCode: 409,
      message: `${duplicateField} already exists`,
      errors: null
    });
  }

  if (error.name === "ValidationError") {
    const errors = Object.values(error.errors || {}).map((fieldError) => ({
      field: fieldError.path,
      message: fieldError.message
    }));

    return res.status(400).json({
      statusCode: 400,
      message: "Validation error",
      errors
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({
      statusCode: 400,
      message: "Invalid identifier format",
      errors: null
    });
  }

  const statusCode = error.status || error.statusCode || 500;
  const message = error.message || "Internal server error";

  return res.status(statusCode).json({
    statusCode,
    message,
    errors: error.errors || null
  });
};

export default errorHandlerMiddleware;
