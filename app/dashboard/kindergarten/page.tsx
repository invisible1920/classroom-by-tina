import GradeResourceBrowser from "@/components/resources/GradeResourceBrowser";
import { getResources } from "@/services";

export default async function KindergartenPage() {
  const resources = await getResources({
    grade: "Kindergarten",
    status: "published",
    pageSize: 100,
  });

  return (
    <GradeResourceBrowser grade="Kindergarten" resources={resources.items} />
  );
}
