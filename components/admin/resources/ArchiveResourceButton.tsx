import { revalidatePath } from "next/cache";
import { Trash2 } from "lucide-react";
import { archiveResource } from "@/services";
import { requireAdmin } from "@/lib/require-admin";

async function archiveResourceAction(formData: FormData) {
  "use server";
  archiveResourceAction

  const id = String(formData.get("id") ?? "");

  if (!id) {
    throw new Error("Missing resource id.");
  }

  await archiveResource(id);

  revalidatePath("/admin/resources");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/kindergarten");
  revalidatePath("/dashboard/first-grade");
  revalidatePath("/dashboard/second-grade");
}

export default function ArchiveResourceButton({ id }: { id: string }) {
  return (
    <form action={archiveResourceAction}>
      <input type="hidden" name="id" value={id} />

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-sm font-black text-rose-600 transition hover:-translate-y-0.5 hover:bg-rose-100"
      >
        <Trash2 size={17} />
        <span className="hidden xl:inline">Archive</span>
      </button>
    </form>
  );
}