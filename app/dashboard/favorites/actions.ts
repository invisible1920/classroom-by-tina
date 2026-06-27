"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function toggleFavorite(resourceId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: existingFavorite } = await supabase
    .from("resource_favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("resource_id", resourceId)
    .maybeSingle();

  if (existingFavorite) {
    await supabase
      .from("resource_favorites")
      .delete()
      .eq("id", existingFavorite.id);
  } else {
    await supabase.from("resource_favorites").insert({
      user_id: user.id,
      resource_id: resourceId,
    });
  }

  revalidatePath("/dashboard", "layout");
revalidatePath("/dashboard/favorites", "page");
revalidatePath("/dashboard/kindergarten", "page");
revalidatePath("/dashboard/first-grade", "page");
revalidatePath("/dashboard/second-grade", "page");
}