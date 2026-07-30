import crypto from "crypto";

//Reusable function to hash any token
const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const generateVerificationToken = () => {
  //Generate a secure random token
  const rawToken = crypto.randomBytes(32).toString("hex");

  //Hash the token before storing it
  const hashedToken = hashToken(rawToken);

  //Token expires in 24 hours
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

  return {
    rawToken,
    hashedToken,
    expiresAt,
  };
};

export { generateVerificationToken, hashToken };
