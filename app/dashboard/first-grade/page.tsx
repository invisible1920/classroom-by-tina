import { redirect } from "next/navigation";

import GradeResourceBrowser from "@/components/resources/GradeResourceBrowser";
import { getResources } from "@/services";
import { createClient } from "@/utils/supabase/server";

export default async function FirstGradePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const isAdmin = profile?.role === "admin";

  const resources = await getResources({
    grade: "First Grade",
    status: "published",
    pageSize: 500,
  });

  const { data: favorites } = await supabase
    .from("resource_favorites")
    .select("resource_id")
    .eq("user_id", user.id);

  const favoriteResourceIds =
    favorites?.map((favorite) => favorite.resource_id) ?? [];

  return (
    <GradeResourceBrowser
      key={`${isAdmin}-${favoriteResourceIds.join("-")}`}
      grade="First Grade"
      resources={resources.items}
      favoriteResourceIds={favoriteResourceIds}
      isAdmin={isAdmin}
    />
  );
}