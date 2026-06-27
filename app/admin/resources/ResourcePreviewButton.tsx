"use client";

import { Eye } from "lucide-react";
import type { Resource } from "@/types/resource";
import ResourcePreviewDrawer from "@/components/admin/preview/ResourcePreviewDrawer";
import { useState } from "react";

export default function ResourcePreviewButton({
  resource,
}: {
  resource: Resource;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-[#1f2a44] transition hover:-translate-y-0.5 hover:bg-[#3b82f6]/10 hover:text-[#3b82f6]"
      >
        <Eye size={17} />
        Preview
      </button>

      <ResourcePreviewDrawer
        resource={resource}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}