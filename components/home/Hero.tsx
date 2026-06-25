import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

import ClassroomIllustration from "./ClassroomIllustration";
import MarketingDashboardMockup from "./MarketingDashboardMockup";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20">
      <div className="absolute left-1/2 top-20 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[#f5b942]/30 blur-3xl" />

      <ClassroomIllustration />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f5b942]/40 bg-white/70 px-4 py-2 text-sm font-bold text-[#1f2a44] shadow-sm backdrop-blur">
            <Sparkles size={16} className="text-[#f5b942]" />
            Built by a real First Grade teacher
          </div>

          <h1 className="mt-8 max-w-5xl text-5xl font-black leading-[0.95] tracking-tight text-[#1f2a44] md:text-7xl">
            Your classroom week, already planned.
          </h1>

          <p className="mt-7 max-w-2xl text-xl leading-8 text-slate-600">
            A premium K–2 teaching platform for lesson plans, centers,
            assessments, homework, parent letters, and classroom activities —
            organized the way teachers actually teach.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#pricing"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1f2a44] px-7 py-4 font-bold text-white shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Become a Founding Teacher
              <ArrowRight size={18} />
            </a>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 font-bold text-[#1f2a44] shadow-sm transition hover:-translate-y-0.5 hover:border-[#f5b942]"
            >
              Preview Dashboard
            </Link>
          </div>

          <div className="mt-8 grid gap-3 text-sm font-semibold text-slate-700 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-[#22c55e]" />
              K–2 focused
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-[#22c55e]" />
              Built by Tina
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-[#22c55e]" />
              Weekly workflow
            </div>
          </div>
        </div>

        <div className="relative">
          <MarketingDashboardMockup />
        </div>
      </div>
    </section>
  );
}