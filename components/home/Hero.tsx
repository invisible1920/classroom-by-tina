import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import ClassroomIllustration from "./ClassroomIllustration";

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-20">
  <div className="absolute left-1/2 top-20 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-amber-200/30 blur-3xl" />

  <ClassroomIllustration />

  <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/70 px-4 py-2 text-sm font-bold text-amber-800 shadow-sm backdrop-blur">
            <Sparkles size={16} />
            Built by a real First Grade teacher
          </div>

          <h1 className="mt-8 max-w-5xl text-5xl font-black leading-[0.95] tracking-tight text-slate-950 md:text-7xl">
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
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-7 py-4 font-bold text-white shadow-xl shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Become a Founding Teacher
              <ArrowRight size={18} />
            </a>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-4 font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300"
            >
              Preview Dashboard
            </Link>
          </div>

          <div className="mt-8 grid gap-3 text-sm font-semibold text-slate-700 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-emerald-600" />
              K–2 focused
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-emerald-600" />
              Built by Tina
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-emerald-600" />
              Weekly workflow
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-[2rem] border border-amber-100 bg-white p-5 shadow-2xl shadow-slate-950/10">
            <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white">
              <div className="flex items-center justify-between">
                <p className="font-bold">First Grade · Week 4</p>
                <span className="rounded-full bg-amber-300 px-3 py-1 text-xs font-black text-slate-950">
                  Ready
                </span>
              </div>

              <div className="mt-6 grid gap-3">
                {[
                  "ELA Lesson Plan",
                  "Small Group Centers",
                  "Weekly Assessment",
                  "Homework Packet",
                  "Parent Letter",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl bg-white/10 p-4"
                  >
                    <span className="font-semibold">{item}</span>
                    <CheckCircle2 size={18} className="text-emerald-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 hidden rounded-3xl border border-amber-100 bg-white p-5 shadow-xl md:block">
            <p className="text-3xl font-black text-slate-950">12 min</p>
            <p className="mt-1 text-sm font-semibold text-slate-500">
              weekly planning time
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}