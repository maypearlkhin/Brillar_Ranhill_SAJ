import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import * as planController from "../controllers/planController.js";

const router = Router();

router.get("/", asyncHandler(planController.listPlans));

router.use(authMiddleware, adminMiddleware);

router.post("/", asyncHandler(planController.createPlan));
router.get("/:id", asyncHandler(planController.getPlan));
router.patch("/:id", asyncHandler(planController.updatePlan));
router.delete("/:id", asyncHandler(planController.deletePlan));

export default router;
