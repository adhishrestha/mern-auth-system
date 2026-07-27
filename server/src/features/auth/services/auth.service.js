import bcrypt from "bcrypt";
import User from "../../auth/models/user.model.js";
import ApiError from "../../../shared/errors/ApiError.js";

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

  //Create the user
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt,
  };
};

export { getAuthHealth, registerUser };
