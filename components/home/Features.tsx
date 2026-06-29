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
    <section id="features" className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-24">
      <div className="absolute left-[-6rem] top-20 -z-10 h-72 w-72 rounded-full bg-[#35c6c9]/15 blur-3xl" />
      <div className="absolute right-[-8rem] bottom-20 -z-10 h-80 w-80 rounded-full bg-[#ff6f91]/15 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-widest text-[#ff8a3d] sm:text-base">
            Everything teachers need ✨
          </p>

          <h2 className="mt-3 text-balance text-3xl font-black tracking-tight text-[#17223b] sm:mt-4 sm:text-4xl md:text-5xl">
            A colorful home for your CMS weekly teaching resources.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:mt-5 sm:text-lg sm:leading-8">
            Keep lesson plans, centers, assessments, homework, parent letters,
            and classroom activities organized in one colorful K–2 workflow.
          </p>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={`group relative overflow-hidden rounded-[1.5rem] border border-white bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/5 sm:rounded-[2rem] sm:p-7 ${feature.soft}`}
              >
                <div className="absolute right-4 top-4 text-3xl opacity-20 transition group-hover:rotate-6 group-hover:scale-110 sm:right-5 sm:top-5 sm:text-4xl">
                  {feature.emoji}
                </div>

                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-sm sm:h-14 sm:w-14 ${feature.color}`}
                >
                  <Icon size={21} className="sm:h-[25px] sm:w-[25px]" />
                </div>

                <h3 className="mt-4 text-lg font-black tracking-tight text-[#17223b] sm:mt-6 sm:text-2xl">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-9 overflow-hidden rounded-[1.75rem] border border-[#f7b928]/40 bg-white p-5 shadow-2xl shadow-slate-950/5 sm:mt-14 sm:rounded-[2rem] sm:p-8">
          <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-8">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#fff3c4] px-4 py-2 text-xs font-black text-[#17223b] sm:text-sm">
                <Smile size={16} className="text-[#ff8a3d]" />
                Built around real classroom weeks
              </div>

              <h3 className="mt-4 text-balance text-2xl font-black leading-tight text-[#17223b] sm:text-3xl">
                Pick the week. Open what you need. Teach with confidence.
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {steps.map((step) => (
                <div
                  key={step.label}
                  className="rounded-[1.25rem] border border-slate-100 bg-[#fffaf3] p-3 text-center shadow-sm sm:rounded-[1.5rem] sm:p-5"
                >
                  <div
                    className={`mx-auto flex h-10 w-10 items-center justify-center rounded-2xl text-xl sm:h-12 sm:w-12 sm:text-2xl ${step.color}`}
                  >
                    {step.emoji}
                  </div>

                  <p className="mt-2 text-sm font-black text-[#17223b] sm:mt-3 sm:text-base">
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