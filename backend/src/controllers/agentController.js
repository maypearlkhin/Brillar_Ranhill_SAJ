import * as agentService from "../services/agentService.js";

export async function getBillingByUser(req, res) {
  const { userId } = req.body;

  if (!userId || typeof userId !== "string" || !userId.trim()) {
    return res.status(400).json({ error: "userId is required." });
  }

  const billing = await agentService.getBillingByUserId(userId.trim());
  res.json(billing);
}
