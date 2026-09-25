import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";
import validateEnv from "./config/env.js";

const startServer = async () => {
  try {
    const env = validateEnv();

    await connectDB();

    app.listen(env.PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server");
    process.exit(1);
  }
};
startServer();
