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
  "AI tools coming soon",
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden px-6 py-28">
      <div className="absolute left-[-8rem] top-16 -z-10 h-72 w-72 rounded-full bg-[#f7b928]/20 blur-3xl" />
      <div className="absolute right-[-8rem] bottom-16 -z-10 h-80 w-80 rounded-full bg-[#35c6c9]/20 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-black uppercase tracking-widest text-[#ff8a3d]">
            Simple Pricing 💛
          </p>

          <h2 className="mt-4 text-4xl font-black tracking-tight text-[#17223b] sm:text-5xl">
            One simple membership.
            <br />
            Everything for your CMS classroom.
          </h2>

          <p className="mt-6 text-xl leading-8 text-slate-600">
            No confusing tiers. No buying one worksheet at a time. Just one
            simple membership for K–2 teachers.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[#ffe7b5] bg-white p-6 shadow-2xl shadow-slate-950/5 md:p-8">
            <div className="absolute right-6 top-6 text-6xl opacity-10">🍎</div>
            <div className="absolute bottom-6 left-6 text-6xl opacity-10">📚</div>

            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-stretch">
              <div className="rounded-[2rem] bg-[#35c6c9] p-8 text-white shadow-lg shadow-[#35c6c9]/20">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-black text-[#17223b]">
                  <Sparkles size={16} className="text-[#f7b928]" />
                  Pro Teacher
                </div>

                <h3 className="mt-8 text-4xl font-black">
                  Classroom Pass
                </h3>

                <div className="mt-6 flex items-end gap-2">
                  <span className="text-6xl font-black sm:text-7xl">
                    $14.99
                  </span>
                  <span className="pb-3 text-lg font-bold text-white/80">
                    /month
                  </span>
                </div>

                <p className="mt-5 leading-8 text-white/90">
                  Unlock Tina&apos;s full K–2 teaching library, classroom-ready
                  resources, favorites, downloads, and future AI planning tools.
                </p>

                <Link
                  href="/signup"
                  className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 font-black text-[#17223b] transition hover:-translate-y-0.5 hover:bg-[#fff3c4]"
                >
                  Create Account 🚀
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="rounded-[2rem] border border-[#ffe7b5] bg-[#fffaf3] p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7b928] text-2xl">
                    ⭐
                  </div>

                  <div>
                    <h4 className="text-2xl font-black text-[#17223b]">
                      Included with Pro
                    </h4>
                    <p className="mt-1 font-semibold text-slate-500">
                      Everything a busy K–2 teacher needs.
                    </p>
                  </div>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {proPlan.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm"
                    >
                      <CheckCircle2
                        size={20}
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

                      <span className="font-bold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 rounded-[1.5rem] bg-white p-5">
                  <div className="flex items-center gap-2 text-[#f7b928]">
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                    <Star size={18} fill="currentColor" />
                  </div>

                  <p className="mt-3 font-black text-[#17223b]">
                    Built for teachers who want cute, organized, ready-to-use
                    resources without extra planning stress.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm font-bold text-slate-500">
            Secure checkout powered by Stripe. Cancel anytime.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl rounded-[2rem] border border-[#ffd6df] bg-[#ff6f91]/10 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#ff6f91] text-white">
            <Heart size={22} fill="currentColor" />
          </div>

          <h3 className="mt-5 text-2xl font-black text-[#17223b]">
            Every new feature is included.
          </h3>

          <p className="mt-4 text-lg text-slate-600">
            As Classroom by Tina grows, your membership automatically includes
            new resources, AI tools, planning features, and classroom workflows.
          </p>
        </div>
      </div>
    </section>
  );
}