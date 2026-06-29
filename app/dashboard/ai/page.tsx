import Link from "next/link";
import { ArrowRight, Clock, Sparkles, Zap } from "lucide-react";

import { createClient } from "@/utils/supabase/server";

const MONTHLY_CREDIT_LIMIT = 250;

const aiTools = [
  {
    emoji: "✨",
    title: "Lesson Planner",
    description:
      "Create CMS-aligned K–2 lesson plans with objectives, steps, and teacher notes.",
    href: "/dashboard/ai/lesson-planner",
    bg: "bg-[#f7efff]",
    label: "AI Planning",
  },
  {
    emoji: "🧩",
    title: "Activity Generator",
    description:
      "Turn a skill into centers, small group work, practice, or review.",
    href: "/dashboard/ai/activity-generator",
    bg: "bg-[#fff0f4]",
    label: "AI Teaching Tools",
  },
  {
    emoji: "💌",
    title: "Parent Letter Helper",
    description:
      "Draft warm CMS family communication in a polished teacher voice.",
    href: "/dashboard/ai/parent-letter",
    bg: "bg-[#fff7db]",
    label: "AI Communication",
  },
];

const promptIdeas = [
  "📖 Guided reading questions",
  "🎯 Exit ticket",
  "🔤 Phonics practice",
  "➗ Math review",
];

function getMonthStartISO() {
  const now = new Date();

  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)
  ).toISOString();
}

function getNextMonthLabel() {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  return nextMonth.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

async function getAIUsage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      creditLimit: MONTHLY_CREDIT_LIMIT,
      creditsUsed: 0,
      creditsRemaining: MONTHLY_CREDIT_LIMIT,
      percentUsed: 0,
      resetLabel: getNextMonthLabel(),
    };
  }

  const { data, error } = await supabase
    .from("user_ai_usage")
    .select("credit_limit, credits_used")
    .eq("user_id", user.id)
    .gte("period_start", getMonthStartISO())
    .maybeSingle();

  if (error) {
    console.error("get ai usage error:", error);
  }

  const creditLimit = Number(data?.credit_limit || MONTHLY_CREDIT_LIMIT);
  const creditsUsed = Number(data?.credits_used || 0);
  const creditsRemaining = Math.max(creditLimit - creditsUsed, 0);
  const percentUsed =
    creditLimit > 0 ? Math.min(Math.round((creditsUsed / creditLimit) * 100), 100) : 0;

  return {
    creditLimit,
    creditsUsed,
    creditsRemaining,
    percentUsed,
    resetLabel: getNextMonthLabel(),
  };
}

export default async function AIToolsPage() {
  const usage = await getAIUsage();

  return (
    <main className="pb-12">
      <section className="rounded-[2.25rem] bg-white p-8 shadow-[0_18px_50px_rgba(23,34,59,0.08)] md:p-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#f7efff] px-4 py-2 text-sm font-black text-[#8a4fba]">
          <Sparkles size={16} />
          AI Teaching Assistant
        </div>

        <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-[#17223b] md:text-5xl">
          Create classroom-ready materials faster.
        </h1>

        <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-slate-600">
          Built for Charlotte-Mecklenburg K–2 teachers who need lesson plans,
          activities, and family communication without starting from a blank
          page.
        </p>
      </section>

      <section className="mt-8 rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(23,34,59,0.08)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-[#e8fbfb] text-[#35aeb1] shadow-sm">
              <Zap size={28} />
            </div>

            <div>
              <div className="inline-flex rounded-full bg-[#e8fbfb] px-3 py-1 text-xs font-black text-[#35aeb1]">
                AI Credits
              </div>

              <h2 className="mt-3 text-2xl font-black text-[#17223b]">
                {usage.creditsRemaining} credits remaining
              </h2>

              <p className="mt-2 text-sm font-semibold text-slate-600">
                {usage.creditsUsed} of {usage.creditLimit} AI credits used this
                month. Resets {usage.resetLabel}.
              </p>
            </div>
          </div>

          <div className="w-full lg:max-w-sm">
            <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest text-slate-500">
              <span>Used</span>
              <span>{usage.percentUsed}%</span>
            </div>

            <div className="mt-3 h-4 overflow-hidden rounded-full bg-[#fffaf3] shadow-inner">
              <div
                className="h-full rounded-full bg-[#35c6c9]"
                style={{ width: `${usage.percentUsed}%` }}
              />
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-black text-[#17223b]">
              <div className="rounded-2xl bg-[#f7efff] px-3 py-2">
                Lesson: 10
              </div>
              <div className="rounded-2xl bg-[#fff0f4] px-3 py-2">
                Activity: 6
              </div>
              <div className="rounded-2xl bg-[#fff7db] px-3 py-2">
                Letter: 3
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <Link
          href="/dashboard/ai/history"
          className="group flex items-center justify-between rounded-[2rem] bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#e8fbfb] text-[#35aeb1] shadow-sm">
              <Clock size={28} />
            </div>

            <div>
              <div className="inline-flex rounded-full bg-[#e8fbfb] px-3 py-1 text-xs font-black text-[#35aeb1]">
                AI History
              </div>

              <h2 className="mt-3 text-2xl font-black text-[#17223b]">
                View Your Saved AI Generations
              </h2>

              <p className="mt-2 text-sm font-semibold text-slate-600">
                Every lesson plan, activity, and parent letter you generate is
                automatically saved here.
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-[#35c6c9] px-5 py-3 font-black text-white shadow-lg transition group-hover:translate-x-1">
            Open History
            <ArrowRight size={18} />
          </div>
        </Link>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-3">
        {aiTools.map((tool) => (
          <Link
            key={tool.title}
            href={tool.href}
            className={`${tool.bg} group rounded-[2rem] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-3xl shadow-sm">
              {tool.emoji}
            </div>

            <div className="mt-5 inline-flex rounded-full bg-white px-3 py-1 text-xs font-black text-[#17223b] shadow-sm">
              {tool.label}
            </div>

            <h2 className="mt-4 text-2xl font-black text-[#17223b]">
              {tool.title}
            </h2>

            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
              {tool.description}
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#35c6c9] shadow-sm transition group-hover:translate-x-1">
              Open Tool
              <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-8 rounded-[2rem] bg-[#fffaf3] p-6 shadow-sm">
        <p className="text-sm font-black uppercase tracking-widest text-[#ff6f91]">
          Quick Ideas
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          {promptIdeas.map((idea) => (
            <span
              key={idea}
              className="rounded-full bg-white px-4 py-2 text-sm font-black text-[#17223b] shadow-sm"
            >
              {idea}
            </span>
          ))}
        </div>
      </section>
    </main>
  );
}