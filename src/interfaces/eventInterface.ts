export interface IEvent {
  id: string;
  name: string;
  type: "conference" | "seminar" | "roundTable";
  date: string;
  time: string;
  location: string;
  description: string;
  sections: string[];

  registrationFields: {
    faculties: string[];
    courses: string[];
    teachers: string[];
    presentationSections: string[];
    englishLevels?: string[];
    needsTranslator?: boolean;
    hasTranslatorEducation?: boolean;
  };
}
