import * as integrationService from "../services/integrationService.js";
import { DEFAULT_ATENXION_BACKEND_URL } from "../models/Integration.js";

export async function getIntegration(req, res) {
  const integration = await integrationService.getIntegration();
  res.json({ success: true, integration });
}

export async function createIntegration(req, res) {
  const { script, token, atenxionBackendUrl } = req.body;

  if (!script || typeof script !== "string" || !script.trim()) {
    return res.status(400).json({ message: "Script is required." });
  }

  const integration = await integrationService.createIntegration({
    script: script.trim(),
    token: typeof token === "string" ? token.trim() : "",
    atenxionBackendUrl:
      typeof atenxionBackendUrl === "string" && atenxionBackendUrl.trim()
        ? atenxionBackendUrl.trim()
        : DEFAULT_ATENXION_BACKEND_URL,
  });

  res.status(201).json({ success: true, integration });
}

export async function updateIntegration(req, res) {
  const { script, token, atenxionBackendUrl } = req.body;

  if (script !== undefined && (typeof script !== "string" || !script.trim())) {
    return res.status(400).json({ message: "Script cannot be empty." });
  }

  const integration = await integrationService.updateIntegration({
    script: typeof script === "string" ? script.trim() : undefined,
    token: typeof token === "string" ? token.trim() : undefined,
    atenxionBackendUrl:
      typeof atenxionBackendUrl === "string" ? atenxionBackendUrl.trim() : undefined,
  });

  res.json({ success: true, integration });
}

export async function deleteIntegration(req, res) {
  const result = await integrationService.deleteIntegration();
  res.json({ success: true, ...result });
}

export async function getPublicIntegration(req, res) {
  const integration = await integrationService.getPublicIntegration();
  res.json({ success: true, integration });
}

export async function getMyIntegration(req, res) {
  const integration = await integrationService.getPublicIntegration();
  res.json({ success: true, integration });
}
