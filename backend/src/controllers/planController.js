import * as planService from "../services/planService.js";

export async function listPlans(req, res) {
  const plans = await planService.getPlans();
  res.json(plans);
}

export async function getPlan(req, res) {
  const plan = await planService.getPlanById(req.params.id);
  res.json(plan);
}

export async function createPlan(req, res) {
  const plan = await planService.createPlan(req.body);
  res.status(201).json(plan);
}

export async function updatePlan(req, res) {
  const plan = await planService.updatePlan(req.params.id, req.body);
  res.json(plan);
}

export async function deletePlan(req, res) {
  const result = await planService.deletePlan(req.params.id);
  res.json(result);
}
