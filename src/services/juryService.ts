import instance from "@/api/axios.api";
import type { Jury, JuryCreateData, JuryUpdateData } from "@/types/juryTypes";

export const getJuries = async () => {
  const response = await instance.get<Jury[]>("/juries/");

  return response.data;
};

export const createJury = async (data: JuryCreateData) => {
  const response = await instance.post<Jury>("/juries/", data);

  return response.data;
};

export const updateJury = async (juryId: number, data: JuryUpdateData) => {
  const response = await instance.patch<Jury>(`/juries/${juryId}`, data);

  return response.data;
};

export const deleteJury = async (juryId: number) => {
  await instance.delete(`/juries/${juryId}`);
};
