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
    emoji: "🍎",
    color: "bg-[#ff6f91]",
  },
  {
    label: "K–2",
    detail: "Built for early elementary classrooms",
    icon: BookOpen,
    emoji: "📚",
    color: "bg-[#35c6c9]",
  },
  {
    label: "Teacher-made",
    detail: "Created from real classroom routines",
    icon: Award,
    emoji: "⭐",
    color: "bg-[#f7b928]",
  },
];

const beliefs = [
  "Teachers need organized systems, not more scattered files.",
  "Resources should match the real weekly classroom workflow.",
  "Planning should feel lighter, faster, and more beautiful.",
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24">
      <div className="absolute left-[-8rem] top-20 -z-10 h-72 w-72 rounded-full bg-[#ff6f91]/15 blur-3xl" />
      <div className="absolute right-[-8rem] bottom-20 -z-10 h-80 w-80 rounded-full bg-[#35c6c9]/15 blur-3xl" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="min-w-0 rounded-[1.5rem] border border-[#ffe7b5] bg-white p-3 shadow-2xl shadow-slate-950/5 sm:rounded-[2rem] sm:p-4">
          <div className="overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-[#fff3c4] via-white to-[#e8fbfb] sm:rounded-[1.5rem]">
            <div className="p-5 sm:p-8">
              <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#17223b] shadow-sm">
                <Sparkles size={16} className="shrink-0 text-[#ff8a3d]" />
                <span className="truncate">Meet Tina 🍎</span>
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
                  <h3 className="text-balance text-2xl font-black tracking-tight text-[#17223b] sm:text-3xl">
                    10 Years Teaching First Grade
                  </h3>
                  <p className="mt-2 break-words font-bold text-slate-600">
                    Charlotte-Mecklenburg Schools
                  </p>
                </div>
              </div>

              <p className="mt-8 text-base leading-8 text-slate-700 sm:text-lg">
                For 10 years, Tina taught First Grade in Charlotte-Mecklenburg
                Schools, creating lesson plans, centers, assessments, and
                classroom routines that actually worked with real students.
                Classroom by Tina brings those classroom-tested resources into
                one organized platform for Charlotte-Mecklenburg K–2 teachers.
              </p>

              <div className="mt-8 grid gap-4">
                {credibility.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex min-w-0 items-center gap-4 rounded-2xl bg-white/85 p-4 shadow-sm"
                    >
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl text-white ${item.color}`}>
                        {item.emoji}
                      </div>

                      <div className="min-w-0">
                        <p className="break-words text-xl font-black text-[#17223b]">
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

            <div className="border-t border-white/70 bg-white/60 p-5 sm:p-6">
              <p className="break-words text-xs font-black uppercase tracking-widest text-[#ff8a3d] sm:text-sm">
                Teacher-first philosophy ✏️
              </p>

              <div className="mt-4 grid gap-3">
                {beliefs.map((belief, index) => (
                  <div key={belief} className="flex min-w-0 items-start gap-3">
                    <CheckCircle2
                      size={19}
                      className={[
                        "mt-0.5 shrink-0",
                        index === 0
                          ? "text-[#35c6c9]"
                          : index === 1
                            ? "text-[#ff6f91]"
                            : "text-[#7ac943]",
                      ].join(" ")}
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
          <p className="break-words text-sm font-black uppercase tracking-widest text-[#ff8a3d]">
            Why this exists 💛
          </p>

          <h2 className="mt-4 text-balance text-3xl font-black tracking-tight text-[#17223b] sm:text-4xl md:text-5xl">
            Planning should feel lighter, cuter, and way more organized.
          </h2>

          <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
            Most teachers are piecing together resources from old folders,
            marketplaces, shared drives, and last year’s plans. Classroom by
            Tina gives teachers a better system: organized by grade, subject,
            week, and classroom routine.
          </p>

          <div className="mt-8 rounded-[1.5rem] border border-[#ffe7b5] bg-white p-5 shadow-sm sm:rounded-[2rem] sm:p-7">
            <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start">
              <div className="w-fit shrink-0 rounded-2xl bg-[#fff3c4] p-3 text-[#ff8a3d]">
                <HeartHandshake size={24} />
              </div>

              <div className="min-w-0">
                <h3 className="text-balance text-xl font-black text-[#17223b] sm:text-2xl">
                  Made for teachers who are tired.
                </h3>

                <p className="mt-3 break-words leading-7 text-slate-600">
                  The goal is simple: help teachers spend less time hunting for
                  materials and more time teaching, supporting students, and
                  going home with energy left.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: "Plan faster", emoji: "📝", color: "bg-[#35c6c9]/10" },
              { label: "Teach happier", emoji: "🍎", color: "bg-[#ff6f91]/10" },
              { label: "Go home lighter", emoji: "⭐", color: "bg-[#f7b928]/15" },
            ].map((item) => (
              <div
                key={item.label}
                className={`min-w-0 rounded-2xl border border-white bg-white p-5 text-center font-black text-[#17223b] shadow-sm ${item.color}`}
              >
                <div className="text-3xl">{item.emoji}</div>
                <span className="mt-3 block break-words">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}