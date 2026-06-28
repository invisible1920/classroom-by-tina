import { createClient } from "@/utils/supabase/server";

export async function getFavoriteResourceIds(userId: string): Promise<string[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("resource_favorites")
    .select("resource_id")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((favorite) => String(favorite.resource_id));
}