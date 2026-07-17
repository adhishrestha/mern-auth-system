import bcrypt from "bcrypt";
import ApiError from "../../../utils/ApiError.js";
import User from "../models/user.model.js";

const SALT_ROUNDS = 12;

const registerUser = async ({ fullName, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  return user;
};

export { registerUser };
