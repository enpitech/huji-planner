import { describe, expect, it } from "vitest";
import { findClashes, sessionsOverlap, toMinutes, totalCredits } from "./schedule";
import type { Course } from "../types";

const course = (id: string, day: "Sun" | "Mon", start: string, end: string, credits = 3): Course => ({
  id, name: id, credits, lecturer: "", examDate: "2027-02-01",
  sessions: [{ day, start, end, kind: "lecture" }],
});

describe("schedule", () => {
  it("converts times to minutes", () => {
    expect(toMinutes("10:30")).toBe(630);
  });

  it("detects overlapping sessions", () => {
    expect(sessionsOverlap(course("a", "Sun", "10:00", "12:00").sessions[0], course("b", "Sun", "11:00", "13:00").sessions[0])).toBe(true);
  });

  it("ignores sessions on different days", () => {
    expect(sessionsOverlap(course("a", "Sun", "10:00", "12:00").sessions[0], course("b", "Mon", "10:00", "12:00").sessions[0])).toBe(false);
  });

  it("finds clashes between selected courses", () => {
    expect(findClashes([course("a", "Sun", "10:00", "12:00"), course("b", "Sun", "11:00", "13:00")])).toHaveLength(1);
  });

  it("sums credits", () => {
    expect(totalCredits([course("a", "Sun", "10:00", "12:00", 7), course("b", "Mon", "10:00", "12:00", 5)])).toBe(12);
  });
});
