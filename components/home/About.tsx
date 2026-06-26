import {
  Award,
  BookOpen,
  CheckCircle2,
  HeartHandshake,
  School,
  Sparkles,
} from "lucide-react";

const credibility = [
  {
    label: "10 years",
    detail: "First Grade teaching experience",
    icon: School,
  },
  {
    label: "K–2",
    detail: "Built for early elementary classrooms",
    icon: BookOpen,
  },
  {
    label: "Teacher-made",
    detail: "Created from real classroom routines",
    icon: Award,
  },
];

const beliefs = [
  "Teachers need organized systems, not more scattered files.",
  "Resources should match the real weekly classroom workflow.",
  "Planning should feel lighter, faster, and more beautiful.",
];

export default function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-amber-100 bg-white p-4 shadow-2xl shadow-slate-950/10">
          <div className="overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-amber-100 via-white to-blue-100">
            <div className="p-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#1f2a44] shadow-sm">
                <Sparkles size={16} className="text-[#f5b942]" />
                Built by Tina
              </div>

              <div className="mt-8 flex items-center gap-5">
                <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-[#1f2a44] text-4xl font-black text-white shadow-xl">
                  T
                </div>

                <div>
                  <h3 className="text-3xl font-black tracking-tight text-[#1f2a44]">
                    Classroom-tested resources.
                  </h3>
                  <p className="mt-2 font-bold text-slate-600">
                    Designed from real K–2 teaching experience.
                  </p>
                </div>
              </div>

              <p className="mt-8 text-lg leading-8 text-slate-700">
                Tina spent 10 years as a First Grade teacher in
                Charlotte-Mecklenburg Schools, creating practical resources that
                helped teachers plan faster, stay organized, and teach with
                confidence.
              </p>

              <div className="mt-8 grid gap-4">
                {credibility.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-4 rounded-2xl bg-white/80 p-4 shadow-sm"
                    >
                      <div className="rounded-xl bg-[#1f2a44] p-3 text-white">
                        <Icon size={20} />
                      </div>

                      <div>
                        <p className="text-xl font-black text-[#1f2a44]">
                          {item.label}
                        </p>
                        <p className="text-sm font-bold text-slate-600">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-white/70 bg-white/55 p-6">
              <p className="text-sm font-black uppercase tracking-widest text-amber-700">
                Teacher-first philosophy
              </p>

              <div className="mt-4 grid gap-3">
                {beliefs.map((belief) => (
                  <div key={belief} className="flex items-start gap-3">
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />
                    <p className="font-bold leading-6 text-slate-700">
                      {belief}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="font-black uppercase tracking-widest text-amber-700">
            Why this exists
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#1f2a44] md:text-5xl">
            Teachers should not have to rebuild their week from scratch.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Most teachers are piecing together resources from old folders,
            marketplaces, shared drives, and last year’s plans. Classroom by
            Tina gives teachers a better system: organized, beautiful, and
            built around the actual flow of teaching.
          </p>

          <div className="mt-8 rounded-[2rem] border border-amber-100 bg-white p-7 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-amber-100 p-3 text-amber-800">
                <HeartHandshake size={24} />
              </div>

              <div>
                <h3 className="text-2xl font-black text-[#1f2a44]">
                  Made for teachers who are tired.
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  The goal is simple: help teachers spend less time hunting for
                  materials and more time actually teaching, supporting
                  students, and going home with energy left.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {["Plan faster", "Teach better", "Go home lighter"].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-amber-100 bg-white p-5 text-center font-black text-[#1f2a44] shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}