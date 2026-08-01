import bcrypt from "bcrypt";

import User from "../../auth/models/user.model.js";
import ApiError from "../../../shared/errors/ApiError.js";

import { generateVerificationToken, hashToken } from "../utils/token.utils.js";
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
  const { rawToken, hashedToken, expiresAt } = generateVerificationToken();

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
  logoutUser,
  verifyEmail,
};
