import dotenv from "dotenv";

import {
  generateReauthToken,
  verifyReauthToken,
} from "../features/auth/utils/reauth.util.js";

dotenv.config();

const userId = "507f1f77bcf86cd799439011";

const token = generateReauthToken({
  userId,
  purpose: "delete-account",
});

console.log("Generated re-auth token:");
console.log(token);

const decoded = verifyReauthToken(token);

console.log("\nDecoded re-auth token:");
console.log(decoded);
