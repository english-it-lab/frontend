export type Jury = {
  id: number;
  university_id: number | null;
  person_id: number | null;
  is_chairman: boolean;
  access_key: number | null;
};

export type JuryCreateData = {
  university_id?: number | null;
  person_id?: number | null;
  is_chairman?: boolean;
  access_key?: number | null;
};

export type JuryUpdateData = {
  university_id?: number | null;
  person_id?: number | null;
  is_chairman?: boolean | null;
  access_key?: number | null;
};
