import axios from "axios";

import instance from "@/api/axios.api";
import type {
  AuthentificationResponseDto,
  authData,
  registerData,
} from "@/types/authorizationTypes";

import type { AxiosResponse } from "axios";

interface registerParams {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
}

interface authParams {
  email: string;
  password: string;
}

export const getToken = async (): Promise<void> => {
  return Promise.resolve();
};

export const registerService = async (
  registerData: registerData,
): Promise<AxiosResponse<AuthentificationResponseDto>> => {
  const prms: registerParams = {
    firstname: registerData.firstname,
    lastname: registerData.lastname,
    email: registerData.email,
    phone: registerData.phone,
    password: registerData.password,
  };

  return instance.post<AuthentificationResponseDto>("/auth/register", prms, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const authService = async (
  authData: authData,
): Promise<AxiosResponse<AuthentificationResponseDto>> => {
  const prms: authParams = {
    email: authData.email,
    password: authData.password,
  };

  return instance.post<AuthentificationResponseDto>("/auth/login", prms, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const logout = async (): Promise<void> => {
  await instance.post("/auth/logout");
};

export const checkAuth = async (): Promise<
  AxiosResponse<AuthentificationResponseDto>
> => {
  return instance.post("/auth/refresh_tokens", {});
};

export const getAuthErrorMessage = (error: unknown): string => {
  if (!axios.isAxiosError(error)) {
    return "Не удалось выполнить запрос. Попробуйте позже.";
  }

  const detail = error.response?.data?.detail;

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail) && detail.length > 0) {
    return "Проверьте корректность заполнения формы.";
  }

  if (error.response?.status === 401) {
    return "Неверный email или пароль.";
  }

  if (error.response?.status === 409) {
    return "Пользователь с такими данными уже существует.";
  }

  return "Сервер авторизации недоступен. Попробуйте позже.";
};
