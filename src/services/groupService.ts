import instance from "@/api/axios.api";
import type {
  Group,
  GroupCreateData,
  GroupUpdateData,
} from "@/types/groupTypes";

type GroupApiResponse = {
  id: number;
  name: string;
  status: string | null;
  member_count: number | null;
  section_id: number | null;
};

const mapGroupFromApi = (group: GroupApiResponse): Group => ({
  id: group.id,
  name: group.name,
  status: group.status,
  memberCount: group.member_count,
  sectionId: group.section_id,
});

export const getGroups = async () => {
  const response = await instance.get<GroupApiResponse[]>("/groups/");

  return response.data.map(mapGroupFromApi);
};

export const createGroup = async (data: GroupCreateData) => {
  const response = await instance.post<GroupApiResponse>("/groups/", {
    name: data.name,
    section_id: data.sectionId,
  });

  return mapGroupFromApi(response.data);
};

export const updateGroup = async (groupId: number, data: GroupUpdateData) => {
  const response = await instance.put<GroupApiResponse>(`/groups/${groupId}`, {
    name: data.name,
    section_id: data.sectionId,
  });

  return mapGroupFromApi(response.data);
};

export const runGroupAction = async (
  groupId: number,
  action: "submit" | "approve" | "reject",
) => {
  await instance.post(`/groups/${groupId}/${action}`);
};

export const deleteGroup = async (groupId: number) => {
  await instance.delete(`/groups/${groupId}`);
};
