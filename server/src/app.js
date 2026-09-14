import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./features/auth/routes/auth.routes.js";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

//Global API rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes

  limit: 100, // Max 100 requests per IP

  standardHeaders: true,

  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

// Security headers
app.use(helmet());

// Allow request from the frontend
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Parse JSON request bodies
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// Apply rate limiting to all requests
app.use(limiter);

// Health Check / Welcome route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to MERN Authentication System API",
  });
});

app.get("/test-error", (req, res, next) => {
  const error = new Error("THIS IS A SECRET INTERNAL ERROR");
  next(error);
});

// Authentication routes
app.use("/api/v1/auth", authRoutes);

// Handle unknown routes (404)
app.use(notFound);

// Global error handler
app.use(errorHandler);
export default app;
