import { Router } from "express";
import {
  authHealth,
  register,
  verifyEmailController,
  loginController,
  googleAuthController,
  refreshTokenController,
  logoutController,
  forgotPasswordController,
  resetPasswordController,
  getCurrentUserController,
  updateProfileController,
  changePasswordController,
  deleteAccountController,
} from "../controllers/auth.controller.js";
import { reauthenticateController } from "../controllers/reauth.controller.js";
import validate from "../../../middleware/validate.js";
import {
  registerSchema,
  loginSchema,
  googleAuthSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateProfileSchema,
  changePasswordSchema,
  deleteAccountSchema,
  reauthSchema,
} from "../validators/auth.validator.js";
import authenticate from "../../../middleware/auth.middleware.js";
import requireReauthentication from "../../../middleware/reauth.middleware.js";
import {
  authRateLimit,
  recoveryRateLimit,
  refreshRateLimit,
} from "../../../middleware/rateLimit.middleware.js";

const router = Router();

// Health Check
router.get("/health", authHealth);

// Register
router.post("/register", authRateLimit,  validate(registerSchema), register);

// Verify-Email
router.get("/verify-email", verifyEmailController);

// Login
router.post("/login", authRateLimit, validate(loginSchema), loginController);

// Google Login
router.post(
  "/google",
  authRateLimit,
  validate(googleAuthSchema),
  googleAuthController,
);

router.post(
  "/reauthenticate",
  authenticate,
  authRateLimit,
  validate(reauthSchema),
  reauthenticateController,
);

// Refresh Access Token
router.post("/refresh-token", refreshRateLimit, refreshTokenController);

// Logout
router.post("/logout", logoutController);

// Forgot Password
router.post(
  "/forgot-password",
  recoveryRateLimit,
  validate(forgotPasswordSchema),
  forgotPasswordController,
);

// Reset Password
router.post(
  "/reset-password",
  recoveryRateLimit,
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

router.patch(
  "/change-password",
  authenticate,
  validate(changePasswordSchema),
  changePasswordController,
);

router.delete(
  "/delete-account",
  authenticate,
  requireReauthentication,
  validate(deleteAccountSchema),
  deleteAccountController,
);
export default router;
