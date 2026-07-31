import {
  getAuthHealth,
  registerUser,
  verifyEmail,
  loginUser,
} from "../services/auth.service.js";

import { sendVerificationEmail } from "../services/email.service.js";

const authHealth = (req, res) => {
  const response = getAuthHealth();

  res.status(200).json(response);
};

const register = async (req, res, next) => {
  try {
    const { user, verificationToken } = await registerUser(req.body);

    await sendVerificationEmail({
      email: user.email,
      name: user.fullName,
      verificationToken,
    });

    res.status(201).json({
      success: true,
      message:
        "User registered successfully. Please check your email to verify your account.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmailController = async (req, res, next) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Verification token is required.",
      });
    }

    const result = await verifyEmail(token);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const authData = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: authData,
    });
  } catch (error) {
    next(error);
  }
};

export { authHealth, register, verifyEmailController, loginController };
