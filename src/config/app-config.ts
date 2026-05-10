type RuntimeConfig = {
  VITE_API_BASE_URL?: string;
  VITE_ADMIN_PAGE_ENABLED?: string;
  VITE_AUTH_ENABLED?: string;
};

const runtimeConfig = (
  globalThis as typeof globalThis & {
    __APP_CONFIG__?: RuntimeConfig;
  }
).__APP_CONFIG__;

const runtimeApiBaseUrl = runtimeConfig?.VITE_API_BASE_URL?.trim();

export const apiBaseUrl =
  runtimeApiBaseUrl ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8000/api/v1";

const adminPageEnabledValue =
  runtimeConfig?.VITE_ADMIN_PAGE_ENABLED ??
  import.meta.env.VITE_ADMIN_PAGE_ENABLED;

export const adminPageEnabled = adminPageEnabledValue === "true";

const authEnabledValue =
  runtimeConfig?.VITE_AUTH_ENABLED ?? import.meta.env.VITE_AUTH_ENABLED;

export const authEnabled = authEnabledValue !== "false";
