import {
  BookOpen,
  CalendarDays,
  CheckCircle2,
  FileText,
  FolderOpen,
  Home,
  Mail,
  Search,
  Sparkles,
  Star,
} from "lucide-react";

const weeklyResources = [
  {
    title: "ELA Lesson Plan",
    type: "Lesson",
    emoji: "📚",
    accent: "bg-[#35c6c9]",
  },
  {
    title: "Small Group Centers",
    type: "Centers",
    emoji: "🧩",
    accent: "bg-[#f7b928]",
  },
  {
    title: "Weekly Assessment",
    type: "Assessment",
    emoji: "⭐",
    accent: "bg-[#7ac943]",
  },
  {
    title: "Parent Letter",
    type: "Families",
    emoji: "💌",
    accent: "bg-[#ff6f91]",
  },
];

export default function MarketingDashboardMockup() {
  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-[1.75rem] border border-white bg-white/90 p-2 shadow-2xl shadow-slate-950/10 backdrop-blur sm:max-w-none sm:rounded-[2rem] sm:p-3">
      <div className="overflow-hidden rounded-[1.35rem] border border-[#ffe7b5] bg-[#fffaf3] sm:rounded-[1.5rem]">
        <div className="grid lg:min-h-[520px] lg:grid-cols-[190px_1fr]">
          <aside className="hidden border-r border-[#ffe7b5] bg-white p-5 lg:block">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#35c6c9] text-lg shadow-sm">
                🍎
              </div>

              <div>
                <p className="text-sm font-black text-[#17223b]">Classroom</p>
                <p className="text-xs font-bold text-[#ff6f91]">by Tina</p>
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <MockNavItem active icon={<Home size={16} />} label="Dashboard" />
              <MockNavItem icon={<BookOpen size={16} />} label="Resources" />
              <MockNavItem icon={<FolderOpen size={16} />} label="Library" />
              <MockNavItem icon={<CalendarDays size={16} />} label="Planner" />
              <MockNavItem icon={<Sparkles size={16} />} label="AI Tools" />
            </div>
          </aside>

          <div className="p-3 sm:p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#35c6c9] sm:text-xs">
                  First Grade Dashboard ✏️
                </p>
                <h3 className="mt-1 text-lg font-black leading-tight text-[#17223b] sm:text-2xl">
                  Week 4 Teaching Plan
                </h3>
              </div>

              <div className="flex w-full items-center gap-2 rounded-2xl border border-[#ffe7b5] bg-white px-3 py-2.5 text-xs font-semibold text-slate-400 sm:px-4 sm:py-3 sm:text-sm md:w-72">
                <Search size={15} />
                Search resources...
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3">
              <MockStat label="Ready" value="18" emoji="✅" color="text-[#7ac943]" />
              <MockStat label="Downloads" value="342" emoji="📥" color="text-[#4f8cff]" />
              <MockStat label="Featured" value="6" emoji="⭐" color="text-[#f7b928]" />
            </div>

            <div className="mt-4 grid gap-3 sm:mt-5 sm:gap-5 xl:grid-cols-[1fr_0.8fr]">
              <div className="rounded-[1.35rem] bg-[#35c6c9] p-4 text-white shadow-sm sm:rounded-[1.5rem] sm:p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/80 sm:text-xs">
                      Continue Teaching
                    </p>
                    <h4 className="mt-2 text-lg font-black leading-tight sm:text-2xl">
                      Short Vowels
                    </h4>
                  </div>

                  <div className="rounded-2xl bg-white/20 p-2.5 sm:p-3">
                    <BookOpen size={20} />
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/25 sm:mt-5">
                  <div className="h-full w-[72%] rounded-full bg-[#f7b928]" />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs font-bold text-white/85 sm:mt-4 sm:text-sm">
                  <span>72% ready</span>
                  <span>Open week</span>
                </div>
              </div>

              <div className="rounded-[1.35rem] border border-[#ffd6df] bg-white p-4 sm:rounded-[1.5rem] sm:p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#ff6f91] sm:text-xs">
                  Helper Tool ✨
                </p>

                <h4 className="mt-2 text-lg font-black leading-tight text-[#17223b] sm:text-xl">
                  Parent letter
                </h4>

                <p className="mt-2 text-xs font-semibold leading-5 text-slate-500 sm:text-sm sm:leading-6">
                  Turn this week’s skills into a family-friendly update.
                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#ff6f91]/10 px-3 py-2 text-xs font-black text-[#ff6f91] sm:mt-5 sm:px-4 sm:text-sm">
                  <Sparkles size={14} />
                  AI Tool
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-[1.35rem] border border-[#ffe7b5] bg-white p-4 sm:mt-5 sm:rounded-[1.5rem] sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <h4 className="text-base font-black text-[#17223b] sm:text-lg">
                  Weekly Resources
                </h4>

                <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#fff3c4] px-2.5 py-1 text-xs font-black text-[#17223b] sm:px-3 sm:text-sm">
                  <Star size={14} fill="currentColor" className="text-[#f7b928]" />
                  Featured
                </div>
              </div>

              <div className="mt-3 grid gap-2 sm:mt-4 sm:gap-3">
                {weeklyResources.map((resource) => (
                  <div
                    key={resource.title}
                    className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-[#fffaf3] p-3 sm:p-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl text-base sm:h-10 sm:w-10 sm:text-lg ${resource.accent}`}
                      >
                        {resource.emoji}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-black text-[#17223b] sm:text-base">
                          {resource.title}
                        </p>
                        <p className="text-xs font-semibold text-slate-500 sm:text-sm">
                          {resource.type}
                        </p>
                      </div>
                    </div>

                    <CheckCircle2 size={18} className="shrink-0 text-[#7ac943]" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-2 sm:mt-5 sm:grid-cols-3 sm:gap-3">
              <MockMiniCard icon={<FileText size={17} />} label="Lesson Plan" emoji="📄" />
              <MockMiniCard icon={<Mail size={17} />} label="Parent Letter" emoji="💌" />
              <MockMiniCard icon={<Sparkles size={17} />} label="AI Tools" emoji="✨" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockNavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold ${
        active ? "bg-[#35c6c9]/12 text-[#35c6c9]" : "text-slate-500"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

function MockStat({
  label,
  value,
  emoji,
  color,
}: {
  label: string;
  value: string;
  emoji: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-[#ffe7b5] bg-white p-3 sm:p-4">
      <div className="flex items-center justify-between gap-1">
        <p className="text-lg font-black text-[#17223b] sm:text-2xl">{value}</p>
        <span className={`text-base sm:text-xl ${color}`}>{emoji}</span>
      </div>
      <p className="mt-0.5 truncate text-[11px] font-bold text-slate-500 sm:text-sm">
        {label}
      </p>
    </div>
  );
}

function MockMiniCard({
  icon,
  label,
  emoji,
}: {
  icon: React.ReactNode;
  label: string;
  emoji: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#ffe7b5] bg-white p-3 sm:p-4">
      <div className="rounded-xl bg-[#fff3c4] p-2 text-[#17223b]">{icon}</div>
      <div className="min-w-0">
        <p className="truncate text-sm font-black text-[#17223b]">{label}</p>
        <p className="text-xs font-bold text-slate-400">{emoji}</p>
      </div>
    </div>
  );
}