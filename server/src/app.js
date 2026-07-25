import express from "express";
const app = express();

//Temporary route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to MERN Authentication System API",
  });
});

export default app;
