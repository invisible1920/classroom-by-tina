import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Lock, Sparkles } from "lucide-react";

import LessonPlannerClient from "./LessonPlannerClient";
import { createClient } from "@/utils/supabase/server";

export default async function AILessonPlannerPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, subscription_status")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    redirect("/signup");
  }

  const isPro =
    profile.role === "admin" || profile.subscription_status === "pro";

  if (!isPro) {
    return (
      <main>
        <Link
          href="/dashboard/ai"
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#35c6c9] shadow-sm transition hover:-translate-x-1"
        >
          <ArrowLeft size={16} />
          Back to AI Tools
        </Link>

        <section className="mt-8 rounded-[2rem] border border-[#ffe7b5] bg-white p-8 text-center shadow-[0_18px_50px_rgba(23,34,59,0.08)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#f7efff] text-[#8a4fba]">
            <Lock size={28} />
          </div>

          <p className="mt-6 text-sm font-black uppercase tracking-widest text-[#ff8a3d]">
            Pro Membership Required
          </p>

          <h1 className="mt-3 text-4xl font-black text-[#17223b]">
            Unlock the AI Lesson Planner
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-lg font-semibold leading-8 text-slate-600">
            Create polished CMS K–2 lesson plans with learning objectives,
            materials, teacher steps, student practice, differentiation, and
            teacher notes.
          </p>

          <div className="mx-auto mt-8 grid max-w-2xl gap-3 text-left sm:grid-cols-2">
            {[
              "CMS K–2 lesson support",
              "Teacher-ready lesson structure",
              "Differentiation ideas",
              "Copy and download outputs",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-[#fffaf3] px-4 py-3 font-bold text-slate-700"
              >
                <Sparkles size={16} className="mr-2 inline text-[#35c6c9]" />
                {item}
              </div>
            ))}
          </div>

          <Link
            href="/subscribe?reason=ai"
            className="mt-8 inline-flex rounded-full bg-[#35c6c9] px-8 py-4 font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#2fb4b7]"
          >
            Upgrade to Pro
          </Link>
        </section>
      </main>
    );
  }

  return <LessonPlannerClient />;
}