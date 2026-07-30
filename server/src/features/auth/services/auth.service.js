import bcrypt from "bcrypt";
import User from "../../auth/models/user.model.js";
import ApiError from "../../../shared/errors/ApiError.js";
import { generateVerificationToken, hashToken } from "../utils/token.utils.js";

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
export { getAuthHealth, registerUser, verifyEmail };
