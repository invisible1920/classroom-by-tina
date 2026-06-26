import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#1f2a44] via-[#24365d] to-[#1f2a44]" />

      <div className="absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f5b942]/15 blur-3xl" />

      <div className="mx-auto max-w-4xl text-center text-white">
        <h2 className="text-5xl font-black leading-tight md:text-6xl">
          Ready to simplify lesson planning?
        </h2>

        <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-white/80">
          Create your account to access organized K–2 teaching resources,
          lesson plans, assessments, classroom activities, and more.
        </p>

        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-5 font-black text-[#1f2a44] transition hover:-translate-y-1 hover:bg-[#f5b942]"
          >
            Create Account
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-5 font-black text-white transition hover:bg-white/10"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}