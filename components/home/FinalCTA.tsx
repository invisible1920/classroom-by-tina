import Link from "next/link";
import { ArrowRight, Heart, Sparkles } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-28">
      {/* Background blobs */}
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#35c6c9]/20 blur-3xl" />
      <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#ff6f91]/20 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f7b928]/15 blur-3xl" />

      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-[#ffe7b5] bg-white p-10 text-center shadow-2xl shadow-slate-900/5 md:p-16">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#fff3c4] px-5 py-2 text-sm font-black text-[#17223b]">
          <Sparkles size={16} className="text-[#ff8a3d]" />
          Made for amazing K–2 teachers
        </div>

        <h2 className="mt-8 text-4xl font-black leading-tight text-[#17223b] sm:text-5xl md:text-6xl">
          Spend less time planning...
          <br />
          and more time inspiring kids. 🍎
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-slate-600">
          Discover colorful lesson plans, engaging centers, assessments,
          parent communication, classroom activities, and AI tools designed
          specifically for Kindergarten through 2nd Grade teachers.
        </p>

        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#35c6c9] px-8 py-5 font-black text-white shadow-lg shadow-[#35c6c9]/25 transition hover:-translate-y-1 hover:bg-[#2fb4b7]"
          >
            Start Free Today 🚀
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full border border-[#f7b928]/40 bg-white px-8 py-5 font-black text-[#17223b] transition hover:bg-[#fff3c4]"
          >
            Sign In
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-5 text-sm font-bold text-slate-600">
          <div className="flex items-center gap-2">
            🍎 Teacher Created
          </div>

          <div className="flex items-center gap-2">
            📚 K–2 Focused
          </div>

          <div className="flex items-center gap-2">
            ⭐ Classroom Tested
          </div>

          <div className="flex items-center gap-2">
            <Heart
              size={15}
              className="text-[#ff6f91]"
              fill="currentColor"
            />
            Built with Love
          </div>
        </div>
      </div>
    </section>
  );
}