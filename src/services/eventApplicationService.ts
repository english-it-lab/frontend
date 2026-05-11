import axios from "axios";

import type { EventApplicationData } from "@/types/eventApplicationTypes";

// TODO: бэкенд-ручка для подачи заявок на мероприятие ещё не реализована.
// Когда эндпоинт появится — заменить заглушку на реальный вызов через
// `instance.post(`/events/${eventId}/applications`, data)` (см. sectionService.ts).
export const submitEventApplication = async (
  eventId: string,
  data: EventApplicationData,
): Promise<void> => {
  console.info("Заявка на мероприятие (заглушка):", { eventId, data });

  await new Promise<void>((resolve) => setTimeout(resolve, 800));
};

export const getEventApplicationErrorMessage = (error: unknown): string => {
  if (!axios.isAxiosError(error)) {
    return "Не удалось отправить заявку. Попробуйте позже.";
  }

  const detail = error.response?.data?.detail;

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail) && detail.length > 0) {
    return "Проверьте корректность заполнения формы.";
  }

  return "Сервер недоступен. Попробуйте отправить заявку позже.";
};
