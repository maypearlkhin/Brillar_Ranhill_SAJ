"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { buildWidgetSrc, extractScriptSrc, injectWidgetScript } from "@/lib/widget-utils";

interface IntegrationResponse {
  success: boolean;
  integration: { script?: string; token?: string } | null;
}

/**
 * Loads the widget for logged-in customers with userId appended to the script URL.
 */
export default function IntegrationWidget() {
  const { user } = useAuth();
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!user?._id || user.role !== "customer") {
      cleanupRef.current?.();
      cleanupRef.current = null;
      return;
    }

    let cancelled = false;

    api
      .get<IntegrationResponse>("/integration/me")
      .then(({ data }) => {
        if (cancelled || !data?.integration?.script) return;

        const src = extractScriptSrc(data.integration.script);
        if (!src) return;

        const scriptSrc = buildWidgetSrc(src, user._id);
        cleanupRef.current = injectWidgetScript(scriptSrc, data.integration.token);
      })
      .catch(() => {
        if (!cancelled) {
          cleanupRef.current?.();
          cleanupRef.current = null;
        }
      });

    return () => {
      cancelled = true;
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [user?._id, user?.role]);

  return null;
}
