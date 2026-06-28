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
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-32 w-full bg-slate-100">
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
              <FileText size={32} />
            </div>
          )}
        </Link>

        <div className="absolute left-3 top-3 z-10">
          <form action={toggleFavorite.bind(null, resource.id)}>
            <button
              type="submit"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              className={`flex h-8 w-8 items-center justify-center rounded-full shadow transition hover:scale-105 ${
                isFavorite
                  ? "bg-rose-500 text-white"
                  : "bg-white text-slate-500 hover:text-rose-500"
              }`}
            >
              <Heart size={15} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </form>
        </div>

        <div className="absolute right-3 top-3 flex flex-wrap justify-end gap-2">
          {resource.featured && (
            <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-1 text-xs font-bold text-yellow-700 shadow">
              <Star size={12} />
              Featured
            </div>
          )}

          {abilityGroup !== "All" && (
            <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 shadow">
              {abilityGroup}
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs font-bold text-blue-600">
          {resource.subject} · {resource.month} · Week {resource.week}
        </p>

        <Link href={`/dashboard/resources/${resource.id}`}>
          <h2 className="mt-1.5 line-clamp-1 text-lg font-black text-slate-900 transition group-hover:text-blue-600">
            {resource.title}
          </h2>
        </Link>

        <p className="mt-1.5 line-clamp-2 text-sm text-slate-600">
          {resource.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="line-clamp-1 text-xs text-slate-500">
            {resource.category}
            {resource.standard ? ` · ${resource.standard}` : ""}
          </p>

          <Link
            href={`/dashboard/resources/${resource.id}`}
            className="flex shrink-0 items-center gap-1 text-sm font-bold text-blue-600 transition-all hover:gap-2"
          >
            Open <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}