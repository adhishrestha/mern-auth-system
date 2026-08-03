import { Router } from "express";
import {
  authHealth,
  register,
  verifyEmailController,
  loginController,
  refreshTokenController,
  logoutController,
  forgotPasswordController,
  resetPasswordController,
  getCurrentUserController,
  updateProfileController,
} from "../controllers/auth.controller.js";
import validate from "../../../middleware/validate.js";
import {
  registerSchema,
  loginSchema,
  resetPasswordSchema,
  updateProfileSchema,
} from "../validators/auth.validator.js";
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

// Forgot Password
router.post("/forgot-password", forgotPasswordController);

// Reset Password
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  resetPasswordController,
);
// Protected test route
// router.get("/me", authenticate, (req, res) => {
//   res.status(200).json({
//     success: true,
//     user: req.user,
//   });
// });

// Current authenticated user
router.get("/me", authenticate, getCurrentUserController);

router.patch(
  "/profile",
  authenticate,
  validate(updateProfileSchema),
  updateProfileController,
);

export default router;
