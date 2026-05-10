export type Section = {
  id: number;
  name: string;
  lecture_hall: string | null;
  time: string | null;
};

export type SectionCreateData = {
  name: string;
  lecture_hall?: string | null;
  time?: string | null;
  event_id?: number | null;
};

export type SectionUpdateData = {
  name: string;
  lecture_hall?: string | null;
  time?: string | null;
  organizer_id?: number | null;
};
