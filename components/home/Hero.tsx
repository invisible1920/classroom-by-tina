import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, Star } from "lucide-react";

import ClassroomIllustration from "./ClassroomIllustration";
import MarketingDashboardMockup from "./MarketingDashboardMockup";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20">
      <div className="absolute left-1/2 top-12 -z-10 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-[#f5b942]/30 blur-3xl" />

      <ClassroomIllustration />

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#f5b942]/50 bg-white/80 px-4 py-2 text-sm font-black text-[#1f2a44] shadow-sm backdrop-blur">
            <Sparkles size={16} className="text-[#f5b942]" />
            Built by a real First Grade teacher
          </div>

          <h1 className="mt-8 max-w-5xl text-4xl font-black leading-tight tracking-tight text-[#1f2a44] sm:text-5xl lg:text-7xl">
            Create better lessons.
            <br />
            Save hours every week.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
            Classroom by Tina gives K–2 teachers organized lesson plans,
            centers, assessments, homework, parent letters, classroom
            activities, and soon AI-powered teaching tools.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1f2a44] px-7 py-4 font-black text-white shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Start free
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 font-black text-[#1f2a44] shadow-sm transition hover:-translate-y-0.5 hover:border-[#f5b942]"
            >
              Sign in
            </Link>
          </div>

          <div className="mt-8 grid gap-3 text-sm font-bold text-slate-700 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-[#22c55e]" />
              K–2 focused
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-[#22c55e]" />
              Weekly workflow
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-[#22c55e]" />
              Teacher-made
            </div>
          </div>

          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-white/75 p-4 shadow-sm">
            <div className="flex text-[#f5b942]">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </div>

            <p className="text-sm font-black text-[#1f2a44]">
              Designed for tired teachers who still want excellent lessons.
            </p>
          </div>
        </div>

        <div className="relative">
          <MarketingDashboardMockup />
        </div>
      </div>
    </section>
  );
}