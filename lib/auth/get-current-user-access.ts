import { createClient } from "@/utils/supabase/server";

export type CurrentUserAccess = {
  userId: string | null;
  role: string | null;
  isAdmin: boolean;
};

export async function getCurrentUserAccess(): Promise<CurrentUserAccess> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      userId: null,
      role: null,
      isAdmin: false,
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  return {
    userId: user.id,
    role: profile?.role ?? null,
    isAdmin: profile?.role === "admin",
  };
}