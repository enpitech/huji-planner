export type Day = "Sun" | "Mon" | "Tue" | "Wed" | "Thu";

export interface Session {
  day: Day;
  start: string; // "HH:MM"
  end: string; // "HH:MM"
  kind: "lecture" | "tirgul";
}

export interface Course {
  id: string;
  name: string;
  credits: number;
  lecturer: string;
  sessions: Session[];
  examDate: string; // YYYY-MM-DD, moed A
}
