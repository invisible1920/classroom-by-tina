import Link from "next/link";
import { ArrowRight, Heart, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-28">
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#35c6c9]/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#ff6f91]/20 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f7b928]/15 blur-3xl" />

      <div className="mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] border border-[#ffe7b5] bg-white p-6 text-center shadow-2xl shadow-slate-900/5 sm:rounded-[2.5rem] sm:p-10 md:p-16">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#fff3c4] px-4 py-2 text-xs font-black text-[#17223b] sm:px-5 sm:text-sm">
          <Sparkles size={16} className="text-[#ff8a3d]" />
          Made for amazing K–2 teachers
        </div>

        <h2 className="mt-6 text-balance text-3xl font-black leading-tight text-[#17223b] sm:mt-8 sm:text-5xl md:text-6xl">
          Spend less time planning and more time inspiring kids. 🍎
        </h2>

        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 sm:mt-8 sm:text-xl sm:leading-9">
          Discover colorful lesson plans, engaging centers, assessments,
          parent communication, classroom activities, and AI tools designed
          specifically for Kindergarten through 2nd Grade teachers.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:mt-12 sm:flex-row sm:gap-4">
          <Link
            href="/signup"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#35c6c9] px-8 py-4 font-black text-white shadow-lg shadow-[#35c6c9]/25 transition hover:-translate-y-1 hover:bg-[#2fb4b7] sm:py-5"
          >
            Start Free Today 🚀
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/login"
            className="inline-flex min-h-14 items-center justify-center rounded-full border border-[#f7b928]/40 bg-white px-8 py-4 font-black text-[#17223b] transition hover:bg-[#fff3c4] sm:py-5"
          >
            Sign In
          </Link>
        </div>

        <div className="mx-auto mt-8 grid max-w-xs grid-cols-2 gap-3 text-sm font-bold text-slate-600 sm:mt-12 sm:flex sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-5">
          <div>🍎 Teacher Created</div>
          <div>📚 K–2 Focused</div>
          <div>⭐ Classroom Tested</div>
          <div className="flex items-center justify-center gap-2">
            <Heart size={15} className="text-[#ff6f91]" fill="currentColor" />
            Built with Love
          </div>
        </div>
      </div>
    </section>
  );
}