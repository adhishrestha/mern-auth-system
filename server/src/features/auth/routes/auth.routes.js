import { Router } from "express";
import { authHealth } from "../controllers/auth.controller.js";

const router = Router();

router.get("/health", authHealth);

export default router;
