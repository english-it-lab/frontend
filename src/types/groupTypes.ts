export type Group = {
  id: number;
  name: string;
  sectionId: number | null;
  status: string | null;
  memberCount: number | null;
};

export type GroupCreateData = {
  name: string;
  sectionId: number;
};

export type GroupUpdateData = {
  name: string;
  sectionId: number;
};
