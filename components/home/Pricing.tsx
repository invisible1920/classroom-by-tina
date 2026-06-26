import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

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
    <section id="pricing" className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-black uppercase tracking-widest text-amber-700">
            Simple Pricing
          </p>

          <h2 className="mt-4 text-5xl font-black tracking-tight text-[#1f2a44]">
            One subscription.
            <br />
            Everything you need.
          </h2>

          <p className="mt-6 text-xl leading-8 text-slate-600">
            No confusing tiers. No purchasing individual resources. Just one
            affordable membership for your classroom.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#1f2a44] p-10 text-white shadow-2xl md:p-12">
            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#f5b942]/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-[#3b82f6]/20 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#f5b942] px-5 py-2 text-sm font-black text-[#1f2a44]">
                  <Sparkles size={16} />
                  Pro Membership
                </div>

                <h3 className="mt-8 text-4xl font-black">
                  Pro Teacher
                </h3>

                <div className="mt-6 flex items-end gap-2">
                  <span className="text-7xl font-black">$9</span>
                  <span className="pb-3 text-lg font-bold text-white/70">
                    /month
                  </span>
                </div>

                <p className="mt-5 leading-8 text-white/80">
                  Unlock Tina&apos;s full teaching library and future
                  AI-powered planning tools.
                </p>

                <Link
                  href="/signup"
                  className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 font-black text-[#1f2a44] transition hover:bg-amber-100"
                >
                  Create Account
                  <ArrowRight size={18} />
                </Link>
              </div>

              <div className="rounded-[2rem] bg-white/10 p-6 backdrop-blur">
                <h4 className="text-xl font-black">
                  Included with Pro
                </h4>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {proPlan.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2
                        size={20}
                        className="shrink-0 text-[#f5b942]"
                      />

                      <span className="font-semibold">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-center text-sm font-bold text-slate-500">
            Create an account first. Subscription checkout will be connected
            with Stripe.
          </p>
        </div>

        <div className="mt-12 rounded-[2rem] bg-amber-50 p-8 text-center">
          <h3 className="text-2xl font-black text-[#1f2a44]">
            Every new feature is included.
          </h3>

          <p className="mt-4 text-lg text-slate-600">
            As Classroom by Tina grows, your subscription automatically includes
            new resources, AI tools, planning features, and classroom workflows.
          </p>
        </div>
      </div>
    </section>
  );
}