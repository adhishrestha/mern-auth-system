import { ZodError } from "zod";

const errorHandler = (err, req, res, next) => {
  const isDevelopment = process.env.NODE_ENV === "development";

  //Handle Zod validation errors
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  const response = {
    success: false,
    message,
  };

  // show stack tracw only in development
  if (isDevelopment) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

export default errorHandler;
