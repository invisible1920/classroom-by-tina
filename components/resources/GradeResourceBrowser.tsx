"use client";

import { useMemo, useState } from "react";

import ResourceCard from "@/components/resources/ResourceCard";
import type { Grade, Resource } from "@/types/resource";

const subjects = ["All", "ELA", "Math", "Science", "Social Studies"];

const months = [
  "All",
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
];

const weeks = ["All", 1, 2, 3, 4];
const abilityGroups = ["All", "Low", "Medium", "High"];

type GradeResourceBrowserProps = {
  grade: Grade;
  resources: Resource[];
  favoriteResourceIds?: string[];
  isAdmin?: boolean;
};

export default function GradeResourceBrowser({
  grade,
  resources,
  favoriteResourceIds = [],
  isAdmin = false,
}: GradeResourceBrowserProps) {
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedWeek, setSelectedWeek] = useState<string | number>("All");
  const [selectedAbilityGroup, setSelectedAbilityGroup] = useState("All");
  const [search, setSearch] = useState("");

  const favoriteSet = useMemo(
    () => new Set(favoriteResourceIds.map(String)),
    [favoriteResourceIds]
  );

  const activeMonths = Array.from(new Set(resources.map((r) => r.month))).join(
    ", "
  );

  const filteredResources = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return resources.filter((resource) => {
      const matchesSubject =
        selectedSubject === "All" || resource.subject === selectedSubject;

      const matchesMonth =
        !isAdmin || selectedMonth === "All" || resource.month === selectedMonth;

      const matchesWeek =
        selectedWeek === "All" || resource.week === selectedWeek;

      const matchesAbilityGroup =
        selectedAbilityGroup === "All" ||
        resource.ability_group === selectedAbilityGroup;

      const matchesSearch =
        normalizedSearch.length === 0 ||
        [
          resource.title,
          resource.description,
          resource.standard,
          resource.subject,
          resource.month,
          resource.category,
          resource.ability_group,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      return (
        matchesSubject &&
        matchesMonth &&
        matchesWeek &&
        matchesAbilityGroup &&
        matchesSearch
      );
    });
  }, [
    resources,
    selectedSubject,
    selectedMonth,
    selectedWeek,
    selectedAbilityGroup,
    search,
    isAdmin,
  ]);

  return (
    <main>
      <a href="/dashboard" className="text-blue-600 hover:underline">
        ← Back to Dashboard
      </a>

      <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h1 className="text-4xl font-bold text-slate-900">{grade}</h1>

          <p className="mt-3 text-lg text-slate-600">
            Browse resources by subject, week, standard, skill, and ability
            group.
          </p>

          {!isAdmin && (
            <p className="mt-2 text-sm font-semibold text-slate-500">
              Currently showing: {activeMonths || "current month"}
            </p>
          )}
        </div>

        <div className="rounded-xl bg-white px-4 py-3 font-semibold text-slate-700 shadow-sm">
          {filteredResources.length} resources
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by skill, title, standard, or ability group..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        <div className="mt-6">
          <p className="mb-3 font-semibold text-slate-900">Subject</p>

          <div className="flex flex-wrap gap-3">
            {subjects.map((subject) => (
              <button
                key={subject}
                type="button"
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

        {isAdmin && (
          <div className="mt-6">
            <p className="mb-3 font-semibold text-slate-900">Month</p>

            <div className="flex flex-wrap gap-3">
              {months.map((month) => (
                <button
                  key={month}
                  type="button"
                  onClick={() => setSelectedMonth(month)}
                  className={`rounded-full px-5 py-2 font-medium ${
                    selectedMonth === month
                      ? "bg-[#1f2a44] text-white"
                      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {month === "All" ? "All Months" : month}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <p className="mb-3 font-semibold text-slate-900">Week</p>

          <div className="flex flex-wrap gap-3">
            {weeks.map((week) => (
              <button
                key={week}
                type="button"
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

        <div className="mt-6">
          <p className="mb-3 font-semibold text-slate-900">Ability Group</p>

          <div className="flex flex-wrap gap-3">
            {abilityGroups.map((group) => (
              <button
                key={group}
                type="button"
                onClick={() => setSelectedAbilityGroup(group)}
                className={`rounded-full px-5 py-2 font-medium ${
                  selectedAbilityGroup === group
                    ? "bg-emerald-600 text-white"
                    : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
                }`}
              >
                {group === "All" ? "All Groups" : group}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              isFavorite={favoriteSet.has(String(resource.id))}
            />
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              No resources found
            </h2>
            <p className="mt-3 text-slate-600">
              Try changing the subject, week, ability group, or search term.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}