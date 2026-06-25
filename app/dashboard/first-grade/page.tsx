import { resources } from "@/lib/resources";
import ResourceCard from "@/components/resources/ResourceCard";

export default function FirstGradePage() {
  const firstGradeResources = resources.filter(
    (resource) => resource.grade === "First Grade"
  );

  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <a href="/dashboard" className="text-blue-600 hover:underline">
        ← Back to Dashboard
      </a>

      <h1 className="mt-8 text-4xl font-bold text-slate-900">
        First Grade
      </h1>

      <p className="mt-3 text-lg text-slate-600">
        Browse first grade resources by subject, week, and skill.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {firstGradeResources.length > 0 ? (
          firstGradeResources.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
            />
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <h2 className="text-2xl font-bold text-slate-900">
              No resources yet
            </h2>

            <p className="mt-3 text-slate-600">
              Tina hasn't uploaded any First Grade resources yet.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}