import { Router } from "express";
import {
  authHealth,
  register,
  verifyEmailController,
  loginController,
  refreshTokenController,
} from "../controllers/auth.controller.js";
import validate from "../../../middleware/validate.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";

const router = Router();

// Health Check
router.get("/health", authHealth);

// Register
router.post("/register", validate(registerSchema), register);

// Verify-Email
router.get("/verify-email", verifyEmailController);

// Login
router.post("/login", validate(loginSchema), loginController);

// Refresh Access Token
router.post("/refresh-token", refreshTokenController);
export default router;
