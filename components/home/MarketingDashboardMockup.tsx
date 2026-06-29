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
  Smile,
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
    <div className="w-full overflow-hidden rounded-[2rem] border border-white bg-white/90 p-2 shadow-2xl shadow-slate-950/10 backdrop-blur sm:p-3">
      <div className="overflow-hidden rounded-[1.5rem] border border-[#ffe7b5] bg-[#fffaf3]">
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
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[#35c6c9]">
                  First Grade Dashboard ✏️
                </p>
                <h3 className="mt-1 text-xl font-black text-[#17223b] sm:text-2xl">
                  Week 4 Teaching Plan
                </h3>
              </div>

              <div className="flex w-full items-center gap-2 rounded-2xl border border-[#ffe7b5] bg-white px-4 py-3 text-sm font-semibold text-slate-400 md:w-72">
                <Search size={16} />
                Search resources...
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <MockStat label="Ready" value="18" emoji="✅" color="text-[#7ac943]" />
              <MockStat label="Downloads" value="342" emoji="📥" color="text-[#4f8cff]" />
              <MockStat label="Featured" value="6" emoji="⭐" color="text-[#f7b928]" />
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_0.8fr]">
              <div className="rounded-[1.5rem] bg-[#35c6c9] p-5 text-white shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-white/80">
                      Continue Teaching
                    </p>
                    <h4 className="mt-2 text-xl font-black sm:text-2xl">
                      Short Vowels & Sight Words
                    </h4>
                  </div>

                  <div className="rounded-2xl bg-white/20 p-3">
                    <BookOpen size={22} />
                  </div>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/25">
                  <div className="h-full w-[72%] rounded-full bg-[#f7b928]" />
                </div>

                <div className="mt-4 flex items-center justify-between text-sm font-bold text-white/85">
                  <span>72% ready</span>
                  <span>12 min planning</span>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-[#ffd6df] bg-white p-5">
                <p className="text-xs font-black uppercase tracking-widest text-[#ff6f91]">
                  AI Preview ✨
                </p>

                <h4 className="mt-2 text-xl font-black text-[#17223b]">
                  Generate parent letter
                </h4>

                <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                  Turn this week’s skills into a sweet family-friendly update.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#ff6f91]/10 px-4 py-2 text-sm font-black text-[#ff6f91]">
  <Sparkles size={15} />
  AI Tool
</div>
              </div>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-[#ffe7b5] bg-white p-5">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-lg font-black text-[#17223b]">
                  Weekly Resources
                </h4>

                <div className="flex items-center gap-1 rounded-full bg-[#fff3c4] px-3 py-1 text-sm font-black text-[#17223b]">
                  <Star size={15} fill="currentColor" className="text-[#f7b928]" />
                  Featured
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                {weeklyResources.map((resource) => (
                  <div
                    key={resource.title}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-[#fffaf3] p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-2xl text-lg ${resource.accent}`}
                      >
                        {resource.emoji}
                      </div>

                      <div>
                        <p className="font-black text-[#17223b]">
                          {resource.title}
                        </p>
                        <p className="text-sm font-semibold text-slate-500">
                          {resource.type}
                        </p>
                      </div>
                    </div>

                    <CheckCircle2 size={19} className="text-[#7ac943]" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <MockMiniCard icon={<FileText size={18} />} label="Lesson Plan" emoji="📄" />
              <MockMiniCard icon={<Mail size={18} />} label="Parent Letter" emoji="💌" />
              <MockMiniCard icon={<Sparkles size={18} />} label="AI Tools" emoji="✨" />
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
        active
          ? "bg-[#35c6c9]/12 text-[#35c6c9]"
          : "text-slate-500"
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
    <div className="rounded-2xl border border-[#ffe7b5] bg-white p-4">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-black text-[#17223b]">{value}</p>
        <span className={`text-xl ${color}`}>{emoji}</span>
      </div>
      <p className="text-sm font-bold text-slate-500">{label}</p>
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
    <div className="flex items-center gap-3 rounded-2xl border border-[#ffe7b5] bg-white p-4">
      <div className="rounded-xl bg-[#fff3c4] p-2 text-[#17223b]">{icon}</div>
      <div>
        <p className="text-sm font-black text-[#17223b]">{label}</p>
        <p className="text-xs font-bold text-slate-400">{emoji}</p>
      </div>
    </div>
  );
}