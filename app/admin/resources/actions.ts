"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/require-admin";
import { permanentlyDeleteResource } from "@/services";

export async function permanentlyDeleteResourceAction(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");

  if (!id) {
    throw new Error("Missing resource id.");
  }

  await permanentlyDeleteResource(id);

  revalidatePath("/admin/resources");
  revalidatePath("/admin");
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/kindergarten");
  revalidatePath("/dashboard/first-grade");
  revalidatePath("/dashboard/second-grade");
}