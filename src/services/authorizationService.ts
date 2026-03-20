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
  instance.get("/csrf_token").catch((err) => console.error(err));
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
  instance.post("/auth/logout").catch((err) => console.error(err));
};

export const checkAuth = async (): Promise<
  AxiosResponse<AuthentificationResponseDto>
> => {
  return instance.post(
    "/auth/refresh_tokens",
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );
};
