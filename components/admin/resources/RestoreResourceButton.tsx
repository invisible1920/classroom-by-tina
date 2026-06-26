import { revalidatePath } from "next/cache";
import { RotateCcw } from "lucide-react";
import { restoreResource } from "@/services";

async function restoreResourceAction(formData: FormData) {
  "use server";

  const id = String(formData.get("id") ?? "");

  if (!id) {
    throw new Error("Missing resource id.");
  }

  await restoreResource(id);

  revalidatePath("/admin/resources");
}

export default function RestoreResourceButton({ id }: { id: string }) {
  return (
    <form action={restoreResourceAction}>
      <input type="hidden" name="id" value={id} />

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700 transition hover:-translate-y-0.5 hover:bg-emerald-100"
      >
        <RotateCcw size={17} />
        <span className="hidden xl:inline">Restore</span>
      </button>
    </form>
  );
}