import bcrypt from "bcrypt";

import User from "../models/user.model.js";

import ApiError from "../../../shared/errors/ApiError.js";

import { verifyGoogleIdToken } from "../utils/google.utils.js";

import { generateReauthToken } from "../utils/reauth.util.js";

const reauthenticateUser = async (userId, { method, password, idToken }) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  if (method === "password") {
    if (!user.authProviders.includes("local")) {
      throw new ApiError(400, "Password authentication is not enabled.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Re-authentication failed.");
    }
  }

  if (method === "google") {
    if (!user.authProviders.includes("google")) {
      throw new ApiError(400, "Google authentication is not enabled.");
    }

    let googlePayload;

    try {
      googlePayload = await verifyGoogleIdToken(idToken);
    } catch (error) {
      throw new ApiError(401, "Re-authentication failed.");
    }

    if (
      googlePayload.sub !== user.googleId ||
      googlePayload.email !== user.email
    ) {
      throw new ApiError(401, "Re-authentication failed.");
    }

    if (!googlePayload.email_verified) {
      throw new ApiError(403, "Your Google email address must be verified.");
    }
  }

  const reauthToken = generateReauthToken({
    userId: user._id.toString(),
    purpose: "delete-account",
  });

  return {
    reauthToken,
  };
};

export { reauthenticateUser };
