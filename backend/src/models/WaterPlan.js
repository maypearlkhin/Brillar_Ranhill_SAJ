import mongoose from "mongoose";

const waterPlanSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    monthlyFee: { type: Number, required: true, min: 0 },
    pricePerM3: { type: Number, required: true, min: 0 },
    includedUsage: { type: Number, required: true, min: 0 },
    lateFee: { type: Number, default: 0, min: 0 },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

export const WaterPlan = mongoose.model("WaterPlan", waterPlanSchema);
