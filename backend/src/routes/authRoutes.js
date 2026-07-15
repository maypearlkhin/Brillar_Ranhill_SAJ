import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import * as authController from "../controllers/authController.js";

const router = Router();

router.post("/login", asyncHandler(authController.login));
router.post("/logout", authMiddleware, asyncHandler(authController.logout));
router.post("/register", asyncHandler(authController.register));
router.get("/plans", asyncHandler(authController.getActivePlans));
router.get("/profile", authMiddleware, asyncHandler(authController.getProfile));

export default router;
