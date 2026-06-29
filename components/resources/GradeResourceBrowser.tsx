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
      <a
        href="/dashboard"
        className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-black text-[#35c6c9] shadow-sm transition hover:bg-[#e8fbfb]"
      >
        ← Back to Dashboard
      </a>

      <section className="mt-8 overflow-hidden rounded-[2rem] border border-[#ffe7b5] bg-white p-8 shadow-sm">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-[#ff8a3d]">
              CMS Teaching Library 🍎
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight text-[#17223b]">
              {grade}
            </h1>

            <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">
              Browse Charlotte-Mecklenburg resources by subject, week, standard,
              skill, and ability group.
            </p>

            {!isAdmin && (
              <p className="mt-2 text-sm font-bold text-slate-500">
                Currently showing: {activeMonths || "current month"}
              </p>
            )}
          </div>

          <div className="rounded-full bg-[#35c6c9]/10 px-5 py-3 font-black text-[#35c6c9]">
            {filteredResources.length} resources
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-[#ffe7b5] bg-white p-5 shadow-sm">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by skill, title, standard, or ability group..."
          className="w-full rounded-2xl border border-[#ffe7b5] bg-[#fffaf3] px-4 py-3 font-semibold text-[#17223b] outline-none transition placeholder:text-slate-400 focus:border-[#35c6c9] focus:bg-white"
        />

        <FilterGroup
          title="Subject"
          items={subjects}
          selected={selectedSubject}
          onSelect={setSelectedSubject}
          activeClass="bg-[#35c6c9] text-white border-[#35c6c9]"
        />

        {isAdmin && (
          <FilterGroup
            title="Month"
            items={months}
            selected={selectedMonth}
            onSelect={setSelectedMonth}
            activeClass="bg-[#ff8a3d] text-white border-[#ff8a3d]"
            formatLabel={(month) => (month === "All" ? "All Months" : String(month))}
          />
        )}

        <FilterGroup
          title="Week"
          items={weeks}
          selected={selectedWeek}
          onSelect={setSelectedWeek}
          activeClass="bg-[#f7b928] text-[#17223b] border-[#f7b928]"
          formatLabel={(week) => (week === "All" ? "All Weeks" : `Week ${week}`)}
        />

        <FilterGroup
          title="Ability Group"
          items={abilityGroups}
          selected={selectedAbilityGroup}
          onSelect={setSelectedAbilityGroup}
          activeClass="bg-[#7ac943] text-white border-[#7ac943]"
          formatLabel={(group) => (group === "All" ? "All Groups" : String(group))}
        />
      </section>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {filteredResources.length > 0 ? (
          filteredResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              isFavorite={favoriteSet.has(String(resource.id))}
            />
          ))
        ) : (
          <div className="col-span-full rounded-[2rem] border border-dashed border-[#ffe7b5] bg-white p-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff3c4] text-2xl">
              🔎
            </div>

            <h2 className="mt-5 text-2xl font-black text-[#17223b]">
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

function FilterGroup<T extends string | number>({
  title,
  items,
  selected,
  onSelect,
  activeClass,
  formatLabel,
}: {
  title: string;
  items: T[];
  selected: T;
  onSelect: (value: T) => void;
  activeClass: string;
  formatLabel?: (value: T) => string;
}) {
  return (
    <div className="mt-5">
      <p className="mb-3 font-black text-[#17223b]">{title}</p>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isActive = selected === item;

          return (
            <button
              key={item}
              type="button"
              onClick={() => onSelect(item)}
              className={`rounded-full border px-4 py-2 text-sm font-black transition hover:-translate-y-0.5 ${
                isActive
                  ? activeClass
                  : "border-[#ffe7b5] bg-white text-slate-600 hover:bg-[#fff3c4] hover:text-[#17223b]"
              }`}
            >
              {formatLabel ? formatLabel(item) : item}
            </button>
          );
        })}
      </div>
    </div>
  );
}