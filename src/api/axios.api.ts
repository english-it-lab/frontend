import axios from "axios";

import { apiBaseUrl } from "@/config/app-config";

const instance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  withXSRFToken: true,
});

export default instance;
