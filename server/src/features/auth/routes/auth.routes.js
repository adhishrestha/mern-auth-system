import { Router } from "express";
import {
  authHealth,
  register,
  verifyEmailController,
  loginController,
  refreshTokenController,
  logoutController,
} from "../controllers/auth.controller.js";
import validate from "../../../middleware/validate.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import authenticate from "../../../middleware/auth.middleware.js";

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

// Logout
router.post("/logout", logoutController);

// Protected test route
router.get("/me", authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
});

export default router;
