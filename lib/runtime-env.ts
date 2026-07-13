/**
 * Centralized, typed access to runtime environment variables.
 *
 * Only NEXT_PUBLIC_* variables are safe to read on the client. Values are
 * read lazily (never inlined at build time by callers) and every accessor
 * fails gracefully by returning `null` instead of throwing, so optional
 * integrations (like the widget loader) can no-op when unconfigured.
 */

import { env } from 'next-runtime-env';

export interface RuntimeEnv {
  widgetUrl: string | null;
  widgetToken: string | null;
}

function readEnvVar(key: string): string | null {
  const value = env(key);
  if (typeof value !== "string" || value.trim().length === 0) {
    return null;
  }
  return value.trim();
}

export function getWidgetUrl(): string | null {
  return readEnvVar("NEXT_PUBLIC_WIDGET_URL");
}

export function getWidgetToken(): string | null {
  return readEnvVar("NEXT_PUBLIC_WIDGET_TOKEN");
}

export function getRuntimeEnv(): RuntimeEnv {
  return {
    widgetUrl: getWidgetUrl(),
    widgetToken: getWidgetToken(),
  };
}
