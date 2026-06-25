"use client";

import { useMemo, useState } from "react";
import { resources } from "@/lib/resources";
import ResourceCard from "@/components/resources/ResourceCard";

const subjects = ["All", "ELA", "Math", "Science", "Social Studies"];
const weeks = ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function FirstGradePage() {
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedWeek, setSelectedWeek] = useState<string | number>("All");
  const [search, setSearch] = useState("");

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesGrade = resource.grade === "First Grade";
      const matchesSubject =
        selectedSubject === "All" || resource.subject === selectedSubject;
      const matchesWeek = selectedWeek === "All" || resource.week === selectedWeek;
      const matchesSearch =
        resource.title.toLowerCase().includes(search.toLowerCase()) ||
        resource.description.toLowerCase().includes(search.toLowerCase()) ||
        resource.standard.toLowerCase().includes(search.toLowerCase());

      return matchesGrade && matchesSubject && matchesWeek && matchesSearch;
    });
  }, [selectedSubject, selectedWeek, search]);

  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <a href="/dashboard" className="text-blue-600 hover:underline">
        ← Back to Dashboard
      </a>

      <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">First Grade</h1>
          <p className="mt-3 text-lg text-slate-600">
            Browse resources by subject, week, standard, and skill.
          </p>
        </div>

        <div className="rounded-xl bg-white px-4 py-3 font-semibold text-slate-700 shadow-sm">
          {filteredResources.length} resources
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by skill, title, or standard..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        <div className="mt-6">
          <p className="mb-3 font-semibold text-slate-900">Subject</p>
          <div className="flex flex-wrap gap-3">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`rounded-full px-5 py-2 font-medium ${
                  selectedSubject === subject
                    ? "bg-blue-600 text-white"
                    : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="mb-3 font-semibold text-slate-900">Week</p>
          <div className="flex flex-wrap gap-3">
            {weeks.map((week) => (
              <button
                key={week}
                onClick={() => setSelectedWeek(week)}
                className={`rounded-full px-5 py-2 font-medium ${
                  selectedWeek === week
                    ? "bg-slate-900 text-white"
                    : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {week === "All" ? "All Weeks" : `Week ${week}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              No resources found
            </h2>
            <p className="mt-3 text-slate-600">
              Try changing the subject, week, or search term.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}