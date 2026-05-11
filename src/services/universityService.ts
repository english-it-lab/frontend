import instance from "@/api/axios.api";
import type { University, UniversityCreateData } from "@/types/universityTypes";

export const getUniversities = async () => {
  const response = await instance.get<University[]>("/universities/");

  return response.data;
};

export const createUniversity = async (data: UniversityCreateData) => {
  const response = await instance.post<University>("/universities/", data);

  return response.data;
};
