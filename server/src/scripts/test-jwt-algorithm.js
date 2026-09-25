import "dotenv/config";
import jwt from "jsonwebtoken";

const token = jwt.sign({ userId: "test-user" }, process.env.JWT_ACCESS_SECRET, {
  algorithm: "HS384",
  expiresIn: "15m",
});

try {
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, {
    algorithms: ["HS256"],
  });

  console.log("❌ TEST FAILED: HS384 token was accepted.");
} catch (error) {
  console.log("✅ TEST PASSED: HS384 token was rejected.");
}
