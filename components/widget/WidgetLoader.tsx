"use client";

import { useEffect } from "react";
import { getWidgetToken, getWidgetUrl } from "@/lib/runtime-env";

const WIDGET_SCRIPT_ATTRIBUTE = "data-widget-loader";

/**
 * Dynamically injects a single external widget `<script>` tag, sourced
 * from runtime environment variables. It does not know anything about the
 * widget's own behaviour — that is entirely up to the injected script.
 *
 * Renders nothing. Safe to drop anywhere in the tree (e.g. root layout).
 * No-ops gracefully when the widget URL is not configured.
 */
export default function WidgetLoader(): null {
  useEffect(() => {
    const widgetUrl = getWidgetUrl();
    const widgetToken = getWidgetToken();
    
    if (!widgetUrl) {
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[${WIDGET_SCRIPT_ATTRIBUTE}="true"][src="${widgetUrl}"]`,
    );
    
    if (existingScript) {
      return;
    }

    const script = document.createElement("script");
    script.src = widgetUrl;
    script.async = true;
    script.setAttribute(WIDGET_SCRIPT_ATTRIBUTE, "true");
    if (widgetToken) {
      script.setAttribute("data-widget-token", widgetToken);
    }
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
