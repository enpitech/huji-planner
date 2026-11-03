import type { Course } from "../types";
import { findClashes, totalCredits } from "../lib/schedule";

export function Summary({ selected }: { selected: Course[] }) {
  const clashes = findClashes(selected);

  return (
    <div className="summary">
      <div className="stat">
        <b>{selected.length}</b> courses
      </div>
      <div className="stat">
        <b>{totalCredits(selected)}</b> credits
      </div>
      {clashes.map((c, i) => (
        <div key={i} className="clash">
          ⚠ {c.a.name} clashes with {c.b.name} on {c.session.day}
        </div>
      ))}
    </div>
  );
}
