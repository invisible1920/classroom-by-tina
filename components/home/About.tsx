import { Award, BookOpen, HeartHandshake, School } from "lucide-react";

const credibility = [
  {
    label: "10 years",
    detail: "First Grade teaching experience",
    icon: School,
  },
  {
    label: "K–2",
    detail: "Resources built for early elementary classrooms",
    icon: BookOpen,
  },
  {
    label: "Teacher-made",
    detail: "Created from real classroom routines",
    icon: Award,
  },
];

export default function About() {
  return (
    <section id="about" className="px-6 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] border border-amber-100 bg-white p-6 shadow-2xl shadow-slate-950/10">
          <div className="rounded-[1.5rem] bg-gradient-to-br from-amber-100 to-blue-100 p-8">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl font-black text-slate-950 shadow-sm">
              T
            </div>

            <h3 className="mt-8 text-3xl font-black tracking-tight text-slate-950">
              Built by Tina
            </h3>

            <p className="mt-4 text-lg leading-8 text-slate-700">
              Tina spent 10 years as a First Grade teacher in
              Charlotte-Mecklenburg Schools, creating resources that helped
              teachers plan faster and teach with more confidence.
            </p>

            <div className="mt-8 grid gap-4">
              {credibility.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 rounded-2xl bg-white/75 p-4"
                  >
                    <div className="rounded-xl bg-slate-950 p-3 text-white">
                      <Icon size={20} />
                    </div>

                    <div>
                      <p className="text-xl font-black text-slate-950">
                        {item.label}
                      </p>
                      <p className="text-sm font-semibold text-slate-600">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div>
          <p className="font-bold uppercase tracking-widest text-amber-700">
            Why this exists
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            Teachers should not have to rebuild their week from scratch.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Most teachers are piecing together resources from old folders,
            marketplaces, shared drives, and last year’s plans. Classroom by
            Tina gives teachers a better system: organized, beautiful, and built
            around the actual flow of teaching.
          </p>

          <div className="mt-8 rounded-[2rem] border border-amber-100 bg-white p-7 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-amber-100 p-3 text-amber-800">
                <HeartHandshake size={24} />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-950">
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
        </div>
      </div>
    </section>
  );
}