import Image from "next/image";
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
    <section id="about" className="overflow-hidden px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="min-w-0 rounded-[1.5rem] border border-amber-100 bg-white p-3 shadow-2xl shadow-slate-950/10 sm:rounded-[2rem] sm:p-4">
          <div className="overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-amber-100 via-white to-blue-100 sm:rounded-[1.5rem]">
            <div className="p-5 sm:p-8">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#1f2a44] shadow-sm">
                <Sparkles size={16} className="shrink-0 text-[#f5b942]" />
                <span className="truncate">Meet Tina</span>
              </div>

              <div className="mt-8 flex flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
                <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl sm:h-32 sm:w-32">
                  <Image
                    src="/tina.jpg"
                    alt="Tina"
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="text-balance text-2xl font-black tracking-tight text-[#1f2a44] sm:text-3xl">
                    10 Years Teaching First Grade
                  </h3>
                  <p className="mt-2 break-words font-bold text-slate-600">
                    Charlotte-Mecklenburg Schools
                  </p>
                </div>
              </div>

              <p className="mt-8 text-base leading-8 text-slate-700 sm:text-lg">
                For 10 years, Tina taught First Grade in Charlotte-Mecklenburg
                Schools, creating engaging lesson plans, centers, assessments,
                and classroom routines that helped students succeed. Classroom
                by Tina brings those classroom-tested resources together in one
                organized platform so teachers can spend less time planning and
                more time teaching.
              </p>

              <div className="mt-8 grid gap-4">
                {credibility.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex min-w-0 items-center gap-4 rounded-2xl bg-white/80 p-4 shadow-sm"
                    >
                      <div className="shrink-0 rounded-xl bg-[#1f2a44] p-3 text-white">
                        <Icon size={20} />
                      </div>

                      <div className="min-w-0">
                        <p className="break-words text-xl font-black text-[#1f2a44]">
                          {item.label}
                        </p>
                        <p className="break-words text-sm font-bold leading-5 text-slate-600">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-white/70 bg-white/55 p-5 sm:p-6">
              <p className="break-words text-xs font-black uppercase tracking-widest text-amber-700 sm:text-sm">
                Teacher-first philosophy
              </p>

              <div className="mt-4 grid gap-3">
                {beliefs.map((belief) => (
                  <div key={belief} className="flex min-w-0 items-start gap-3">
                    <CheckCircle2
                      size={19}
                      className="mt-0.5 shrink-0 text-emerald-600"
                    />
                    <p className="min-w-0 break-words font-bold leading-6 text-slate-700">
                      {belief}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-0">
          <p className="break-words text-sm font-black uppercase tracking-widest text-amber-700">
            Why this exists
          </p>

          <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-[#1f2a44] sm:text-4xl md:text-5xl">
            Teachers should not have to rebuild their week from scratch.
          </h2>

          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            Most teachers are piecing together resources from old folders,
            marketplaces, shared drives, and last year’s plans. Classroom by
            Tina gives teachers a better system: organized, beautiful, and built
            around the actual flow of teaching.
          </p>

          <div className="mt-8 rounded-[1.5rem] border border-amber-100 bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-7">
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start">
              <div className="w-fit shrink-0 rounded-2xl bg-amber-100 p-3 text-amber-800">
                <HeartHandshake size={24} />
              </div>

              <div className="min-w-0">
                <h3 className="text-balance text-xl font-black text-[#1f2a44] sm:text-2xl">
                  Made for teachers who are tired.
                </h3>

                <p className="mt-3 break-words leading-7 text-slate-600">
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
                className="min-w-0 rounded-2xl border border-amber-100 bg-white p-5 text-center font-black text-[#1f2a44] shadow-sm"
              >
                <span className="break-words">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}