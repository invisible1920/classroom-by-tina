import { redirect } from "next/navigation";

import GradeResourceBrowser from "@/components/resources/GradeResourceBrowser";
import { getCurrentUserAccess } from "@/lib/auth/get-current-user-access";
import { getFavoriteResourceIds } from "@/lib/favorites";
import { getResources } from "@/services";

export default async function SecondGradePage() {
  const access = await getCurrentUserAccess();

  if (!access.userId) {
    redirect("/login");
  }

  const resources = await getResources({
    grade: "Second Grade",
    status: "published",
    pageSize: 500,
  });

  const favoriteResourceIds = await getFavoriteResourceIds(access.userId);

  return (
    <GradeResourceBrowser
      key={`${access.isAdmin}-${favoriteResourceIds.join("-")}`}
      grade="Second Grade"
      resources={resources.items}
      favoriteResourceIds={favoriteResourceIds}
      isAdmin={access.isAdmin}
    />
  );
}