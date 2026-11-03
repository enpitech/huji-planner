import { useState } from "react";
import coursesData from "./data/courses.json";
import type { Course } from "./types";
import { CourseList } from "./components/CourseList";
import { WeekGrid } from "./components/WeekGrid";
import { Summary } from "./components/Summary";

const courses = coursesData as Course[];

export default function App() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const selected = courses.filter((c) => selectedIds.includes(c.id));

  const toggle = (id: string) =>
    setSelectedIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]));

  return (
    <div className="app">
      <header>
        <h1>HUJI Semester Planner</h1>
        <p>Computer Science · Semester A</p>
      </header>
      <main>
        <CourseList courses={courses} selectedIds={selectedIds} onToggle={toggle} />
        <section className="right">
          <Summary selected={selected} />
          <WeekGrid selected={selected} />
        </section>
      </main>
    </div>
  );
}
