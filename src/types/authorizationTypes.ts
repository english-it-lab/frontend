import type { IUser } from "@/interfaces/userInterface";

export type registerData = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
};

export type authData = {
  email: string;
  password: string;
};

export type AuthentificationResponseDto = {
  token: string;
  user: IUser;
};
