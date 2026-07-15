import { getPublicIntegration } from "./integrationService.js";
import { DEFAULT_ATENXION_BACKEND_URL } from "../models/Integration.js";

async function postAtenxionEvent(path, userId) {
  const integration = await getPublicIntegration();
  const baseUrl = (integration?.atenxionBackendUrl || DEFAULT_ATENXION_BACKEND_URL).replace(
    /\/$/,
    "",
  );
  const token = integration?.token || "";
  const endpoint = `${baseUrl}${path}`;
  const body = { userId: String(userId) };

  console.log(`[Atenxion] POST ${endpoint}`);
  console.log(`[Atenxion] Body:`, JSON.stringify(body));

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
    body: JSON.stringify(body),
  });

  console.log(`[Atenxion] Response: HTTP ${response.status}`);

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    console.error(`[Atenxion] Failed ${path}:`, text || response.statusText);
  } else {
    console.log(`[Atenxion] OK ${path} userId=${userId}`);
  }
}

export async function notifyUserLogin(userId) {
  console.log(`[Atenxion] Login webhook called userId=${userId}`);
  try {
    await postAtenxionEvent("/post-login/user-login", userId);
  } catch (error) {
    console.error(`[Atenxion] Login webhook error userId=${userId}:`, error.message);
  }
}

export async function notifyUserLogout(userId) {
  console.log(`[Atenxion] Logout webhook called userId=${userId}`);
  try {
    await postAtenxionEvent("/post-login/user-logout", userId);
  } catch (error) {
    console.error(`[Atenxion] Logout webhook error userId=${userId}:`, error.message);
  }
}
