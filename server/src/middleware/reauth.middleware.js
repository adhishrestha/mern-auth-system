import ApiError from "../shared/errors/ApiError.js";
import { verifyReauthToken } from "../features/auth/utils/reauth.util.js";

const requireReauthentication = (req, res, next) => {
  try {
    const reauthToken = req.headers["x-reauthentication-token"];

    if (!reauthToken) {
      throw new ApiError(401, "Re-authentication is required for this action.");
    }

    let decoded;

    try {
      decoded = verifyReauthToken(reauthToken);
    } catch (error) {
      throw new ApiError(401, "Invalid or expired re-authentication token.");
    }

    if (decoded.purpose !== "delete-account") {
      throw new ApiError(403, "Invalid re-authentication purpose.");
    }

    if (decoded.userId !== req.user._id.toString()) {
      throw new ApiError(
        401,
        "Re-authentication does not match the authenticated user.",
      );
    }

    req.reauth = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

export default requireReauthentication;
