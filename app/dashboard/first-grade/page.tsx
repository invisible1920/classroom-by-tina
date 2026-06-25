import { resources } from "@/lib/resources";

export default function FirstGradePage() {
  const firstGradeResources = resources.filter(
    (resource) => resource.grade === "First Grade"
  );

  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <a href="/dashboard" className="text-blue-600">
        ← Back to Dashboard
      </a>

      <h1 className="mt-8 text-4xl font-bold text-slate-900">First Grade</h1>

      <p className="mt-3 text-lg text-slate-600">
        Browse first grade resources by subject, week, and skill.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {firstGradeResources.map((resource) => (
          <div
            key={resource.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-semibold text-blue-600">
              {resource.subject} · Week {resource.week}
            </p>

            <h2 className="mt-3 text-2xl font-bold text-slate-900">
              {resource.title}
            </h2>

            <p className="mt-3 text-slate-600">{resource.description}</p>

            <p className="mt-4 text-sm text-slate-500">
              {resource.category} · {resource.standard}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}