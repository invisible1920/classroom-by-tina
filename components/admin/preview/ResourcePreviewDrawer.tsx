"use client";

import { useEffect, useState } from "react";
import { Download, Pencil, X } from "lucide-react";
import Link from "next/link";
import { createPortal } from "react-dom";
import type { Resource } from "@/types/resource";

type Props = {
  resource: Resource | null;
  open: boolean;
  onClose: () => void;
};

export default function ResourcePreviewDrawer({
  resource,
  open,
  onClose,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!resource || !mounted) {
    return null;
  }

  return createPortal(
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[9998] bg-black/40 transition-opacity duration-200 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-[9999] h-screen w-full max-w-[520px] overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-2xl font-black text-[#1f2a44]">
            {resource.title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        {resource.thumbnail ? (
          <img
            src={resource.thumbnail}
            className="h-60 w-full object-cover"
            alt={resource.title}
          />
        ) : (
          <div className="flex h-60 items-center justify-center bg-slate-100 font-black text-slate-400">
            No thumbnail
          </div>
        )}

        <div className="space-y-6 p-6">
          <div>
            <h3 className="font-black text-[#1f2a44]">Description</h3>
            <p className="mt-2 leading-7 text-slate-600">
              {resource.description || "No description yet."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
  <Stat title="Grade" value={resource.grade} />
  <Stat title="Subject" value={resource.subject} />
  <Stat title="Month" value={resource.month} />
  <Stat title="Week" value={`Week ${resource.week}`} />
  <Stat title="Category" value={resource.category} />
  <Stat title="Ability" value={resource.ability_group ?? "All"} />
</div>

          {resource.pdf && (
            <a
              href={resource.pdf}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#3b82f6] py-3 font-black text-white transition hover:-translate-y-0.5"
            >
              <Download size={18} />
              View PDF
            </a>
          )}

          <Link
            href={`/admin/resources/${resource.id}/edit`}
            className="flex items-center justify-center gap-2 rounded-full border border-slate-200 py-3 font-black text-[#1f2a44] transition hover:bg-slate-50"
          >
            <Pencil size={18} />
            Edit Resource
          </Link>
        </div>
      </aside>
    </>,
    document.body
  );
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-100 p-4">
      <div className="text-xs font-black uppercase tracking-widest text-slate-400">
        {title}
      </div>
      <div className="mt-1 font-black text-[#1f2a44]">{value}</div>
    </div>
  );
}