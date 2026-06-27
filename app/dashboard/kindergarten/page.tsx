import { redirect } from "next/navigation";

import GradeResourceBrowser from "@/components/resources/GradeResourceBrowser";
import { getResources } from "@/services";
import { createClient } from "@/utils/supabase/server";
import { getCurrentUserAccess } from "@/lib/auth/get-current-user-access";

export default async function KindergartenPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const access = await getCurrentUserAccess();

  const resources = await getResources({
    grade: "Kindergarten",
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
      key={`${access.isAdmin}-${favoriteResourceIds.join("-")}`}
      grade="Kindergarten"
      resources={resources.items}
      favoriteResourceIds={favoriteResourceIds}
      isAdmin={access.isAdmin}
    />
  );
}