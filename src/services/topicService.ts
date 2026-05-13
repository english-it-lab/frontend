import instance from "@/api/axios.api";
import type { Topic, TopicCreateData, TopicUpdateData } from "@/types/topicTypes";

type TopicApiResponse = {
  id: number;
  name: string;
  section_id: number | null;
};

const mapTopicFromApi = (topic: TopicApiResponse): Topic => ({
  id: topic.id,
  name: topic.name,
  sectionId: topic.section_id,
});

export const getTopics = async (sectionId?: number | null) => {
  const response = await instance.get<TopicApiResponse | TopicApiResponse[]>(
    sectionId === null || sectionId === undefined
      ? "/topics/"
      : `/topics?sectionId=${sectionId}`,
  );

  return Array.isArray(response.data)
    ? response.data.map(mapTopicFromApi)
    : [mapTopicFromApi(response.data)];
};

export const createTopic = async (data: TopicCreateData) => {
  const response = await instance.post<TopicApiResponse>(
    "/topics/",
    { name: data.name },
    {
      params: {
        sectionId: data.sectionId,
      },
    },
  );

  return mapTopicFromApi(response.data);
};

export const updateTopic = async (topicId: number, data: TopicUpdateData) => {
  const response = await instance.put<TopicApiResponse>(
    `/topics/${topicId}`,
    { name: data.name },
    {
      params: {
        sectionId: data.sectionId,
      },
    },
  );

  return mapTopicFromApi(response.data);
};

export const deleteTopic = async (topicId: number) => {
  await instance.delete(`/topics/${topicId}`);
};
