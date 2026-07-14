import { Router } from "express";
import authRoutes from "./authRoutes.js";
import customerRoutes from "./customerRoutes.js";
import planRoutes from "./planRoutes.js";
import paymentRoutes from "./paymentRoutes.js";
import reportRoutes from "./reportRoutes.js";
import integrationRoutes from "./integrationRoutes.js";
import agentRoutes from "./agentRoutes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

router.use("/auth", authRoutes);
router.use("/customers", customerRoutes);
router.use("/plans", planRoutes);
router.use("/payments", paymentRoutes);
router.use("/reports", reportRoutes);
router.use("/integration", integrationRoutes);
router.use("/v1", agentRoutes);

export default router;
