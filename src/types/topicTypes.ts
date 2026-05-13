export type Topic = {
  id: number;
  name: string;
  sectionId: number | null;
};

export type TopicCreateData = {
  sectionId: number;
  name: string;
};

export type TopicUpdateData = {
  sectionId: number;
  name: string;
};
