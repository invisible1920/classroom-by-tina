import {
  BookOpen,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Search,
  Star,
} from "lucide-react";

const weeklyResources = [
  "Lesson Plan",
  "Centers",
  "Assessment",
  "Homework",
  "Parent Letter",
];

export default function DashboardPreview() {
  return (
    <section id="preview" className="px-6 py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="font-bold uppercase tracking-widest text-amber-700">
            The Teacher Operating System
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            Built around the way teachers actually plan.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Teachers should not have to search through random PDFs. Everything
            is organized by grade, subject, week, and classroom workflow.
          </p>

          <div className="mt-8 grid gap-4">
            {[
              "Start with grade level",
              "Choose subject and week",
              "Open the exact resource needed",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-emerald-600" />
                <span className="font-bold text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-amber-100 bg-white p-4 shadow-2xl shadow-slate-950/10">
          <div className="rounded-[1.5rem] bg-[#f8fafc] p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                  Dashboard
                </p>
                <h3 className="mt-1 text-2xl font-black text-slate-950">
                  First Grade · ELA · Week 4
                </h3>
              </div>

              <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black text-emerald-700">
                Ready to teach
              </div>
            </div>

            <div className="relative mt-6">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <div className="rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm font-semibold text-slate-400">
                Search lessons, standards, centers...
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <PreviewStat icon={<BookOpen size={20} />} label="Resources" value="245" />
              <PreviewStat icon={<Download size={20} />} label="Downloads" value="3.4k" />
              <PreviewStat icon={<Star size={20} />} label="Featured" value="12" />
            </div>

            <div className="mt-5 rounded-[1.5rem] bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-widest text-amber-300">
                    Continue Teaching
                  </p>
                  <h4 className="mt-2 text-2xl font-black">
                    Short Vowels & Sight Words
                  </h4>
                </div>

                <Clock size={22} className="text-white/70" />
              </div>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-[70%] rounded-full bg-amber-300" />
              </div>

              <p className="mt-3 text-sm font-semibold text-white/70">
                70% of this week is ready.
              </p>
            </div>

            <div className="mt-5 grid gap-3">
              {weeklyResources.map((resource) => (
                <div
                  key={resource}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-amber-100 p-2 text-amber-800">
                      <FileText size={18} />
                    </div>
                    <span className="font-bold text-slate-800">{resource}</span>
                  </div>

                  <CheckCircle2 size={18} className="text-emerald-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-blue-600">{icon}</div>
      <p className="mt-3 text-2xl font-black text-slate-950">{value}</p>
      <p className="text-sm font-semibold text-slate-500">{label}</p>
    </div>
  );
}