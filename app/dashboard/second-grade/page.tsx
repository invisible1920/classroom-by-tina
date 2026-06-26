import GradeResourceBrowser from "@/components/resources/GradeResourceBrowser";
import { getResources } from "@/services";

export default async function SecondGradePage() {
  const resources = await getResources({
    grade: "Second Grade",
    status: "published",
    pageSize: 100,
  });

  return (
    <GradeResourceBrowser grade="Second Grade" resources={resources.items} />
  );
}
