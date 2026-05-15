import instance from "@/api/axios.api";
import type {
  IUser,
  UserCreateData,
  UserUpdateData,
} from "@/interfaces/userInterface";

type UserApiResponse = {
  id: string | number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  currentRole?: string;
  current_role?: string;
};

const mapUserFromApi = (user: UserApiResponse): IUser => ({
  id: String(user.id),
  firstname: user.firstname,
  lastname: user.lastname,
  email: user.email,
  phone: user.phone,
  currentRole: user.currentRole ?? user.current_role ?? "",
});

const mapUserToApi = (data: UserCreateData | UserUpdateData) => ({
  firstname: data.firstname,
  lastname: data.lastname,
  email: data.email,
  phone: data.phone,
  currentRole: data.currentRole,
});

export const getUsers = async () => {
  const response = await instance.get<UserApiResponse[]>("/users/");

  return response.data.map(mapUserFromApi);
};

export const createUser = async (data: UserCreateData) => {
  const response = await instance.post<UserApiResponse>(
    "/users/",
    mapUserToApi(data),
  );

  return mapUserFromApi(response.data);
};

export const updateUser = async (userId: string, data: UserUpdateData) => {
  const response = await instance.patch<UserApiResponse>(
    `/users/${userId}`,
    mapUserToApi(data),
  );

  return mapUserFromApi(response.data);
};

export const deleteUser = async (userId: string) => {
  await instance.delete(`/users/${userId}`);
};
