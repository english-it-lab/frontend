type RuntimeConfig = {
  VITE_API_BASE_URL?: string;
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
  "http://localhost:8080";
