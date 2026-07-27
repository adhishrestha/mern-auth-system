import { getAuthHealth, registerUser } from "../services/auth.service.js";

const authHealth = (req, res) => {
  const response = getAuthHealth();

  res.status(200).json(response);
};

const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export { authHealth, register };
