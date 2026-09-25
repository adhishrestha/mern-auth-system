import crypto from "crypto";

//Reusable function to hash any token
const hashToken = (token) => {
  return crypto.createHash("sha256").update(token).digest("hex");
};

const generateSecureToken = (expiresInMs = 24 * 60 * 60 * 1000) => {
  //Generate a secure random token
  const rawToken = crypto.randomBytes(32).toString("hex");

  //Hash the token before storing it
  const hashedToken = hashToken(rawToken);

  //Token expires in 24 hours
  const expiresAt = new Date(Date.now() + expiresInMs);

  return {
    rawToken,
    hashedToken,
    expiresAt,
  };
};

export { generateSecureToken, hashToken };
