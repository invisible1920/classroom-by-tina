import Link from "next/link";
import { ArrowRight, CheckCircle2, Heart, Sparkles, Star } from "lucide-react";

const proPlan = [
  "Unlimited downloads",
  "Complete K–2 resource library",
  "Lesson plans",
  "Centers",
  "Assessments",
  "Homework",
  "Parent letters",
  "Presentation slides",
  "Favorites & Library",
  "AI teaching tools",
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-28">
      <div className="absolute left-[-8rem] top-16 -z-10 h-72 w-72 rounded-full bg-[#f7b928]/20 blur-3xl" />
      <div className="absolute right-[-8rem] bottom-16 -z-10 h-80 w-80 rounded-full bg-[#35c6c9]/20 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-black uppercase tracking-widest text-[#ff8a3d] sm:text-base">
            Simple Pricing 💛
          </p>

          <h2 className="mt-3 text-balance text-3xl font-black tracking-tight text-[#17223b] sm:mt-4 sm:text-5xl">
            One simple membership.
            <br className="hidden sm:block" />
            Everything for your CMS classroom.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:mt-6 sm:text-xl sm:leading-8">
            No confusing tiers. No buying one worksheet at a time. Just one
            simple membership for K–2 teachers.
          </p>
        </div>

        <div className="mx-auto mt-9 max-w-5xl sm:mt-16">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-[#ffe7b5] bg-white p-4 shadow-2xl shadow-slate-950/5 sm:rounded-[2.5rem] sm:p-6 md:p-8">
            <div className="absolute right-6 top-6 text-6xl opacity-10">🍎</div>
            <div className="absolute bottom-6 left-6 text-6xl opacity-10">📚</div>

            <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch lg:gap-8">
              <div className="rounded-[1.5rem] bg-[#35c6c9] p-6 text-center text-white shadow-lg shadow-[#35c6c9]/20 sm:rounded-[2rem] sm:p-8 sm:text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#17223b] sm:px-5 sm:text-sm">
                  <Sparkles size={16} className="text-[#f7b928]" />
                  Pro Teacher
                </div>

                <h3 className="mt-6 text-3xl font-black sm:mt-8 sm:text-4xl">
                  Classroom Pass
                </h3>

                <div className="mt-5 flex items-end justify-center gap-2 sm:mt-6 sm:justify-start">
                  <span className="text-5xl font-black sm:text-7xl">
                    $14.99
                  </span>
                  <span className="pb-2 text-base font-bold text-white/80 sm:pb-3 sm:text-lg">
                    /month
                  </span>
                </div>

                <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-white/90 sm:mx-0 sm:mt-5 sm:text-base sm:leading-8">
                  Unlock Tina&apos;s full K–2 teaching library, classroom-ready
                  resources, favorites, downloads, and AI planning tools.
                </p>

                <Link
                  href="/signup"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 font-black text-[#17223b] transition hover:-translate-y-0.5 hover:bg-[#fff3c4] sm:mt-10"
                >
                  Create Account 🚀
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="rounded-[1.5rem] border border-[#ffe7b5] bg-[#fffaf3] p-5 sm:rounded-[2rem] sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f7b928] text-xl sm:h-12 sm:w-12 sm:text-2xl">
                    ⭐
                  </div>

                  <div>
                    <h4 className="text-xl font-black text-[#17223b] sm:text-2xl">
                      Included with Pro
                    </h4>
                    <p className="mt-1 text-sm font-semibold text-slate-500 sm:text-base">
                      Everything a busy K–2 teacher needs.
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-2 sm:mt-7 sm:grid-cols-2 sm:gap-3">
                  {proPlan.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"
                    >
                      <CheckCircle2
                        size={19}
                        className={[
                          "shrink-0",
                          index % 4 === 0
                            ? "text-[#35c6c9]"
                            : index % 4 === 1
                              ? "text-[#ff6f91]"
                              : index % 4 === 2
                                ? "text-[#7ac943]"
                                : "text-[#f7b928]",
                        ].join(" ")}
                      />

                      <span className="text-sm font-bold text-slate-700 sm:text-base">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-[1.5rem] bg-white p-4 sm:mt-7 sm:p-5">
                  <div className="flex items-center justify-center gap-2 text-[#f7b928] sm:justify-start">
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                  </div>

                  <p className="mt-3 text-center text-sm font-black leading-6 text-[#17223b] sm:text-left sm:text-base">
                    Built for teachers who want cute, organized, ready-to-use
                    resources without extra planning stress.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-xs font-bold text-slate-500 sm:mt-6 sm:text-sm">
            Secure checkout powered by Stripe. Cancel anytime.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-4xl rounded-[1.75rem] border border-[#ffd6df] bg-[#ff6f91]/10 p-6 text-center sm:mt-12 sm:rounded-[2rem] sm:p-8">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ff6f91] text-white sm:h-12 sm:w-12">
            <Heart size={22} fill="currentColor" />
          </div>

          <h3 className="mt-4 text-xl font-black text-[#17223b] sm:mt-5 sm:text-2xl">
            Every new feature is included.
          </h3>

          <p className="mt-3 text-base leading-7 text-slate-600 sm:mt-4 sm:text-lg">
            As Classroom by Tina grows, your membership automatically includes
            new resources, AI tools, planning features, and classroom workflows.
          </p>
        </div>
      </div>
    </section>
  );
}