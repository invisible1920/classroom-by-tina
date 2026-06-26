import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Edit3,
  Eye,
  FilePlus2,
  FileText,
  Search,
  Star,
} from "lucide-react";

import Card from "@/components/ui/Card";
import ArchiveResourceButton from "@/components/admin/resources/ArchiveResourceButton";
import { getResources } from "@/services";
import type { Grade, ResourceCategory, Subject } from "@/types/resource";

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
    sortBy: sortBy as "title" | "grade" | "subject" | "week" | "updatedAt",
    sortOrder: sortOrder === "asc" ? "asc" : "desc",
    page: Number(params.page ?? 1),
    pageSize: 5,
  });

  const allResources = await getResources({ pageSize: 1 });
  const featuredResources = await getResources({ featured: true, pageSize: 1 });
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
          <AdminResourceStat label="Total Resources" value={allResources.total} />
          <AdminResourceStat label="Featured" value={featuredResources.total} />
          <AdminResourceStat label="First Grade" value={firstGradeResources.total} />
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <form className="grid gap-4 lg:grid-cols-[1fr_180px_180px_180px_180px]">
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
            <FilterSelect name="subject" value={params.subject} options={subjects} />
            <FilterSelect
              name="category"
              value={params.category}
              options={categories}
            />
            <FilterSelect name="sort" value={params.sort} options={sortOptions} />

            <button
              type="submit"
              className="rounded-full bg-[#1f2a44] px-5 py-3 font-black text-white transition hover:-translate-y-0.5 lg:col-start-5"
            >
              Apply
            </button>
          </form>
        </section>

        <section className="mt-8 grid gap-5">
          {resources.items.map((resource) => (
            <Card
  key={resource.id}
  className={`p-0 ${
    resource.status === "archived"
      ? "border-rose-200 bg-rose-50/40 opacity-70"
      : ""
  }`}
>
              <div className="grid gap-0 lg:grid-cols-[1fr_auto]">
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3b82f6]/10 text-[#3b82f6]">
                      <FileText size={22} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2
  className={`text-xl font-black ${
    resource.status === "archived"
      ? "text-slate-400 line-through"
      : "text-[#1f2a44]"
  }`}
>
  {resource.title}
</h2>

                        {resource.featured && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#f5b942]/20 px-3 py-1 text-xs font-black text-[#92400e]">
                            <Star size={13} />
                            Featured
                          </span>
                        )}
                      </div>

                      <p className="mt-1 font-semibold text-slate-500">
                        {resource.grade} · {resource.subject} · Week {resource.week}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 max-w-3xl leading-7 text-slate-600">
                    {resource.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <MetaBadge>{resource.category}</MetaBadge>
                    <MetaBadge>{resource.standard}</MetaBadge>
                    {resource.status === "archived" ? (
  <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-black uppercase text-rose-700">
    Archived
  </span>
) : (
  <MetaBadge>{resource.status}</MetaBadge>
)}
                    <MetaBadge>{resource.pdf ? "PDF attached" : "No PDF"}</MetaBadge>
                    <MetaBadge>
                      {resource.thumbnail ? "Thumbnail ready" : "No thumbnail"}
                    </MetaBadge>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-slate-100 p-6 lg:border-l lg:border-t-0">
                  <Link
                    href={`/dashboard/resources/${resource.id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-[#1f2a44] transition hover:-translate-y-0.5 hover:bg-[#3b82f6]/10 hover:text-[#3b82f6]"
                  >
                    <Eye size={17} />
                    <span className="hidden xl:inline">Preview</span>
                  </Link>
                  <Link
                    href={`/admin/resources/${resource.id}/edit`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-[#1f2a44] transition hover:-translate-y-0.5 hover:bg-[#3b82f6]/10 hover:text-[#3b82f6]"
                  >
                    <Edit3 size={17} />
                    <span className="hidden xl:inline">Edit</span>
                  </Link>
                  <ActionButton icon={<Copy size={17} />} label="Duplicate" />
                  <ArchiveResourceButton id={resource.id} />
                </div>
              </div>
            </Card>
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

function MetaBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black capitalize text-slate-600">
      {children}
    </span>
  );
}

function ActionButton({
  icon,
  label,
  destructive = false,
}: {
  icon: React.ReactNode;
  label: string;
  destructive?: boolean;
}) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-black transition hover:-translate-y-0.5 ${
        destructive
          ? "bg-rose-50 text-rose-600 hover:bg-rose-100"
          : "bg-slate-100 text-[#1f2a44] hover:bg-[#3b82f6]/10 hover:text-[#3b82f6]"
      }`}
    >
      {icon}
      <span className="hidden xl:inline">{label}</span>
    </button>
  );
}
