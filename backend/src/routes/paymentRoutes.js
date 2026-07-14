import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import * as paymentController from "../controllers/paymentController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "../../uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    cb(ext && mime ? null : new Error("Only image files allowed"), ext && mime);
  },
});

const router = Router();

router.use(authMiddleware);

router.get("/latest", asyncHandler(paymentController.getLatestPayment));
router.get("/", asyncHandler(paymentController.listPayments));
router.post(
  "/",
  upload.single("screenshot"),
  asyncHandler(paymentController.createPayment)
);
router.get("/:id", asyncHandler(paymentController.getPayment));
router.patch(
  "/:id",
  adminMiddleware,
  asyncHandler(paymentController.updatePayment)
);
router.delete(
  "/:id",
  adminMiddleware,
  asyncHandler(paymentController.deletePayment)
);

export default router;
