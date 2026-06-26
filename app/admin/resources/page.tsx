import Link from "next/link";
import { ArrowLeft, FilePlus2, Search } from "lucide-react";

import { getResources } from "@/services";
import Card from "@/components/ui/Card";
import type {
  AbilityGroup,
  Grade,
  ResourceCategory,
  Subject,
} from "@/types/resource";
import ResourceCard from "@/components/admin/resources/ResourceCard";

const grades = ["All Grades", "Kindergarten", "First Grade", "Second Grade"];

const subjects = ["All Subjects", "ELA", "Math", "Science", "Social Studies"];

const categories = [
  "All Categories",
  "Lesson Plan",
  "Centers",
  "Assessment",
  "Homework",
  "Parent Letter",
  "Slides",
  "Activity",
];

const abilityGroups = [
  "All Ability Groups",
  "All",
  "Low",
  "Medium",
  "High",
];

const sortOptions = [
  { label: "Recently Edited", value: "updatedAt:desc" },
  { label: "Oldest Edited", value: "updatedAt:asc" },
  { label: "Title A-Z", value: "title:asc" },
  { label: "Title Z-A", value: "title:desc" },
  { label: "Week Low-High", value: "week:asc" },
  { label: "Week High-Low", value: "week:desc" },
];

type AdminResourcesPageProps = {
  searchParams: Promise<{
    search?: string;
    grade?: string;
    subject?: string;
    category?: string;
    ability_group?: string;
    sort?: string;
    page?: string;
  }>;
};

export default async function AdminResourcesPage({
  searchParams,
}: AdminResourcesPageProps) {
  const params = await searchParams;

  const [sortBy = "updatedAt", sortOrder = "desc"] = (
    params.sort ?? "updatedAt:desc"
  ).split(":");

  const resources = await getResources({
    search: params.search,
    grade: normalizeOption(params.grade, "All Grades") as Grade | "All Grades",
    subject: normalizeOption(params.subject, "All Subjects") as
      | Subject
      | "All Subjects",
    category: normalizeOption(params.category, "All Categories") as
      | ResourceCategory
      | "All Categories",
    ability_group: normalizeOption(
      params.ability_group,
      "All Ability Groups"
    ) as AbilityGroup | "All Ability Groups",
    sortBy: sortBy as "title" | "grade" | "subject" | "week" | "updatedAt",
    sortOrder: sortOrder === "asc" ? "asc" : "desc",
    page: Number(params.page ?? 1),
    pageSize: 5,
  });

  const allResources = await getResources({ pageSize: 1 });

  const featuredResources = await getResources({
    featured: true,
    pageSize: 1,
  });

  const firstGradeResources = await getResources({
    grade: "First Grade",
    pageSize: 1,
  });

  return (
    <main className="min-h-screen bg-[#fff8f0] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 font-black text-[#3b82f6] transition hover:gap-3"
        >
          <ArrowLeft size={18} />
          Back to Admin
        </Link>

        <section className="mt-8 flex flex-col justify-between gap-6 rounded-[2rem] bg-[#1f2a44] p-8 text-white shadow-2xl shadow-slate-950/15 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-[#f5b942]">
              Resource Library
            </p>

            <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
              Manage teaching resources
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
              Search, filter, sort, preview, edit, duplicate, and prepare
              resources for publishing.
            </p>
          </div>

          <Link
            href="/admin/resources/new"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-black text-[#1f2a44] transition hover:-translate-y-0.5 hover:bg-[#f5b942]"
          >
            <FilePlus2 size={18} />
            Add Resource
          </Link>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <AdminResourceStat
            label="Total Resources"
            value={allResources.total}
          />
          <AdminResourceStat
            label="Featured"
            value={featuredResources.total}
          />
          <AdminResourceStat
            label="First Grade"
            value={firstGradeResources.total}
          />
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <form className="grid gap-4 lg:grid-cols-[1fr_165px_165px_165px_165px_165px]">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                name="search"
                defaultValue={params.search ?? ""}
                placeholder="Search by title, standard, subject..."
                className="admin-input pl-11"
              />
            </div>

            <FilterSelect name="grade" value={params.grade} options={grades} />

            <FilterSelect
              name="subject"
              value={params.subject}
              options={subjects}
            />

            <FilterSelect
              name="category"
              value={params.category}
              options={categories}
            />

            <FilterSelect
              name="ability_group"
              value={params.ability_group}
              options={abilityGroups}
            />

            <FilterSelect
              name="sort"
              value={params.sort}
              options={sortOptions}
            />

            <button
              type="submit"
              className="rounded-full bg-[#1f2a44] px-5 py-3 font-black text-white transition hover:-translate-y-0.5 lg:col-start-6"
            >
              Apply
            </button>
          </form>
        </section>

        <section className="mt-8 grid gap-6">
          {resources.items.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </section>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-[2rem] border border-slate-200 bg-white p-5 shadow-sm md:flex-row">
          <p className="font-black text-slate-600">
            Showing {resources.items.length} of {resources.total} resources
          </p>

          <div className="flex items-center gap-3">
            <PaginationLink
              disabled={resources.page <= 1}
              page={resources.page - 1}
              params={params}
            >
              Previous
            </PaginationLink>

            <span className="font-black text-[#1f2a44]">
              Page {resources.page} of {resources.totalPages}
            </span>

            <PaginationLink
              disabled={resources.page >= resources.totalPages}
              page={resources.page + 1}
              params={params}
            >
              Next
            </PaginationLink>
          </div>
        </div>
      </div>
    </main>
  );
}

function normalizeOption(value: string | undefined, fallback: string) {
  return value && value.length > 0 ? value : fallback;
}

function FilterSelect({
  name,
  value,
  options,
}: {
  name: string;
  value?: string;
  options: string[] | { label: string; value: string }[];
}) {
  return (
    <select name={name} defaultValue={value ?? ""} className="admin-input">
      {options.map((option) => {
        const label = typeof option === "string" ? option : option.label;
        const optionValue = typeof option === "string" ? option : option.value;

        return (
          <option key={optionValue} value={optionValue}>
            {label}
          </option>
        );
      })}
    </select>
  );
}

function PaginationLink({
  children,
  disabled,
  page,
  params,
}: {
  children: React.ReactNode;
  disabled: boolean;
  page: number;
  params: Record<string, string | undefined>;
}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value && key !== "page") {
      query.set(key, value);
    }
  });

  query.set("page", String(page));

  if (disabled) {
    return (
      <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-slate-400">
        {children}
      </span>
    );
  }

  return (
    <Link
      href={`/admin/resources?${query.toString()}`}
      className="rounded-full bg-[#1f2a44] px-4 py-2 text-sm font-black text-white transition hover:-translate-y-0.5"
    >
      {children}
    </Link>
  );
}

function AdminResourceStat({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <Card>
      <p className="text-sm font-black uppercase tracking-widest text-slate-400">
        {label}
      </p>

      <p className="mt-3 text-4xl font-black text-[#1f2a44]">{value}</p>
    </Card>
  );
}