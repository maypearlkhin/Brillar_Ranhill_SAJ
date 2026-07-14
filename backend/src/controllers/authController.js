import * as authService from "../services/authService.js";
import { WaterPlan } from "../models/WaterPlan.js";

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const result = await authService.loginUser(email, password);
  res.json(result);
}

export async function register(req, res) {
  return res.status(403).json({
    message: "Self-registration is disabled. Please contact Ranhill SAJ to open an account.",
  });
}

export async function getProfile(req, res) {
  const user = await authService.getProfile(req.user._id);
  res.json(user);
}

export async function getActivePlans(req, res) {
  const plans = await WaterPlan.find({ status: "active" }).sort({ name: 1 });
  res.json(plans);
}
