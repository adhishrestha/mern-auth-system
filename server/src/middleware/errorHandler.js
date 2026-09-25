import { ZodError } from "zod";

const errorHandler = (err, req, res, next) => {
  const isDevelopment = process.env.NODE_ENV === "development";

  // Always log unexpected errors on the server.
  if (isDevelopment) {
    console.error(err);
  } else {
    console.error("Unexpected server error:", err);
  }

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

  const isKnownApiError =
    typeof err.statusCode === "number" && err.statusCode < 500;

  const message =
    isDevelopment || isKnownApiError
      ? err.message || "Internal Server Error"
      : "Internal Server Error";

  const response = {
    success: false,
    message,
  };

  // show stack tracw only in development
  if (isDevelopment) {
    response.stack = err.stack;
  }

  return res.status(statusCode).json(response);
};

export default errorHandler;
