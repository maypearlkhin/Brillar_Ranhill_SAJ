import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import * as reportController from "../controllers/reportController.js";

const router = Router();

router.use(authMiddleware);

router.get("/dashboard", asyncHandler(reportController.getDashboard));
router.get("/", adminMiddleware, asyncHandler(reportController.getReports));

export default router;
