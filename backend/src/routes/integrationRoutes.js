import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import * as integrationController from "../controllers/integrationController.js";

const router = Router();

router.get("/public", asyncHandler(integrationController.getPublicIntegration));
router.get("/me", authMiddleware, asyncHandler(integrationController.getMyIntegration));

router.use(authMiddleware, adminMiddleware);

router.get("/", asyncHandler(integrationController.getIntegration));
router.post("/", asyncHandler(integrationController.createIntegration));
router.put("/", asyncHandler(integrationController.updateIntegration));
router.delete("/", asyncHandler(integrationController.deleteIntegration));

export default router;
