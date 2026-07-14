import api from "./api";

export const DEFAULT_ATENXION_BACKEND_URL = "https://backend.atenxion.ai/api";

export interface IntegrationConfig {
  _id: string;
  script: string;
  token: string;
  atenxionBackendUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface PublicIntegrationConfig {
  script: string;
  token: string;
  atenxionBackendUrl: string;
}

interface IntegrationResponse {
  success: boolean;
  integration: IntegrationConfig | null;
}

interface PublicIntegrationResponse {
  success: boolean;
  integration: PublicIntegrationConfig | null;
}

export type IntegrationPayload = {
  script: string;
  token: string;
  atenxionBackendUrl: string;
};

export async function getIntegration() {
  const { data } = await api.get<IntegrationResponse>("/integration");
  return data.integration;
}

export async function getPublicIntegrationConfig() {
  const { data } = await api.get<PublicIntegrationResponse>("/integration/public");
  return data.integration;
}

export async function createIntegration(payload: IntegrationPayload) {
  const { data } = await api.post<IntegrationResponse>("/integration", payload);
  return data.integration;
}

export async function updateIntegration(payload: IntegrationPayload) {
  const { data } = await api.put<IntegrationResponse>("/integration", payload);
  return data.integration;
}

export async function deleteIntegration() {
  await api.delete("/integration");
}
