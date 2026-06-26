import GradeResourceBrowser from "@/components/resources/GradeResourceBrowser";
import { getResources } from "@/services";

export default async function FirstGradePage() {
  const resources = await getResources({
    grade: "First Grade",
    status: "published",
    pageSize: 100,
  });

  return (
    <GradeResourceBrowser grade="First Grade" resources={resources.items} />
  );
}
