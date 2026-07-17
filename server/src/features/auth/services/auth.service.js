import ApiError from "../../../utils/ApiError.js";
import User from "../models/user.model.js";

const registerUser = async ({ fullName, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "Email already registered");
  }

  const user = await User.create({
    fullName,
    email,
    password,
  });

  return user;
};

export { registerUser };
