import { useState } from "react";
import type { Course } from "../types";

interface Props {
  courses: Course[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export function CourseList({ courses, selectedIds, onToggle }: Props) {
  const [query, setQuery] = useState("");
  const visible = courses.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="course-list">
      <input placeholder="Search courses…" value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {visible.map((c) => {
          const isSelected = selectedIds.includes(c.id);
          return (
            <li key={c.id} className={isSelected ? "selected" : ""}>
              <div>
                <strong>{c.name}</strong>
                <span>
                  {c.id} · {c.credits} credits · {c.lecturer}
                </span>
              </div>
              <button onClick={() => onToggle(c.id)}>{isSelected ? "Remove" : "Add"}</button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
