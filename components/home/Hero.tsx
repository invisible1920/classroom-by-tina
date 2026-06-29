import Link from "next/link";
import { ArrowRight, CheckCircle2, Heart, Sparkles, Star } from "lucide-react";

import ClassroomIllustration from "./ClassroomIllustration";
import MarketingDashboardMockup from "./MarketingDashboardMockup";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-14 pt-8 sm:px-6 sm:pb-24 sm:pt-18">
      <div className="absolute left-[-6rem] top-20 -z-10 h-72 w-72 rounded-full bg-[#35c6c9]/25 blur-3xl" />
      <div className="absolute right-[-8rem] top-8 -z-10 h-80 w-80 rounded-full bg-[#ff6f91]/20 blur-3xl" />
      <div className="absolute bottom-10 left-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-[#f7b928]/25 blur-3xl" />

      <ClassroomIllustration />

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="text-center lg:text-left">
          <div className="mx-auto inline-flex max-w-full items-center gap-2 rounded-full border border-[#f7b928]/60 bg-white px-3 py-2 text-xs font-black text-[#17223b] shadow-sm sm:px-4 sm:text-sm lg:mx-0">
            <Sparkles size={15} className="shrink-0 text-[#f7b928]" />
            <span className="truncate">Built for CMS K–2 Teachers 🍎</span>
          </div>

          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-black leading-[1.05] tracking-tight text-[#17223b] sm:mt-8 sm:text-5xl lg:mx-0 lg:max-w-5xl lg:text-7xl">
            Teaching resources for CMS K–2 classrooms.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 sm:mt-7 sm:text-xl sm:leading-8 lg:mx-0">
            Find lesson plans, centers, assessments, homework, parent letters,
            and classroom activities created for Charlotte-Mecklenburg K–2 teachers.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start">
            <Link
              href="/signup"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#35c6c9] px-7 py-4 font-black text-white shadow-xl shadow-[#35c6c9]/25 transition hover:-translate-y-0.5 hover:bg-[#2fb4b7]"
            >
              Start Planning 🚀
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/login"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#f7b928]/50 bg-white px-7 py-4 font-black text-[#17223b] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#fff3c4]"
            >
              Sign in
            </Link>
          </div>

          <div className="mx-auto mt-6 grid max-w-sm gap-2 text-sm font-bold text-slate-700 sm:mt-8 sm:max-w-none sm:grid-cols-3 lg:mx-0">
            <HeroPill color="text-[#7ac943]" label="K–2 focused" />
            <HeroPill color="text-[#ff6f91]" label="Teacher-made" />
            <HeroPill color="text-[#a66dd4]" label="Ready to use" />
          </div>

          <div className="mx-auto mt-6 flex max-w-xl flex-col items-center gap-3 rounded-[1.5rem] border border-[#f7b928]/40 bg-white/85 p-4 text-center shadow-sm sm:mt-8 sm:flex-row sm:text-left lg:mx-0">
            <div className="flex shrink-0 text-[#f7b928]">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </div>

            <p className="text-sm font-black leading-6 text-[#17223b]">
              Cute, organized, classroom-ready materials.{" "}
              <Heart size={15} className="inline text-[#ff6f91]" fill="currentColor" />
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

function HeroPill({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-full bg-white px-4 py-3 shadow-sm sm:justify-start">
      <CheckCircle2 size={17} className={color} />
      {label}
    </div>
  );
}