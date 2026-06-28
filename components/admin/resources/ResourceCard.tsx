import Link from "next/link";
import { Edit3, FileText, Star } from "lucide-react";

import Card from "@/components/ui/Card";
import type { Resource } from "@/types/resource";
import ArchiveResourceButton from "@/components/admin/resources/ArchiveResourceButton";
import DuplicateResourceButton from "@/components/admin/resources/DuplicateResourceButton";
import RestoreResourceButton from "@/components/admin/resources/RestoreResourceButton";
import ResourcePreviewButton from "@/components/admin/resources/ResourcePreviewButton";

export default function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card
      className={`overflow-hidden p-0 ${
        resource.status === "archived"
          ? "border-rose-200 bg-rose-50/40 opacity-70"
          : ""
      }`}
    >
      <div className="grid gap-0 lg:grid-cols-[220px_1fr_200px]">
        <ResourceThumbnail resource={resource} />

        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2">
            <h2
              className={`line-clamp-1 text-lg font-black ${
                resource.status === "archived"
                  ? "text-slate-400 line-through"
                  : "text-[#1f2a44]"
              }`}
            >
              {resource.title}
            </h2>

            {resource.featured && (
              <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[#f5b942]/20 px-2.5 py-1 text-[11px] font-black text-[#92400e]">
                <Star size={12} />
                Featured
              </span>
            )}

            <StatusBadge status={resource.status} />
          </div>

          <p className="mt-1.5 text-sm font-semibold text-slate-500">
            {resource.grade} · {resource.subject} · {resource.month} · Week{" "}
            {resource.week}
          </p>

          <p className="mt-3 line-clamp-2 max-w-3xl text-sm leading-6 text-slate-600">
            {resource.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <MetaBadge>{resource.category}</MetaBadge>
            <MetaBadge>{resource.standard || "No standard"}</MetaBadge>
            <MetaBadge>{resource.pdf ? "PDF attached" : "No PDF"}</MetaBadge>
            <MetaBadge>
              {resource.thumbnail ? "Thumbnail ready" : "No thumbnail"}
            </MetaBadge>
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2 border-t border-slate-100 p-5 lg:border-l lg:border-t-0">
          <ResourcePreviewButton resource={resource} />

          <Link
            href={`/admin/resources/${resource.id}/edit`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-[#1f2a44] transition hover:-translate-y-0.5 hover:bg-[#3b82f6]/10 hover:text-[#3b82f6]"
          >
            <Edit3 size={16} />
            Edit
          </Link>

          <DuplicateResourceButton id={resource.id} />

          {resource.status === "archived" ? (
            <RestoreResourceButton id={resource.id} />
          ) : (
            <ArchiveResourceButton id={resource.id} />
          )}
        </div>
      </div>
    </Card>
  );
}

function ResourceThumbnail({ resource }: { resource: Resource }) {
  return (
    <div className="h-36 bg-slate-100 lg:h-full">
      {resource.thumbnail ? (
        <img
          src={resource.thumbnail}
          alt={resource.title}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[#3b82f6]">
          <FileText size={30} />
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: Resource["status"] }) {
  if (status === "archived") {
    return (
      <span className="inline-flex w-fit rounded-full bg-rose-100 px-2.5 py-1 text-[11px] font-black uppercase text-rose-700">
        Archived
      </span>
    );
  }

  if (status === "published") {
    return (
      <span className="inline-flex w-fit rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-black uppercase text-emerald-700">
        Published
      </span>
    );
  }

  return (
    <span className="inline-flex w-fit rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-black uppercase text-slate-600">
      Draft
    </span>
  );
}

function MetaBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-black capitalize text-slate-600">
      {children}
    </span>
  );
}