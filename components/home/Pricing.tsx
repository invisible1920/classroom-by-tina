import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const included = [
  "K–2 lesson plans",
  "Weekly centers",
  "Assessments",
  "Homework packets",
  "Parent letters",
  "Classroom activities",
  "Slides",
  "Future AI tools",
];

export default function Pricing() {
  return (
    <section id="pricing" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-bold uppercase tracking-widest text-amber-700">
            Founding Teacher Access
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            Everything Tina creates, organized in one premium platform.
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-600">
            Join early and help shape the future of Classroom by Tina before
            full public launch.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl rounded-[2rem] border border-amber-200 bg-white p-6 shadow-2xl shadow-slate-950/10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[1.5rem] bg-slate-950 p-8 text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-4 py-2 text-sm font-black text-slate-950">
                <Sparkles size={16} />
                Early Access
              </div>

              <p className="mt-8 text-sm font-bold uppercase tracking-widest text-white/60">
                Founding Plan
              </p>

              <div className="mt-3 flex items-end gap-2">
                <p className="text-6xl font-black tracking-tight">$9</p>
                <p className="pb-2 font-bold text-white/60">/ month</p>
              </div>

              <p className="mt-5 leading-7 text-white/70">
                A low founding price while the platform grows. Perfect for
                teachers who want Tina’s resources organized and ready to use.
              </p>

              <a
                href="mailto:hello@classroombytina.com?subject=Founding Teacher Access"
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-100"
              >
                Request Early Access
                <ArrowRight size={18} />
              </a>
            </div>

            <div className="p-2 lg:p-6">
              <h3 className="text-2xl font-black tracking-tight text-slate-950">
                Included with membership
              </h3>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {included.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2
                      size={20}
                      className="shrink-0 text-emerald-600"
                    />
                    <span className="font-bold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-[1.5rem] bg-amber-50 p-6">
                <p className="text-sm font-black uppercase tracking-widest text-amber-800">
                  Built for real teachers
                </p>

                <p className="mt-3 leading-7 text-slate-700">
                  This is not a random PDF marketplace. Classroom by Tina is
                  organized around the actual weekly workflow of K–2 teachers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}