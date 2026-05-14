import { useEffect, useState } from "react";
import { Alert, CircularProgress, Stack, Typography } from "@mui/material";

import { mockEvents } from "@/constants/mockData.ts";
import EventsList from "@/containers/Widgets/EventsList/EventsList.tsx";
import { useAppDispatch, useAppSelector } from "@/hooks/redux_hooks.ts";
import type { IEvent } from "@/interfaces/eventInterface.ts";
import { getTopics } from "@/services/topicService.ts";
import { fetchSections } from "@/slices/sectionsSlice.ts";
import type { Section } from "@/types/sectionTypes.ts";
import type { Topic } from "@/types/topicTypes.ts";

import styles from "./EventsPage.module.scss";

const DEFAULT_REGISTRATION_FIELDS: IEvent["registrationFields"] = {
  faculties: ["Не указано"],
  courses: ["Не указано"],
  teachers: ["Не указано"],
  presentationSections: ["Общая секция"],
};

const formatEventDate = (value: string | null) => {
  if (!value) return "Дата уточняется";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Дата уточняется";

  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
};

const formatEventTime = (value: string | null) => {
  if (!value) return "Время уточняется";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const getSectionTopicNames = (section: Section, topics: Topic[]) => {
  const sectionTopics = topics
    .filter((topic) => topic.sectionId === section.id)
    .map((topic) => topic.name);

  return sectionTopics.length > 0 ? sectionTopics : [section.name];
};

const mapSectionToEvent = (section: Section, topics: Topic[]): IEvent => {
  const topicNames = getSectionTopicNames(section, topics);

  return {
    id: String(section.id),
    name: section.name,
    type: "conference",
    date: formatEventDate(section.time),
    time: formatEventTime(section.time),
    location: section.lecture_hall ?? "Место уточняется",
    description: "Описание мероприятия будет добавлено позже.",
    sections: topicNames,
    registrationFields: {
      ...DEFAULT_REGISTRATION_FIELDS,
      presentationSections: topicNames,
    },
  };
};

const EventsPage = () => {
  const dispatch = useAppDispatch();
  const {
    items: sections,
    isLoading: isSectionsLoading,
    error: sectionsError,
  } = useAppSelector((state) => state.sectionsReducer);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isTopicsLoading, setIsTopicsLoading] = useState(false);
  const [topicsError, setTopicsError] = useState<string | null>(null);

  useEffect(() => {
    void dispatch(fetchSections());
  }, [dispatch]);

  useEffect(() => {
    if (sections.length === 0) {
      setTopics([]);
      setIsTopicsLoading(false);
      setTopicsError(null);
      return;
    }

    let isCancelled = false;

    const loadTopics = async () => {
      setIsTopicsLoading(true);
      setTopicsError(null);

      try {
        const topicsBySection = await Promise.all(
          sections.map((section) => getTopics(section.id)),
        );

        if (isCancelled) return;

        setTopics(topicsBySection.flat());
      } catch (error) {
        if (isCancelled) return;

        const errorMessage =
          error instanceof Error
            ? error.message
            : "Не удалось загрузить топики мероприятия.";

        setTopics([]);
        setTopicsError(errorMessage);
      } finally {
        if (!isCancelled) {
          setIsTopicsLoading(false);
        }
      }
    };

    void loadTopics();

    return () => {
      isCancelled = true;
    };
  }, [sections]);

  const events = mockEvents;
  const isLoading = isSectionsLoading || isTopicsLoading;
  const error = sectionsError ?? topicsError;

  return (
    <div className={styles.pageContainer}>
      <Stack spacing={3}>
        <Typography variant="h4" component="h2">
          Мероприятия
        </Typography>

        {error ? <Alert severity="error">{error}</Alert> : null}

        {isLoading ? (
          <CircularProgress />
        ) : events.length > 0 ? (
          <EventsList events={events} />
        ) : (
          <Typography color="text.secondary">
            Мероприятия пока не добавлены.
          </Typography>
        )}
      </Stack>
    </div>
  );
};

export default EventsPage;
