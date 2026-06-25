import {
  ClipboardCheck,
  FileText,
  Home,
  Layers3,
  Mail,
  Presentation,
} from "lucide-react";

const features = [
  {
    title: "Weekly Lesson Plans",
    description:
      "Clear, teacher-ready plans organized by grade, subject, and week.",
    icon: FileText,
  },
  {
    title: "Centers",
    description:
      "Small-group activities that fit into the real rhythm of a K–2 classroom.",
    icon: Layers3,
  },
  {
    title: "Assessments",
    description:
      "Check understanding without creating everything from scratch.",
    icon: ClipboardCheck,
  },
  {
    title: "Homework",
    description:
      "Send home meaningful practice that aligns with the weekly instruction.",
    icon: Home,
  },
  {
    title: "Parent Letters",
    description:
      "Keep families informed with ready-to-use weekly communication.",
    icon: Mail,
  },
  {
    title: "Slides",
    description:
      "Presentation-ready classroom slides for whole-group teaching.",
    icon: Presentation,
  },
];

export default function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="font-bold uppercase tracking-widest text-amber-700">
            Everything in one place
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            Stop hunting through folders, drives, and marketplaces.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Classroom by Tina organizes the resources teachers use every week
            into a simple workflow: plan, teach, practice, assess, and
            communicate.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-[2rem] border border-amber-100 bg-white/80 p-7 shadow-sm transition hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-slate-950/5"
              >
                <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                  <Icon size={24} />
                </div>

                <h3 className="mt-6 text-2xl font-black tracking-tight text-slate-950">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}