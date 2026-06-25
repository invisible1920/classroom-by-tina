export default function Features() {
  const features = [
    {
      title: "Lesson Plans",
      description: "Daily ready-to-teach lessons aligned to your classroom.",
    },
    {
      title: "Centers & Activities",
      description: "Print, teach, and go with engaging classroom centers.",
    },
    {
      title: "Assessments",
      description: "Quickly monitor student progress with ready-made assessments.",
    },
  ];

  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-6 py-24"
    >
      <div className="text-center">
        <p className="font-semibold uppercase tracking-widest text-blue-600">
          Features
        </p>

        <h2 className="mt-4 text-4xl font-bold text-slate-900">
          Everything organized for teachers.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          No more digging through folders or rebuilding lessons every Sunday.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <h3 className="text-xl font-bold text-slate-900">
              {feature.title}
            </h3>

            <p className="mt-4 text-slate-600">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}