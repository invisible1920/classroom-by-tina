"use client";

import { Trash2 } from "lucide-react";

import { permanentlyDeleteResourceAction } from "@/app/admin/resources/actions";

export default function DeleteResourceButton({ id }: { id: string }) {
  return (
    <form
      action={permanentlyDeleteResourceAction}
      onSubmit={(event) => {
        const confirmed = window.confirm(
          "Permanently delete this resource and its files? This cannot be undone."
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose-600 px-3 py-2 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-rose-700"
      >
        <Trash2 size={15} />
        <span>Delete</span>
      </button>
    </form>
  );
}