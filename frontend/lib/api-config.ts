import { env } from "next-runtime-env";

export function getApiBaseUrl(): string {
  const value = env("NEXT_PUBLIC_API_URL");
  if (typeof value === "string" && value.trim()) {
    return value.trim().replace(/\/$/, "");
  }
  return "http://localhost:4013/api";
}
