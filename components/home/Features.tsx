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
  Smile,
} from "lucide-react";

const features = [
  {
    title: "Lesson Plans",
    description: "Ready-to-teach plans organized by grade, subject, and week.",
    icon: FileText,
    emoji: "📚",
    color: "bg-[#35c6c9]",
    soft: "bg-[#35c6c9]/10",
  },
  {
    title: "Centers",
    description: "Small-group activities for busy K–2 classroom routines.",
    icon: Layers3,
    emoji: "🧩",
    color: "bg-[#f7b928]",
    soft: "bg-[#f7b928]/15",
  },
  {
    title: "Assessments",
    description: "Quick checks that help you see what students understand.",
    icon: ClipboardCheck,
    emoji: "✅",
    color: "bg-[#7ac943]",
    soft: "bg-[#7ac943]/12",
  },
  {
    title: "Homework",
    description: "Simple practice pages that match the weekly instruction.",
    icon: Home,
    emoji: "✏️",
    color: "bg-[#ff8a3d]",
    soft: "bg-[#ff8a3d]/12",
  },
  {
    title: "Parent Letters",
    description: "Family-friendly notes ready to send home.",
    icon: Mail,
    emoji: "💌",
    color: "bg-[#ff6f91]",
    soft: "bg-[#ff6f91]/12",
  },
  {
    title: "Slides",
    description: "Presentation-ready materials for whole-group teaching.",
    icon: Presentation,
    emoji: "🌈",
    color: "bg-[#a66dd4]",
    soft: "bg-[#a66dd4]/12",
  },
  {
    title: "Favorites",
    description: "Save the resources you love and find them fast.",
    icon: Heart,
    emoji: "💛",
    color: "bg-[#f7b928]",
    soft: "bg-[#f7b928]/15",
  },
  {
    title: "Smart Search",
    description: "Search by grade, subject, week, category, or standard.",
    icon: Search,
    emoji: "🔎",
    color: "bg-[#4f8cff]",
    soft: "bg-[#4f8cff]/12",
  },
  {
  title: "AI Teaching Tools",
  description: "Create worksheets, quizzes, parent letters, and more.",
  icon: Bot,
  emoji: "✨",
  color: "bg-[#35c6c9]",
  soft: "bg-[#35c6c9]/10",
},
];

const steps = [
  {
    label: "Plan",
    emoji: "📝",
    color: "bg-[#35c6c9]",
  },
  {
    label: "Teach",
    emoji: "🍎",
    color: "bg-[#ff6f91]",
  },
  {
    label: "Assess",
    emoji: "⭐",
    color: "bg-[#f7b928]",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative overflow-hidden px-6 py-24">
      <div className="absolute left-[-6rem] top-20 -z-10 h-72 w-72 rounded-full bg-[#35c6c9]/15 blur-3xl" />
      <div className="absolute right-[-8rem] bottom-20 -z-10 h-80 w-80 rounded-full bg-[#ff6f91]/15 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-black uppercase tracking-widest text-[#ff8a3d]">
            Everything teachers need ✨
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#17223b] md:text-5xl">
            A colorful home for your CMS weekly teaching resources.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Keep lesson plans, centers, assessments, homework, parent letters,
            and classroom activities organized in one colorful K–2 workflow.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={`group relative overflow-hidden rounded-[2rem] border border-white bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/5 ${feature.soft}`}
              >
                <div className="absolute right-5 top-5 text-4xl opacity-20 transition group-hover:rotate-6 group-hover:scale-110">
                  {feature.emoji}
                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-sm ${feature.color}`}
                >
                  <Icon size={25} />
                </div>

                <h3 className="mt-6 text-2xl font-black tracking-tight text-[#17223b]">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 overflow-hidden rounded-[2rem] border border-[#f7b928]/40 bg-white p-8 shadow-2xl shadow-slate-950/5">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#fff3c4] px-4 py-2 text-sm font-black text-[#17223b]">
                <Smile size={16} className="text-[#ff8a3d]" />
                Built around real classroom weeks
              </div>

              <h3 className="mt-4 text-3xl font-black text-[#17223b]">
                Pick the week. Open what you need. Teach with confidence.
              </h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {steps.map((step) => (
                <div
                  key={step.label}
                  className="rounded-[1.5rem] border border-slate-100 bg-[#fffaf3] p-5 text-center shadow-sm"
                >
                  <div
                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${step.color}`}
                  >
                    {step.emoji}
                  </div>

                  <p className="mt-3 font-black text-[#17223b]">
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}