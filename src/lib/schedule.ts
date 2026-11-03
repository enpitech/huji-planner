import type { Course, Session } from "../types";

export function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function sessionsOverlap(a: Session, b: Session): boolean {
  if (a.day !== b.day) return false;
  return toMinutes(a.start) <= toMinutes(b.end) && toMinutes(b.start) <= toMinutes(a.end);
}

export interface Clash {
  a: Course;
  b: Course;
  session: Session;
}

export function findClashes(courses: Course[]): Clash[] {
  const clashes: Clash[] = [];
  for (let i = 0; i < courses.length; i++) {
    for (let j = i + 1; j < courses.length; j++) {
      for (const s1 of courses[i].sessions) {
        for (const s2 of courses[j].sessions) {
          if (sessionsOverlap(s1, s2)) clashes.push({ a: courses[i], b: courses[j], session: s1 });
        }
      }
    }
  }
  return clashes;
}

export function totalCredits(courses: Course[]): number {
  return courses.reduce((sum, c) => sum + c.credits, 0);
}
