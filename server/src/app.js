import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import notFound from "./middleware/notFound.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import authRoutes from "./features/auth/routes/auth.routes.js";
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the MERN Authentication API",
    environment: process.env.NODE_ENV,
  });
});
app.use("/api/v1/auth", authRoutes);
app.use(notFound);

app.use(errorMiddleware);
export default app;
