import express from "express";

const app = express();

// Middleware
app.use(express.json());

// Temporary test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the MERN Authentication API",
  });
});

export default app;
