import type { Course, Day } from "../types";
import { toMinutes } from "../lib/schedule";

const DAYS: Day[] = ["Sun", "Mon", "Tue", "Wed", "Thu"];
const START = 8 * 60;
const END = 18 * 60;
const PX_PER_MIN = 0.8;

export function WeekGrid({ selected }: { selected: Course[] }) {
  return (
    <div className="grid">
      {DAYS.map((day) => (
        <div key={day} className="day">
          <h3>{day}</h3>
          <div className="col" style={{ height: (END - START) * PX_PER_MIN }}>
            {selected.flatMap((c) =>
              c.sessions
                .filter((s) => s.day === day)
                .map((s, i) => (
                  <div
                    key={c.id + i}
                    className={"block " + s.kind}
                    style={{
                      top: (toMinutes(s.start) - START) * PX_PER_MIN,
                      height: (toMinutes(s.end) - toMinutes(s.start)) * PX_PER_MIN,
                    }}
                  >
                    <b>{c.name}</b>
                    <span>
                      {s.start}–{s.end} · {s.kind}
                    </span>
                  </div>
                )),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
