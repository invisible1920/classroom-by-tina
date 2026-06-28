import { redirect } from "next/navigation";

import GradeResourceBrowser from "@/components/resources/GradeResourceBrowser";
import { getCurrentUserAccess } from "@/lib/auth/get-current-user-access";
import { getResources } from "@/services";
import { getFavoriteResourceIds } from "@/lib/favorites";

export default async function FirstGradePage() {
  const access = await getCurrentUserAccess();

  if (!access.userId) {
    redirect("/login");
  }



  const resources = await getResources({
    grade: "First Grade",
    status: "published",
    pageSize: 500,
  });

  const favoriteResourceIds = await getFavoriteResourceIds(access.userId);

  return (
    <GradeResourceBrowser
      key={`${access.isAdmin}-${favoriteResourceIds.join("-")}`}
      grade="First Grade"
      resources={resources.items}
      favoriteResourceIds={favoriteResourceIds}
      isAdmin={access.isAdmin}
    />
  );
}