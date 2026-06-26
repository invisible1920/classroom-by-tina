import { revalidatePath } from "next/cache";
import { Copy } from "lucide-react";
import { duplicateResource } from "@/services";

async function duplicateResourceAction(formData: FormData) {
  "use server";

  const id = String(formData.get("id") ?? "");

  if (!id) {
    throw new Error("Missing resource id.");
  }

  await duplicateResource(id);

  revalidatePath("/admin/resources");
}

export default function DuplicateResourceButton({ id }: { id: string }) {
  return (
    <form action={duplicateResourceAction}>
      <input type="hidden" name="id" value={id} />

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-black text-[#1f2a44] transition hover:-translate-y-0.5 hover:bg-[#3b82f6]/10 hover:text-[#3b82f6]"
      >
        <Copy size={17} />
        <span className="hidden xl:inline">Duplicate</span>
      </button>
    </form>
  );
}