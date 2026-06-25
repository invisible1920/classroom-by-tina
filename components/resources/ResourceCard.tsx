import Link from "next/link";
import type { Resource } from "@/types/resource";

type ResourceCardProps = {
  resource: Resource;
};

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Link
      href={`/dashboard/resources/${resource.id}`}
      className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <p className="text-sm font-semibold text-blue-600">
        {resource.subject} · Week {resource.week}
      </p>

      <h2 className="mt-3 text-2xl font-bold text-slate-900">
        {resource.title}
      </h2>

      <p className="mt-3 text-slate-600">{resource.description}</p>

      <p className="mt-4 text-sm text-slate-500">
        {resource.category} · {resource.standard}
      </p>
    </Link>
  );
}