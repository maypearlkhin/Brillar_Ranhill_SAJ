import { getApiBaseUrl } from "@/lib/api-config";

export const DEFAULT_ATENXION_BACKEND_URL = "https://backend.atenxion.ai/api";

export interface WebhookConfig {
  atenxionBackendUrl: string;
  token: string;
}

async function loadWebhookConfig(): Promise<WebhookConfig> {
  try {
    const res = await fetch(`${getApiBaseUrl()}/integration/public`, {
      method: "GET",
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) {
      return { atenxionBackendUrl: DEFAULT_ATENXION_BACKEND_URL, token: "" };
    }
    const data = (await res.json()) as {
      integration?: { atenxionBackendUrl?: string; token?: string } | null;
    };
    return {
      atenxionBackendUrl: data.integration?.atenxionBackendUrl?.trim() || DEFAULT_ATENXION_BACKEND_URL,
      token: data.integration?.token?.trim() || "",
    };
  } catch {
    return { atenxionBackendUrl: DEFAULT_ATENXION_BACKEND_URL, token: "" };
  }
}

async function postEvent(path: string, userId: string, config: WebhookConfig) {
  const base = config.atenxionBackendUrl.replace(/\/$/, "");
  await fetch(`${base}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: config.token,
    },
    body: JSON.stringify({ userId }),
    signal: AbortSignal.timeout(8000),
  });
}

export async function sendLoginEvent(userId: string) {
  const config = await loadWebhookConfig();
  await postEvent("/post-login/user-login", userId, config);
}

export async function sendLogoutEvent(userId: string) {
  const config = await loadWebhookConfig();
  await postEvent("/post-login/user-logout", userId, config);
}
