export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 h-screen w-72 border-r border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Classroom by Tina
        </h1>

        <nav className="mt-10 space-y-2">
          {["Dashboard", "Kindergarten", "First Grade", "Second Grade", "Favorites", "Downloads", "Account"].map((item) => (
            <a
              key={item}
              href="#"
              className="block rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      <section className="ml-72 p-10">
        <h2 className="text-4xl font-bold text-slate-900">
          Teacher Dashboard
        </h2>

        <p className="mt-3 text-lg text-slate-600">
          Browse resources by grade, subject, week, and skill.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {["Kindergarten", "First Grade", "Second Grade"].map((grade) => (
            <div
              key={grade}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
            >
              <h3 className="text-2xl font-bold text-slate-900">{grade}</h3>
              <p className="mt-3 text-slate-600">
                Lesson plans, centers, assessments, and activities.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}