export default function DashboardPreview() {
  const grades = ["Kindergarten", "First Grade", "Second Grade"];
  const subjects = ["ELA", "Math", "Science", "Social Studies"];
  const resources = ["Lesson Plans", "Centers", "Assessments", "Homework"];

  return (
    <section className="bg-slate-50 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            Inside Classroom by Tina
          </p>

          <h2 className="mt-4 text-5xl font-bold text-slate-900">
            Everything teachers need.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Find exactly what you need in seconds.
          </p>
        </div>

        <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
          <div className="mb-8 flex gap-3">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>

          <div className="grid gap-10 md:grid-cols-4">
            <PreviewColumn title="Grades" items={grades} active="First Grade" />
            <PreviewColumn title="Subjects" items={subjects} />
            <PreviewColumn title="Resources" items={resources} />

            <div>
              <h4 className="font-bold text-slate-900">Search</h4>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
                🔍 Short Vowels
              </div>

              <div className="mt-4 rounded-xl bg-blue-600 p-4 font-semibold text-white">
                24 Results Found
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewColumn({
  title,
  items,
  active,
}: {
  title: string;
  items: string[];
  active?: string;
}) {
  return (
    <div>
      <h4 className="font-bold text-slate-900">{title}</h4>

      <div className="mt-4 space-y-2">
        {items.map((item) => (
          <div
            key={item}
            className={`rounded-lg p-3 ${
              item === active
                ? "bg-blue-100 font-semibold"
                : "border border-slate-200 bg-white"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}