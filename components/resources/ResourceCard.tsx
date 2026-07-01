import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  CalendarDays,
  FileText,
  GraduationCap,
  Heart,
  Star,
} from "lucide-react";

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
  const category = resource.category || "Resource";

  return (
    <div className="group overflow-hidden rounded-[1.6rem] border border-[#ffe7b5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/5">
      <div className="relative h-36 w-full overflow-hidden bg-[#fff3c4]">
       <Link
  href={`/dashboard/resources/${resource.id}`}
  className="relative block h-full"
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
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-[#fff3c4] to-[#e8fbfb]">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#35c6c9] shadow-sm">
                <FileText size={32} />
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

        {resource.featured && (
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-[#fff3c4] px-2.5 py-1 text-xs font-black text-[#d48806] shadow-sm">
            <Star size={12} fill="currentColor" />
            Featured
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#35c6c9]/10 px-3 py-1 text-xs font-black text-[#35c6c9]">
          <FileText size={13} />
          {category}
        </div>

        <Link href={`/dashboard/resources/${resource.id}`}>
          <h2 className="mt-3 line-clamp-2 min-h-[3.25rem] text-xl font-black leading-tight text-[#17223b] transition group-hover:text-[#35c6c9]">
            {resource.title}
          </h2>
        </Link>

        <div className="mt-4 grid gap-2 text-xs font-black text-slate-600">
          <div className="flex items-center gap-2 rounded-xl bg-[#fffaf3] px-3 py-2">
            <GraduationCap size={14} className="text-[#a66dd4]" />
            <span>{resource.grade}</span>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-[#fffaf3] px-3 py-2">
            <CalendarDays size={14} className="text-[#ff8a3d]" />
            <span>
              {resource.month} · Week {resource.week}
            </span>
          </div>

          {abilityGroup !== "All" && (
            <div className="flex items-center gap-2 rounded-xl bg-[#fffaf3] px-3 py-2">
              <Brain size={14} className="text-[#7ac943]" />
              <span>{abilityGroup} Group</span>
            </div>
          )}
        </div>

        {resource.standard && (
          <p className="mt-3 line-clamp-1 text-xs font-semibold text-slate-400">
            Standard: {resource.standard}
          </p>
        )}

        <Link
          href={`/dashboard/resources/${resource.id}`}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#35c6c9] px-4 py-3 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2fb4b7]"
        >
          Preview Resource
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}