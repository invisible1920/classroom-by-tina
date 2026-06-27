"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import type { TeacherRole, TeacherSubscription } from "@/types/teacher";

export async function updateTeacherRole(formData: FormData) {
  const teacherId = String(formData.get("teacherId") ?? "");
  const role = String(formData.get("role") ?? "") as TeacherRole;

  if (!teacherId || !role) {
    throw new Error("Missing teacher role data");
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("id", teacherId);

  if (error) {
    console.error("ROLE UPDATE ERROR:", error);
    throw new Error("Failed to update role");
  }

  revalidatePath("/admin/teachers");
}

export async function updateTeacherSubscription(formData: FormData) {
  const teacherId = String(formData.get("teacherId") ?? "");
  const subscription = String(
    formData.get("subscription") ?? ""
  ) as TeacherSubscription;

  if (!teacherId || !subscription) {
    throw new Error("Missing teacher subscription data");
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("profiles")
    .update({ subscription_status: subscription })
    .eq("id", teacherId);

  if (error) {
    console.error("SUBSCRIPTION UPDATE ERROR:", error);
    throw new Error("Failed to update subscription");
  }

  revalidatePath("/admin/teachers");
}