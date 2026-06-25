export default function About() {
  return (
    <section id="about" className="bg-white px-6 py-24">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <div>
          <p className="font-semibold uppercase tracking-widest text-blue-600">
            Created by a real teacher
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Built from 10 years in the lower-grade classroom.
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Tina spent a decade teaching first grade in Charlotte-Mecklenburg
            Schools. Other teachers often came to her for lesson plans because
            her resources were organized, practical, and ready to use.
          </p>
        </div>

        <div className="rounded-3xl bg-slate-100 p-10">
          <p className="text-2xl font-semibold text-slate-900">
            “Teachers do not need more random worksheets. They need a full week
            that is organized, clear, and ready before Monday morning.”
          </p>

          <p className="mt-6 font-semibold text-slate-600">— Tina</p>
        </div>
      </div>
    </section>
  );
}