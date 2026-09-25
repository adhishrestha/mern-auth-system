import jwt from "jsonwebtoken";

const REAUTH_EXPIRES_IN = "5m";

const generateReauthToken = ({ userId, purpose }) => {
  return jwt.sign(
    {
      userId,
      purpose,
    },
    process.env.JWT_REAUTH_SECRET,
    {
      expiresIn: REAUTH_EXPIRES_IN,
    },
  );
};

const verifyReauthToken = (token) => {
  return jwt.verify(token, process.env.JWT_REAUTH_SECRET, {
    algorithms: ["HS256"],
  });
};

export { generateReauthToken, verifyReauthToken };
