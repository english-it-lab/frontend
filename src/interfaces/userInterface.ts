export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  currentRole: string;
}

export type UserCreateData = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  currentRole: string;
};

export type UserUpdateData = UserCreateData;
