import Link from "next/link";
import { ArrowRight, FileText, Star } from "lucide-react";
import type { Resource } from "@/types/resource";

type ResourceCardProps = {
  resource: Resource;
};

export default function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <Link
      href={`/dashboard/resources/${resource.id}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
          <FileText size={22} />
        </div>

        {resource.featured && (
          <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-sm font-semibold text-yellow-700">
            <Star size={14} />
            Featured
          </div>
        )}
      </div>

      <p className="mt-5 text-sm font-semibold text-blue-600">
        {resource.subject} · Week {resource.week}
      </p>

      <h2 className="mt-2 text-2xl font-bold text-slate-900">
        {resource.title}
      </h2>

      <p className="mt-3 text-slate-600">{resource.description}</p>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {resource.category} · {resource.standard}
        </p>

        <span className="flex items-center gap-1 font-semibold text-blue-600 group-hover:gap-2">
          Open <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}