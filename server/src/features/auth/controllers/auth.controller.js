import {
  getAuthHealth,
  registerUser,
  verifyEmail,
  loginUser,
  refreshAccessToken,
  logoutUser,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  updateProfile,
  changePassword,
  deleteAccount,
} from "../services/auth.service.js";

import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "../services/email.service.js";

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

const refreshTokenController = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const authData = await refreshAccessToken(refreshToken);

    res.status(200).json({
      success: true,
      message: "Access token refreshed successfully.",
      data: authData,
    });
  } catch (error) {
    next(error);
  }
};

const logoutController = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    const result = await logoutUser(refreshToken);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

const forgotPasswordController = async (req, res, next) => {
  try {
    const { email } = req.body;

    const result = await forgotPassword(email);

    // Only send an email if a user exists
    if (result.user && result.resetToken) {
      await sendPasswordResetEmail({
        email: result.user.email,
        name: result.user.fullName,
        resetToken: result.resetToken,
      });
    }

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

const resetPasswordController = async (req, res, next) => {
  try {
    const { token } = req.query;
    const { password } = req.body;

    const result = await resetPassword({
      token,
      password,
    });

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUserController = async (req, res, next) => {
  try {
    const user = await getCurrentUser(req.user.id);

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateProfileController = async (req, res, next) => {
  try {
    const updatedUser = await updateProfile(req.user._id, req.body);

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const changePasswordController = async (req, res, next) => {
  try {
    const result = await changePassword(req.user.id, req.body);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAccountController = async (req, res, next) => {
  try {
    const result = await deleteAccount(req.user._id, req.body.currentPassword);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

export {
  authHealth,
  register,
  verifyEmailController,
  loginController,
  refreshTokenController,
  logoutController,
  forgotPasswordController,
  resetPasswordController,
  getCurrentUserController,
  updateProfileController,
  changePasswordController,
  deleteAccountController,
};
