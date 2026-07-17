import asyncHandler from "../../../utils/asyncHandler.js";
import { registerUser } from "../services/auth.service.js";

const register = asyncHandler(async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    },
  });
});

export { register };
