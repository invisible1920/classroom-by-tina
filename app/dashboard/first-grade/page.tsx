export default function FirstGradePage() {
  const subjects = ["ELA", "Math", "Science", "Social Studies"];

  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <a href="/dashboard" className="text-blue-600">
        ← Back to Dashboard
      </a>

      <h1 className="mt-8 text-4xl font-bold text-slate-900">
        First Grade
      </h1>

      <p className="mt-3 text-lg text-slate-600">
        Choose a subject to browse resources.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-4">
        {subjects.map((subject) => (
          <div
            key={subject}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
          >
            <h2 className="text-2xl font-bold text-slate-900">{subject}</h2>
            <p className="mt-3 text-slate-600">
              Weekly lessons, activities, centers, and assessments.
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}