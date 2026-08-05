import express from "express";
import helmet from "helmet";
import authRoutes from "./features/auth/routes/auth.routes.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Security headers
app.use(helmet());

// Parse JSON request bodies
app.use(express.json());

// Health Check / Welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to MERN Authentication System API",
  });
});

// Authentication routes
app.use("/api/v1/auth", authRoutes);

// Handle unknown routes (404)
app.use(notFound);

// Global error handler
app.use(errorHandler);
export default app;
