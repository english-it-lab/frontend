import instance from "@/api/axios.api";
import type {
  Section,
  SectionCreateData,
  SectionUpdateData,
} from "@/types/sectionTypes";

export const getSections = async () => {
  const response = await instance.get<Section[]>("/sections/");

  return response.data;
};

export const createSection = async (data: SectionCreateData) => {
  const response = await instance.post<Section>("/sections/", data);

  return response.data;
};

export const updateSection = async (sectionId: number, data: SectionUpdateData) => {
  const response = await instance.patch<Section>(`/sections/${sectionId}`, data);

  return response.data;
};

export const deleteSection = async (sectionId: number) => {
  await instance.delete(`/sections/${sectionId}`);
};
