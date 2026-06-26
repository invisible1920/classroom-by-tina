import { createClient } from "@/utils/supabase/server";
import type { Teacher } from "@/types/teacher";

export async function getTeachers(): Promise<Teacher[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "teacher")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch teachers:", error);
    return [];
  }

  return data as Teacher[];
}