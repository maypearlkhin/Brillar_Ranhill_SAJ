import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6, select: false },
    address: { type: String, default: "" },
    meterNumber: { type: String, default: "" },
    waterPlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WaterPlan",
      default: null,
    },
    role: { type: String, enum: ["admin", "customer"], default: "customer" },
    status: {
      type: String,
      enum: ["pending", "approved", "disabled"],
      default: "pending",
    },
    currentBalance: { type: Number, default: 0, min: 0 },
    waterStatus: { type: String, enum: ["on", "off"], default: "on" },
    usageThisMonth: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model("User", userSchema);
