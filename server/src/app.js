import express from "express";
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";
const app = express();

//Temporary route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to MERN Authentication System API",
  });
});

// Error Handling Middleware //

app.use(notFound);

//Global error handler
app.use(errorHandler);
export default app;
