import User from "../features/auth/models/user.model.js";
import ApiError from "../shared/errors/ApiError.js";
import { verifyAccessToken } from "../features/auth/utils/jwt.util.js";

const authenticate = async (req, res, next) => {
  try {
    // Read Authorization header
    const authHeader = req.headers.authorization;

    // Ensure the header exists and uses the Bearer scheme
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Access denied. No valid access token provided.");
    }

    // Extract the JWT
    const accessToken = authHeader.split(" ")[1];

    let decoded;

    try {
      decoded = verifyAccessToken(accessToken);
    } catch (error) {
      throw new ApiError(401, "Invalid or expired access token.");
    }

    // Find the authenticated user
    const user = await User.findById(decoded.userId).select(
      "-password -refreshToken",
    );

    if (!user) {
      throw new ApiError(401, "User no longer exists.");
    }

    // Attach the authenticated user to the request
    req.user = user;

    // Continue to the next middleware or controller
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
