import { User } from "../models/User.js";
import { WaterPlan } from "../models/WaterPlan.js";
import { generateToken } from "../utils/generateToken.js";

function sanitizeUser(user) {
  const obj = user.toObject ? user.toObject() : user;
  delete obj.password;
  return obj;
}

export async function loginUser(email, password) {
  const user = await User.findOne({ email: email.toLowerCase() }).select(
    "+password"
  );

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  if (user.role === "customer" && user.status !== "approved") {
    const error = new Error(
      user.status === "pending"
        ? "Your account is pending approval"
        : "Your account has been disabled"
    );
    error.statusCode = 403;
    throw error;
  }

  const populated = await User.findById(user._id).populate("waterPlan");
  const token = generateToken(user._id);

  return { token, user: sanitizeUser(populated) };
}

export async function registerCustomer(data) {
  const existing = await User.findOne({ email: data.email.toLowerCase() });
  if (existing) {
    const error = new Error("Email already registered");
    error.statusCode = 400;
    throw error;
  }

  const plan = await WaterPlan.findById(data.waterPlan);
  if (!plan || plan.status !== "active") {
    const error = new Error("Invalid water plan selected");
    error.statusCode = 400;
    throw error;
  }

  const usage = Math.floor(Math.random() * 20) + 5;
  const usageCharge = Math.max(0, usage - plan.includedUsage) * plan.pricePerM3;
  const initialBalance = plan.monthlyFee + usageCharge;

  const user = await User.create({
    fullName: data.fullName,
    phone: data.phone,
    email: data.email,
    password: data.password,
    address: data.address,
    meterNumber: data.meterNumber,
    waterPlan: data.waterPlan,
    role: "customer",
    status: "pending",
    currentBalance: initialBalance,
    usageThisMonth: usage,
    waterStatus: "on",
  });

  const populated = await User.findById(user._id).populate("waterPlan");
  return sanitizeUser(populated);
}

export async function getProfile(userId) {
  const user = await User.findById(userId).populate("waterPlan");
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }
  return sanitizeUser(user);
}
