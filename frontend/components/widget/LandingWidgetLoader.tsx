"use client";

import { useEffect, useRef } from "react";
import { getApiBaseUrl } from "@/lib/api-config";
import { buildWidgetSrc, extractScriptSrc, injectWidgetScript } from "@/lib/widget-utils";

interface IntegrationResponse {
  success: boolean;
  integration: { script?: string; token?: string } | null;
}

/**
 * Loads the public widget script on landing pages (no userId).
 */
export default function LandingWidgetLoader() {
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`${getApiBaseUrl()}/integration/public`)
      .then((res) => res.json() as Promise<IntegrationResponse>)
      .then((data) => {
        if (cancelled || !data?.integration?.script) return;

        const src = extractScriptSrc(data.integration.script);
        if (!src) return;

        cleanupRef.current = injectWidgetScript(buildWidgetSrc(src), data.integration.token);
      })
      .catch(() => {
        if (!cancelled) cleanupRef.current = null;
      });

    return () => {
      cancelled = true;
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, []);

  return null;
}
