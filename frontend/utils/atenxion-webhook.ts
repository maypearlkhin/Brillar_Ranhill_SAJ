import {
  DEFAULT_ATENXION_BACKEND_URL,
  type PublicIntegrationConfig,
} from "@/services/integrationService";

function normalizeBaseUrl(url?: string): string {
  return (url?.trim() || DEFAULT_ATENXION_BACKEND_URL).replace(/\/$/, "");
}

async function postAtenxionEvent(
  path: string,
  userId: string,
  config: Pick<PublicIntegrationConfig, "atenxionBackendUrl" | "token">,
) {
  const endpoint = `${normalizeBaseUrl(config.atenxionBackendUrl)}${path}`;

  await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: config.token || "",
    },
    body: JSON.stringify({ userId }),
  });
}

export async function sendLoginEvent(
  userId: string,
  config: Pick<PublicIntegrationConfig, "atenxionBackendUrl" | "token">,
) {
  try {
    await postAtenxionEvent("/post-login/user-login", userId, config);
  } catch {
    // Non-blocking: login should still succeed if webhook fails.
  }
}

export async function sendLogoutEvent(
  userId: string,
  config: Pick<PublicIntegrationConfig, "atenxionBackendUrl" | "token">,
) {
  try {
    await postAtenxionEvent("/post-login/user-logout", userId, config);
  } catch {
    // Non-blocking: logout should still proceed if webhook fails.
  }
}
