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
    <div className="group overflow-hidden rounded-[1.5rem] border border-[#ffe7b5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/5">
      <div className="relative h-32 w-full bg-[#fff3c4]">
        <Link
          href={`/dashboard/resources/${resource.id}`}
          className="block h-full"
        >
          {resource.thumbnail ? (
            <Image
              src={resource.thumbnail}
              alt={resource.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
              className="object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-[#35c6c9]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                <FileText size={30} />
              </div>
            </div>
          )}
        </Link>

        <div className="absolute left-3 top-3 z-10">
          <form action={toggleFavorite.bind(null, resource.id)}>
            <button
              type="submit"
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
              className={`flex h-9 w-9 items-center justify-center rounded-full shadow transition hover:scale-110 ${
                isFavorite
                  ? "bg-[#ff6f91] text-white"
                  : "bg-white text-slate-500 hover:text-[#ff6f91]"
              }`}
            >
              <Heart size={16} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </form>
        </div>

        <div className="absolute right-3 top-3 flex flex-wrap justify-end gap-2">
          {resource.featured && (
            <div className="flex items-center gap-1 rounded-full bg-[#fff3c4] px-2.5 py-1 text-xs font-black text-[#d48806] shadow-sm">
              <Star size={12} fill="currentColor" />
              Featured
            </div>
          )}

          {abilityGroup !== "All" && (
            <div className="rounded-full bg-[#7ac943]/15 px-2.5 py-1 text-xs font-black text-[#3f8f22] shadow-sm">
              {abilityGroup}
            </div>
          )}
        </div>
      </div>

      <div className="p-4">
        <p className="text-xs font-black uppercase tracking-wide text-[#35c6c9]">
          {resource.subject} · {resource.month} · Week {resource.week}
        </p>

        <Link href={`/dashboard/resources/${resource.id}`}>
          <h2 className="mt-2 line-clamp-1 text-lg font-black text-[#17223b] transition group-hover:text-[#35c6c9]">
            {resource.title}
          </h2>
        </Link>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
          {resource.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="line-clamp-1 text-xs font-semibold text-slate-500">
            {resource.category}
            {resource.standard ? ` · ${resource.standard}` : ""}
          </p>

          <Link
            href={`/dashboard/resources/${resource.id}`}
            className="flex shrink-0 items-center gap-1 rounded-full bg-[#35c6c9]/10 px-3 py-1.5 text-sm font-black text-[#35c6c9] transition-all hover:gap-2 hover:bg-[#35c6c9] hover:text-white"
          >
            Open <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}