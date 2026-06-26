import { createClient } from "@/utils/supabase/server";
import type { Teacher } from "@/types/teacher";

export async function getTeachers(): Promise<Teacher[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch accounts:", error);
    return [];
  }

  return data as Teacher[];
}