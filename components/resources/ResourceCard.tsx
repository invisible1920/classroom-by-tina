import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Star } from "lucide-react";

import type { Resource } from "@/types/resource";

type ResourceCardProps = {
  resource: Resource;
};

export default function ResourceCard({ resource }: ResourceCardProps) {
  const abilityGroup = resource.ability_group ?? "All";

  return (
    <Link
      href={`/dashboard/resources/${resource.id}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Thumbnail */}
      <div className="relative h-52 w-full bg-slate-100">
        {resource.thumbnail ? (
          <Image
            src={resource.thumbnail}
            alt={resource.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-blue-600">
            <FileText size={40} />
          </div>
        )}

        <div className="absolute right-4 top-4 flex flex-wrap justify-end gap-2">
          {resource.featured && (
            <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-sm font-semibold text-yellow-700 shadow">
              <Star size={14} />
              Featured
            </div>
          )}

          {abilityGroup !== "All" && (
            <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 shadow">
              {abilityGroup}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-sm font-semibold text-blue-600">
          {resource.subject} · {resource.month} · Week {resource.week}
        </p>

        <h2 className="mt-2 text-2xl font-bold text-slate-900">
          {resource.title}
        </h2>

        <p className="mt-3 line-clamp-3 text-slate-600">
          {resource.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            {resource.category}
            {resource.standard ? ` · ${resource.standard}` : ""}
          </p>
          <span className="flex shrink-0 items-center gap-1 font-semibold text-blue-600 transition-all group-hover:gap-2">
            Open <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}