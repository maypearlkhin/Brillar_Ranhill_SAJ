import * as authService from "../services/authService.js";
import { notifyUserLogin, notifyUserLogout } from "../services/atenxionWebhookService.js";
import { WaterPlan } from "../models/WaterPlan.js";

export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const result = await authService.loginUser(email, password);
  console.log(`[Auth] Login OK: ${result.user.email} role=${result.user.role}`);

  if (result.user.role === "customer" && result.user._id) {
    console.log(`[Auth] Triggering Atenxion login webhook...`);
    await notifyUserLogin(result.user._id);
  }

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

export async function logout(req, res) {
  console.log(`[Auth] Logout: ${req.user.email} role=${req.user.role}`);
  if (req.user.role === "customer" && req.user._id) {
    console.log(`[Auth] Triggering Atenxion logout webhook...`);
    await notifyUserLogout(req.user._id);
  }
  res.json({ ok: true });
}

export async function getActivePlans(req, res) {
  const plans = await WaterPlan.find({ status: "active" }).sort({ name: 1 });
  res.json(plans);
}
