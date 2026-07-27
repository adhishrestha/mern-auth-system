import { Router } from "express";
import { authHealth, register } from "../controllers/auth.controller.js";
import validate from "../../../middleware/validate.js";
import { registerSchema } from "../validators/auth.validator.js";

const router = Router();

// Health Check
router.get("/health", authHealth);

// Register
router.post("/register", validate(registerSchema), register);

export default router;
