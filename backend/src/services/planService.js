import { WaterPlan } from "../models/WaterPlan.js";

export async function getPlans() {
  return WaterPlan.find().sort({ createdAt: -1 });
}

export async function getPlanById(id) {
  const plan = await WaterPlan.findById(id);
  if (!plan) {
    const error = new Error("Plan not found");
    error.statusCode = 404;
    throw error;
  }
  return plan;
}

export async function createPlan(data) {
  return WaterPlan.create(data);
}

export async function updatePlan(id, data) {
  const plan = await WaterPlan.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!plan) {
    const error = new Error("Plan not found");
    error.statusCode = 404;
    throw error;
  }

  return plan;
}

export async function deletePlan(id) {
  const plan = await WaterPlan.findByIdAndDelete(id);
  if (!plan) {
    const error = new Error("Plan not found");
    error.statusCode = 404;
    throw error;
  }
  return { message: "Plan deleted" };
}
