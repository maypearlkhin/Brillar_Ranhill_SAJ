const WIDGET_SCRIPT_ATTRIBUTE = "data-widget-loader";

/**
 * Extracts the src URL from a script tag string or returns a bare URL.
 */
export function extractScriptSrc(script: string): string | null {
  if (!script || typeof script !== "string") return null;

  const trimmed = script.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  const match = trimmed.match(/src\s*=\s*["']([^"']+)["']/i);
  return match?.[1]?.trim() ?? null;
}

export function buildWidgetSrc(src: string, userId?: string): string {
  try {
    const urlObj = new URL(src);
    if (userId) {
      urlObj.searchParams.set("userId", userId);
    }
    return urlObj.toString();
  } catch {
    return src;
  }
}

export function injectWidgetScript(scriptSrc: string, token?: string | null): () => void {
  const existing = document.querySelector<HTMLScriptElement>(
    `script[${WIDGET_SCRIPT_ATTRIBUTE}="true"][src="${scriptSrc}"]`,
  );
  if (existing) {
    return () => {};
  }

  const script = document.createElement("script");
  script.src = scriptSrc;
  script.async = true;
  script.setAttribute(WIDGET_SCRIPT_ATTRIBUTE, "true");
  if (token) {
    script.setAttribute("data-widget-token", token);
  }
  document.body.appendChild(script);

  return () => {
    if (script.parentNode) {
      script.parentNode.removeChild(script);
    }
  };
}

export function removeAllWidgetScripts(): void {
  document
    .querySelectorAll<HTMLScriptElement>(`script[${WIDGET_SCRIPT_ATTRIBUTE}="true"]`)
    .forEach((node) => node.remove());
}
