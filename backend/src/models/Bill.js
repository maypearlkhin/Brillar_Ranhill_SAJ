import mongoose from "mongoose";

const billSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WaterPlan",
      default: null,
    },
    billingPeriod: { type: Date, required: true },
    periodStart: { type: Date, required: true },
    periodEnd: { type: Date, required: true },
    meterReadingStart: { type: Number, required: true, min: 0 },
    meterReadingEnd: { type: Number, required: true, min: 0 },
    usageM3: { type: Number, required: true, min: 0 },
    monthlyFee: { type: Number, required: true, min: 0 },
    usageCharge: { type: Number, required: true, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    paidAmount: { type: Number, default: 0, min: 0 },
    status: {
      type: String,
      enum: ["paid", "unpaid", "current"],
      default: "unpaid",
    },
    dueDate: { type: Date, required: true },
    paidDate: { type: Date, default: null },
  },
  { timestamps: true }
);

billSchema.index({ customer: 1, billingPeriod: 1 }, { unique: true });

export const Bill = mongoose.model("Bill", billSchema);
