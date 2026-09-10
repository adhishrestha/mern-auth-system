import User from "../models/user.model.js";

import ApiError from "../../../shared/errors/ApiError.js";

import { verifyGoogleIdToken } from "../utils/google.utils.js";

import { hashToken } from "../utils/token.utils.js";

import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.util.js";

const googleAuthUser = async (idToken) => {
  // Verify the Google ID token
  let googlePayload;

  try {
    googlePayload = await verifyGoogleIdToken(idToken);
  } catch (error) {
    throw new ApiError(401, "Invalid Google authentication.");
  }

  const {
    sub: googleId,
    email,
    email_verified: emailVerified,
    name,
    picture,
  } = googlePayload;

  // Google must provide these values
  if (!googleId || !email) {
    throw new ApiError(401, "Invalid Google authentication.");
  }

  // Only allow Google accounts with verified email addresses
  if (!emailVerified) {
    throw new ApiError(403, "Your Google email address must be verified.");
  }

  // Find an existing Google account first
  let user = await User.findOne({ googleId });

  if (user) {
    // Keep the latest Google profile information
    user.fullName = name || user.fullName;
    user.avatar = picture || user.avatar;
    user.isEmailVerified = true;

    if (!user.authProviders.includes("google")) {
      user.authProviders.push("google");
    }

    await user.save();
  } else {
    // Check whether this email already belongs to an existing account
    user = await User.findOne({ email });

    if (user) {
      // Link Google authentication to the existing account
      if (!user.authProviders.includes("google")) {
        user.authProviders.push("google");
      }

      user.googleId = googleId;
      user.avatar = picture || user.avatar;
      user.isEmailVerified = true;

      await user.save();
    } else {
      // Create a new Google-only account
      user = await User.create({
        fullName: name || "Google User",
        email,
        googleId,
        avatar: picture || null,
        authProviders: ["google"],
        isEmailVerified: true,
      });
    }
  }

  // Create our application's JWT payload
  const payload = {
    userId: user._id.toString(),
    email: user.email,
  };

  // Generate our own access and refresh tokens
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Never store the raw refresh token
  const hashedRefreshToken = hashToken(refreshToken);

  user.refreshToken = hashedRefreshToken;

  await user.save();

  return {
    accessToken,
    refreshToken,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      avatar: user.avatar,
      authProviders: user.authProviders,
    },
  };
};

export { googleAuthUser };
