export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <p className="font-semibold uppercase tracking-widest text-blue-600">
          Built for K–2 Teachers
        </p>

        <h2 className="mx-auto mt-6 max-w-5xl text-6xl font-extrabold leading-tight text-slate-900">
          Your classroom.
          <br />
          Already planned.
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-xl text-slate-600">
          Lesson plans, centers, assessments, activities, parent resources, and
          everything else you need in one organized platform.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <a
            href="#pricing"
            className="rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700"
          >
            Become a Founding Member
          </a>

          <a
            href="#features"
            className="rounded-lg border border-slate-300 px-8 py-4 font-semibold"
          >
            View Free Resources
          </a>
        </div>
      </div>
    </section>
  );
}