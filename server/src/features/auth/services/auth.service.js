import bcrypt from "bcrypt";

import User from "../../auth/models/user.model.js";
import ApiError from "../../../shared/errors/ApiError.js";

import { generateSecureToken, hashToken } from "../utils/token.utils.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.util.js";

const getAuthHealth = () => {
  return {
    success: true,
    message: "Authentication module is working.",
  };
};

const registerUser = async ({ fullName, email, password }) => {
  // check if the email is already registered
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "Email is already registered");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Generate email verification token
  const { rawToken, hashedToken, expiresAt } = generateSecureToken();

  //Create the user
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
    emailVerificationToken: hashedToken,
    emailVerificationExpires: expiresAt,
  });

  return {
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      createdAt: user.createdAt,
    },
    verificationToken: rawToken,
  };
};

const loginUser = async ({ email, password }) => {
  // Find the user
  const user = await User.findOne({ email });

  // Check if the user exists
  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

  // Check if the account supports local authentication
  if (!user.authProviders.includes("local")) {
    throw new ApiError(401, "Invalid email or password.");
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password.");
  }

  // Check if the email is verified
  if (!user.isEmailVerified) {
    throw new ApiError(403, "Please verify your email before logging in.");
  }

  // JWT payload
  const payload = {
    userId: user._id.toString(),
    email: user.email,
  };

  // Generate tokens
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Hash the refresh token before storing it
  const hashedRefreshToken = hashToken(refreshToken);

  // Save hashed refresh token
  user.refreshToken = hashedRefreshToken;
  await user.save();

  // Return authentication response
  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      authProviders: user.authProviders,
    },
  };
};

const refreshAccessToken = async (refreshToken) => {
  let decoded;

  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token.");
  }

  // Find the user
  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new ApiError(401, "Invalid refresh token.");
  }

  // Hash the incoming refresh token
  const hashedRefreshToken = hashToken(refreshToken);

  // Compare with stored hash
  if (user.refreshToken !== hashedRefreshToken) {
    throw new ApiError(401, "Invalid refresh token.");
  }

  // Create a new JWT payload
  const payload = {
    userId: user._id.toString(),
    email: user.email,
  };

  // Generate new tokens
  const newAccessToken = generateAccessToken(payload);
  const newRefreshToken = generateRefreshToken(payload);

  // Hash the new refresh token
  const newHashedRefreshToken = hashToken(newRefreshToken);

  // Store the new hashed refresh token
  user.refreshToken = newHashedRefreshToken;
  await user.save();

  // Return the new tokens
  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      authProviders: user.authProviders,
    },
  };
};

const forgotPassword = async (email) => {
  // Find the user
  const user = await User.findOne({ email });

  // Always return a generic success response
  if (!user) {
    return {
      message:
        "If an account with that email exists, a password reset email has been sent.",
    };
  }

  // Only local authentication accounts can reset a password
  if (!user.authProviders.includes("local")) {
    return {
      message:
        "If an account with that email exists, a password reset email has been sent.",
    };
  }

  // Generate a secure token (1 hour expiry)
  const { rawToken, hashedToken, expiresAt } = generateSecureToken(
    60 * 60 * 1000,
  );

  // Store the hashed token and expiry
  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = expiresAt;

  await user.save();

  return {
    user,
    resetToken: rawToken,
    message:
      "If an account with that email exists, a password reset email has been sent.",
  };
};

const resetPassword = async ({ token, password }) => {
  // Hash the incoming token
  const hashedToken = hashToken(token);

  // Find a user with a matching valid token
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired password reset token.");
  }

  // Only accounts with local authentication can reset a password
  if (!user.authProviders.includes("local")) {
    throw new ApiError(400, "Invalid or expired password reset token.");
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Update the password
  user.password = hashedPassword;

  // Clear reset fields
  user.passwordResetToken = null;
  user.passwordResetExpires = null;

  // Invalidate all existing sessions
  user.refreshToken = null;

  await user.save();

  return {
    message: "Password reset successfully.",
  };
};

const getCurrentUser = async (userId) => {
  const user = await User.findById(userId).select(
    "_id fullName email isEmailVerified authProviders createdAt",
  );

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    authProviders: user.authProviders,
    createdAt: user.createdAt,
  };
};

const updateProfile = async (userId, { fullName }) => {
  // Find the authenticated user
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  // Update editable fields
  user.fullName = fullName;

  await user.save();

  // Return the updated profile
  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const changePassword = async (userId, { currentPassword, newPassword }) => {
  // Find the authenticated user
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  // Only accounts with local authentication can change a password.
  if (!user.authProviders.includes("local")) {
    throw new ApiError(400, "Password authentication is not enabled.");
  }

  // Verify current password
  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Current password is incorrect.");
  }

  // Prevent reusing the same password
  const isSamePassword = await bcrypt.compare(newPassword, user.password);

  if (isSamePassword) {
    throw new ApiError(
      400,
      "New password must be different from the current password.",
    );
  }

  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  // Update password
  user.password = hashedPassword;

  // Invalidate existing refresh token
  user.refreshToken = null;

  await user.save();

  return {
    message: "Password changed successfully. Please log in again.",
  };
};

const deleteAccount = async (userId) => {
  // Find the authenticated user
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  // Permanently delete the user account
  await User.findByIdAndDelete(userId);

  return {
    message: "Account deleted successfully.",
  };
};

const logoutUser = async (refreshToken) => {
  let decoded;

  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (error) {
    throw new ApiError(401, "Invalid or expired refresh token.");
  }

  // Find the user
  const user = await User.findById(decoded.userId);

  if (!user) {
    throw new ApiError(401, "Invalid refresh token.");
  }

  // Hash the incoming refresh token
  const hashedRefreshToken = hashToken(refreshToken);

  // Compare with stored hash
  if (user.refreshToken !== hashedRefreshToken) {
    throw new ApiError(401, "Invalid refresh token.");
  }

  // Clear the stored refresh token
  user.refreshToken = null;
  await user.save();

  return {
    message: "Logged out successfully.",
  };
};

const verifyEmail = async (token) => {
  const hashedToken = hashToken(token);

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: new Date() },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired verification link.");
  }

  if (user.isEmailVerified) {
    throw new ApiError(400, "Email is already verified.");
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = null;
  user.emailVerificationExpires = null;

  await user.save();

  return {
    message: "Email verified successfully.",
  };
};
export {
  getAuthHealth,
  registerUser,
  loginUser,
  refreshAccessToken,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  updateProfile,
  changePassword,
  deleteAccount,
  logoutUser,
  verifyEmail,
};
