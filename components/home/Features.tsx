import {
  Bot,
  ClipboardCheck,
  FileText,
  Heart,
  Home,
  Layers3,
  Mail,
  Presentation,
  Search,
} from "lucide-react";

const features = [
  {
    title: "Lesson Plans",
    description: "Teacher-ready plans organized by grade, subject, and week.",
    icon: FileText,
  },
  {
    title: "Centers",
    description: "Small-group activities built for real K–2 classroom routines.",
    icon: Layers3,
  },
  {
    title: "Assessments",
    description: "Quickly check understanding without building from scratch.",
    icon: ClipboardCheck,
  },
  {
    title: "Homework",
    description: "Meaningful practice that matches the weekly instruction.",
    icon: Home,
  },
  {
    title: "Parent Letters",
    description: "Ready-to-send communication for families.",
    icon: Mail,
  },
  {
    title: "Slides",
    description: "Presentation-ready materials for whole-group teaching.",
    icon: Presentation,
  },
  {
    title: "Favorites",
    description: "Save your go-to resources and quickly find them later.",
    icon: Heart,
  },
  {
    title: "Smart Search",
    description: "Find resources by grade, subject, week, category, or standard.",
    icon: Search,
  },
  {
    title: "AI Tools Soon",
    description: "Generate homework, quizzes, parent letters, and more.",
    icon: Bot,
  },
];

export default function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-black uppercase tracking-widest text-amber-700">
            Everything teachers need
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#1f2a44] md:text-5xl">
            One platform for planning, teaching, practice, and assessment.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Stop bouncing between folders, drives, marketplaces, and old lesson
            files. Classroom by Tina keeps your weekly teaching materials
            organized in one beautiful workflow.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-[2rem] border border-amber-100 bg-white/85 p-7 shadow-sm transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-slate-950/5"
              >
                <div
                  className={[
                    "flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-sm",
                    index % 3 === 0
                      ? "bg-[#1f2a44]"
                      : index % 3 === 1
                        ? "bg-[#3b82f6]"
                        : "bg-[#f5b942] text-[#1f2a44]",
                  ].join(" ")}
                >
                  <Icon size={25} />
                </div>

                <h3 className="mt-6 text-2xl font-black tracking-tight text-[#1f2a44]">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 rounded-[2rem] border border-amber-100 bg-[#1f2a44] p-8 text-white shadow-2xl shadow-slate-950/10">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-[#f5b942]">
                Built around weekly teaching
              </p>

              <h3 className="mt-3 text-3xl font-black">
                Start with the week. Open what you need. Teach with confidence.
              </h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {["Plan", "Teach", "Assess"].map((step) => (
                <div
                  key={step}
                  className="rounded-2xl bg-white/10 p-5 text-center font-black"
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}