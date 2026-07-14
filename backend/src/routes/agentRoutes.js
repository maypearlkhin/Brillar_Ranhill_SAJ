import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import * as agentController from "../controllers/agentController.js";

const router = Router();

// Public agent API — no authentication; POST body must include userId.
router.post("/billing/get-by-user", asyncHandler(agentController.getBillingByUser));

export default router;