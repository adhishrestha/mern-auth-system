import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1. WORKAROUND: Fix local ISP/Windows DNS bugs for MongoDB cloud clusters
    if (process.env.NODE_ENV !== "production") {
      const dns = await import("node:dns");
      dns.setServers(["1.1.1.1", "8.8.8.8"]); // Cloudflare & Google Public DNS
    }

    // 2. Connect to Database
    await connectDB();

    // 3. Start Listening for Requests
    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV || "development"} mode on http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
