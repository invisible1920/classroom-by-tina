import { revalidatePath } from "next/cache";
import { Trash2 } from "lucide-react";
import { archiveResource } from "@/services";

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
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose-50 px-3 py-2 text-xs font-black text-rose-600 transition hover:-translate-y-0.5 hover:bg-rose-100"
      >
        <Trash2 size={15} />
        <span className="hidden xl:inline">Archive</span>
      </button>
    </form>
  );
}