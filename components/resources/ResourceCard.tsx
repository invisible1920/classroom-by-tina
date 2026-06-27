import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Heart, Star } from "lucide-react";

import type { Resource } from "@/types/resource";
import { toggleFavorite } from "@/app/dashboard/favorites/actions";

type ResourceCardProps = {
  resource: Resource;
  isFavorite?: boolean;
};

export default function ResourceCard({
  resource,
  isFavorite = false,
}: ResourceCardProps) {
  const abilityGroup = resource.ability_group ?? "All";

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-52 w-full bg-slate-100">
        <Link href={`/dashboard/resources/${resource.id}`} className="block h-full">
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
        </Link>

        <div className="absolute left-4 top-4 z-10">
          <form action={toggleFavorite.bind(null, resource.id)}>
  <button
    type="submit"
    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    className={`flex h-10 w-10 items-center justify-center rounded-full shadow transition hover:scale-105 ${
      isFavorite
        ? "bg-rose-500 text-white"
        : "bg-white text-slate-500 hover:text-rose-500"
    }`}
  >
    <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
  </button>
</form>
        </div>

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

      <div className="p-6">
        <p className="text-sm font-semibold text-blue-600">
          {resource.subject} · {resource.month} · Week {resource.week}
        </p>

        <Link href={`/dashboard/resources/${resource.id}`}>
          <h2 className="mt-2 text-2xl font-bold text-slate-900 transition group-hover:text-blue-600">
            {resource.title}
          </h2>
        </Link>

        <p className="mt-3 line-clamp-3 text-slate-600">
          {resource.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            {resource.category}
            {resource.standard ? ` · ${resource.standard}` : ""}
          </p>

          <Link
            href={`/dashboard/resources/${resource.id}`}
            className="flex shrink-0 items-center gap-1 font-semibold text-blue-600 transition-all hover:gap-2"
          >
            Open <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}