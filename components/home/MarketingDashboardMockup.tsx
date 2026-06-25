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
    accent: "bg-[#3b82f6]",
  },
  {
    title: "Small Group Centers",
    type: "Centers",
    accent: "bg-[#f5b942]",
  },
  {
    title: "Weekly Assessment",
    type: "Assessment",
    accent: "bg-[#22c55e]",
  },
  {
    title: "Parent Letter",
    type: "Families",
    accent: "bg-[#fb7185]",
  },
];

export default function MarketingDashboardMockup() {
  return (
    <div className="rounded-[2rem] border border-white/80 bg-white/80 p-3 shadow-2xl shadow-slate-950/15 backdrop-blur">
      <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-[#f8fafc]">
        <div className="grid min-h-[520px] lg:grid-cols-[190px_1fr]">
          <aside className="hidden border-r border-slate-200 bg-white p-5 lg:block">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#1f2a44] text-sm font-black text-white">
                T
              </div>
              <div>
                <p className="text-sm font-black text-[#1f2a44]">
                  Classroom
                </p>
                <p className="text-xs font-bold text-slate-400">by Tina</p>
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

          <div className="p-5">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[#3b82f6]">
                  First Grade Dashboard
                </p>
                <h3 className="mt-1 text-2xl font-black text-[#1f2a44]">
                  Week 4 Teaching Plan
                </h3>
              </div>

              <div className="flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-400 md:w-72">
                <Search size={16} />
                Search resources...
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <MockStat label="Ready" value="18" />
              <MockStat label="Downloads" value="342" />
              <MockStat label="Featured" value="6" />
            </div>

            <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_0.8fr]">
              <div className="rounded-[1.5rem] bg-[#1f2a44] p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-[#f5b942]">
                      Continue Teaching
                    </p>
                    <h4 className="mt-2 text-2xl font-black">
                      Short Vowels & Sight Words
                    </h4>
                  </div>

                  <div className="rounded-2xl bg-white/10 p-3">
                    <BookOpen size={22} />
                  </div>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/15">
                  <div className="h-full w-[72%] rounded-full bg-[#f5b942]" />
                </div>

                <div className="mt-4 flex items-center justify-between text-sm font-bold text-white/70">
                  <span>72% ready</span>
                  <span>12 min planning</span>
                </div>
              </div>

              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                  AI Preview
                </p>

                <h4 className="mt-2 text-xl font-black text-[#1f2a44]">
                  Generate parent letter
                </h4>

                <p className="mt-2 text-sm font-semibold leading-6 text-slate-500">
                  Turn this week’s skills into a family-friendly update.
                </p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#fb7185]/10 px-4 py-2 text-sm font-black text-[#be123c]">
                  <Sparkles size={15} />
                  Coming soon
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-black text-[#1f2a44]">
                  Weekly Resources
                </h4>

                <div className="flex items-center gap-1 text-sm font-black text-[#3b82f6]">
                  <Star size={15} />
                  Featured
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                {weeklyResources.map((resource) => (
                  <div
                    key={resource.title}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-2xl ${resource.accent}`}
                      />

                      <div>
                        <p className="font-black text-[#1f2a44]">
                          {resource.title}
                        </p>
                        <p className="text-sm font-semibold text-slate-500">
                          {resource.type}
                        </p>
                      </div>
                    </div>

                    <CheckCircle2 size={19} className="text-[#22c55e]" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <MockMiniCard icon={<FileText size={18} />} label="Lesson Plan" />
              <MockMiniCard icon={<Mail size={18} />} label="Parent Letter" />
              <MockMiniCard icon={<Sparkles size={18} />} label="AI Tools" />
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
          ? "bg-[#3b82f6]/10 text-[#3b82f6]"
          : "text-slate-500"
      }`}
    >
      {icon}
      {label}
    </div>
  );
}

function MockStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-2xl font-black text-[#1f2a44]">{value}</p>
      <p className="text-sm font-bold text-slate-500">{label}</p>
    </div>
  );
}

function MockMiniCard({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="rounded-xl bg-[#fff8f0] p-2 text-[#1f2a44]">{icon}</div>
      <p className="text-sm font-black text-[#1f2a44]">{label}</p>
    </div>
  );
}