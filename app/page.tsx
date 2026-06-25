export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      {/* Navigation */}
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-slate-900">
            Classroom by Tina
          </h1>

          <div className="hidden gap-8 md:flex">
            <a href="#" className="text-slate-600 hover:text-slate-900">
              Features
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900">
              Pricing
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-900">
              About
            </a>
          </div>

          <button className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700">
            Join
          </button>
        </nav>
      </header>

      {/* Hero */}
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
            Lesson plans, centers, assessments, activities, parent resources,
            and everything else you need in one organized platform.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <button className="rounded-lg bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700">
              Become a Founding Member
            </button>

            <button className="rounded-lg border border-slate-300 px-8 py-4 font-semibold">
              View Free Resources
            </button>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-24">

        <h3 className="text-center text-4xl font-bold">
          Everything organized for teachers.
        </h3>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          <div className="rounded-2xl border p-8">
            <h4 className="text-xl font-bold">
              Lesson Plans
            </h4>

            <p className="mt-4 text-slate-600">
              Daily ready-to-teach lessons.
            </p>
          </div>

          <div className="rounded-2xl border p-8">
            <h4 className="text-xl font-bold">
              Centers & Activities
            </h4>

            <p className="mt-4 text-slate-600">
              Print, teach, and go.
            </p>
          </div>

          <div className="rounded-2xl border p-8">
            <h4 className="text-xl font-bold">
              Assessments
            </h4>

            <p className="mt-4 text-slate-600">
              Track student progress effortlessly.
            </p>
          </div>

        </div>

      </section>
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

    <div className="mt-16 rounded-3xl border bg-white p-10 shadow-xl">

      <div className="mb-8 flex gap-3">
        <div className="h-3 w-3 rounded-full bg-red-400"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
        <div className="h-3 w-3 rounded-full bg-green-400"></div>
      </div>

      <div className="grid gap-10 md:grid-cols-4">

        <div>
          <h4 className="font-bold text-slate-900">Grades</h4>

          <div className="mt-4 space-y-2">
            <div className="rounded-lg bg-blue-50 p-3">Kindergarten</div>
            <div className="rounded-lg bg-blue-100 p-3 font-semibold">
              First Grade
            </div>
            <div className="rounded-lg bg-blue-50 p-3">Second Grade</div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-slate-900">Subjects</h4>

          <div className="mt-4 space-y-2">
            <div className="rounded-lg border p-3">ELA</div>
            <div className="rounded-lg border p-3">Math</div>
            <div className="rounded-lg border p-3">Science</div>
            <div className="rounded-lg border p-3">Social Studies</div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-slate-900">Resources</h4>

          <div className="mt-4 space-y-2">
            <div className="rounded-lg border p-3">Lesson Plans</div>
            <div className="rounded-lg border p-3">Centers</div>
            <div className="rounded-lg border p-3">Assessments</div>
            <div className="rounded-lg border p-3">Homework</div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-slate-900">Search</h4>

          <div className="mt-4 rounded-xl border bg-slate-50 p-4">
            🔍 Short Vowels
          </div>

          <div className="mt-4 rounded-xl bg-blue-600 p-4 text-white">
            24 Results Found
          </div>
        </div>

      </div>

    </div>

  </div>
</section>
      <section id="about" className="bg-white px-6 py-24">
  <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
    <div>
      <p className="font-semibold uppercase tracking-widest text-blue-600">
        Created by a real teacher
      </p>

      <h3 className="mt-4 text-4xl font-bold text-slate-900">
        Built from 10 years in the lower-grade classroom.
      </h3>

      <p className="mt-6 text-lg text-slate-600">
        Tina spent a decade teaching first grade in Charlotte-Mecklenburg
        Schools. Other teachers often came to her for lesson plans because her
        resources were organized, practical, and ready to use.
      </p>
    </div>

    <div className="rounded-3xl bg-slate-100 p-10">
      <p className="text-2xl font-semibold text-slate-900">
        “Teachers do not need more random worksheets. They need a full week that
        is organized, clear, and ready before Monday morning.”
      </p>

      <p className="mt-6 font-semibold text-slate-600">— Tina</p>
    </div>
  </div>
</section>
      <section id="pricing" className="bg-slate-950 px-6 py-24 text-white">
  <div className="mx-auto max-w-3xl text-center">
    <p className="font-semibold uppercase tracking-widest text-blue-400">
      Founding Teacher Access
    </p>

    <h3 className="mt-4 text-4xl font-bold">
      Join early and help shape the platform.
    </h3>

    <p className="mt-6 text-lg text-slate-300">
      Get early access to Classroom by Tina as we build the first complete
      lower-grade resource library.
    </p>

    <div className="mx-auto mt-10 max-w-md rounded-3xl bg-white p-8 text-slate-900">
      <div className="text-5xl font-extrabold">$9</div>
      <p className="mt-2 text-slate-600">per month during founding launch</p>

      <ul className="mt-8 space-y-3 text-left">
        <li>✓ K–2 classroom resources</li>
        <li>✓ Lesson plans and activities</li>
        <li>✓ Centers and assessments</li>
        <li>✓ New content added regularly</li>
      </ul>

      <button className="mt-8 w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white hover:bg-blue-700">
        Join Waitlist
      </button>
    </div>
  </div>
</section>
<section className="bg-white px-6 py-24 text-center">
  <div className="mx-auto max-w-3xl">
    <h3 className="text-4xl font-bold text-slate-900">
      Stop rebuilding your week from scratch.
    </h3>

    <p className="mt-6 text-lg text-slate-600">
      Classroom by Tina is being built for real lower-grade teachers who need
      practical, organized, ready-to-use resources.
    </p>

    <button className="mt-8 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700">
      Join the Founding Teacher List
    </button>
  </div>
</section>

<footer className="border-t border-slate-200 bg-slate-50 px-6 py-10">
  <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row">
    <p className="font-bold text-slate-900">Classroom by Tina</p>
    <p className="text-slate-500">
      © 2026 Classroom by Tina. All rights reserved.
    </p>
  </div>
</footer>

    </main>
  );
}