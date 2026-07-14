import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import * as customerController from "../controllers/customerController.js";

const router = Router();

router.use(authMiddleware);

router.get("/me/billing/history", asyncHandler(customerController.getMyBillingHistory));
router.get("/me/billing", asyncHandler(customerController.getMyBilling));
router.get("/me/profile", asyncHandler(customerController.getMyProfile));
router.patch("/me/profile", asyncHandler(customerController.updateMyProfile));

router.get("/", adminMiddleware, asyncHandler(customerController.listCustomers));
router.post("/", adminMiddleware, asyncHandler(customerController.createCustomer));
router.get("/:id", adminMiddleware, asyncHandler(customerController.getCustomer));
router.patch("/:id", adminMiddleware, asyncHandler(customerController.updateCustomer));
router.delete("/:id", adminMiddleware, asyncHandler(customerController.deleteCustomer));

export default router;
