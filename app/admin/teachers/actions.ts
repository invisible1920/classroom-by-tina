"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import type { TeacherRole, TeacherSubscription } from "@/types/teacher";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabase-admin";

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

export async function deleteTeacherAccount(formData: FormData) {
  const teacherId = String(formData.get("teacherId") ?? "");
  const confirmDelete = String(formData.get("confirmDelete") ?? "");

if (confirmDelete !== "DELETE") {
  throw new Error("Delete confirmation missing");
}

  if (!teacherId) {
    throw new Error("Missing teacher id");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: adminProfile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (adminProfile?.role !== "admin") {
    redirect("/dashboard");
  }

  if (teacherId === user.id) {
    throw new Error("You cannot delete your own admin account");
  }

  await supabaseAdmin.from("user_devices").delete().eq("user_id", teacherId);

  const { error } = await supabaseAdmin.auth.admin.deleteUser(teacherId);

  if (error) {
    console.error("DELETE USER ERROR:", error);
    throw new Error("Failed to delete account");
  }

  revalidatePath("/admin/teachers");
}