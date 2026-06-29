import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  FileText,
  MessageSquareText,
  Sparkles,
} from "lucide-react";

import { createClient } from "@/utils/supabase/server";

type AIGeneration = {
  id: string;
  tool: string;
  title: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
  created_at: string;
};

function getToolMeta(tool: string) {
  if (tool === "lesson-planner") {
    return {
      label: "Lesson Planner",
      emoji: "✨",
      href: "/dashboard/ai/lesson-planner",
      color: "text-[#8a4fba]",
      bg: "bg-[#f7efff]",
      icon: <BookOpen size={18} />,
    };
  }

  if (tool === "activity-generator") {
    return {
      label: "Activity Generator",
      emoji: "🧩",
      href: "/dashboard/ai/activity-generator",
      color: "text-[#d94f75]",
      bg: "bg-[#fff0f4]",
      icon: <FileText size={18} />,
    };
  }

  if (tool === "parent-letter") {
    return {
      label: "Parent Letter",
      emoji: "💌",
      href: "/dashboard/ai/parent-letter",
      color: "text-[#d96f00]",
      bg: "bg-[#fff7db]",
      icon: <MessageSquareText size={18} />,
    };
  }

  return {
    label: "AI Tool",
    emoji: "✨",
    href: "/dashboard/ai",
    color: "text-[#35aeb1]",
    bg: "bg-[#e8fbfb]",
    icon: <Sparkles size={18} />,
  };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export default async function AIHistoryPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: generations, error } = await supabase
    .from("ai_generations")
    .select("id, tool, title, input, output, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error("AI history error:", error);
  }

  const items = (generations || []) as AIGeneration[];

  return (
    <main className="pb-12">
      <Link
        href="/dashboard/ai"
        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#35c6c9] shadow-sm transition hover:-translate-x-1"
      >
        <ArrowLeft size={16} />
        Back to AI Tools
      </Link>

      <section className="mt-6 rounded-[2.25rem] bg-white p-8 shadow-[0_18px_50px_rgba(23,34,59,0.08)] md:p-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-[#f7efff] px-4 py-2 text-sm font-black text-[#8a4fba]">
          <Clock size={16} />
          AI History
        </div>

        <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-[#17223b] md:text-5xl">
          Your saved AI generations.
        </h1>

        <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-slate-600">
          Every lesson, activity, and parent letter you generate is saved here
          so you can come back to it later.
        </p>
      </section>

      {items.length === 0 ? (
        <section className="mt-8 rounded-[2rem] bg-[#fff7db] p-8 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-3xl shadow-sm">
            ✨
          </div>

          <h2 className="mt-5 text-2xl font-black text-[#17223b]">
            No AI generations yet
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-6 text-slate-600">
            Generate your first CMS K–2 lesson plan, classroom activity, or
            parent letter and it will appear here automatically.
          </p>

          <Link
            href="/dashboard/ai/lesson-planner"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#35c6c9] px-6 py-3 font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Create First Lesson
            <ArrowRight size={18} />
          </Link>
        </section>
      ) : (
        <section className="mt-8 grid gap-4">
          {items.map((item) => {
            const meta = getToolMeta(item.tool);

            return (
              <Link
                key={item.id}
                href={`/dashboard/ai/history/${item.id}`}
                className="group rounded-[2rem] bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div className="flex gap-4">
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl ${meta.bg} text-3xl shadow-sm`}
                    >
                      {meta.emoji}
                    </div>

                    <div>
                      <div
                        className={`inline-flex items-center gap-2 rounded-full ${meta.bg} px-3 py-1 text-xs font-black ${meta.color}`}
                      >
                        {meta.icon}
                        {meta.label}
                      </div>

                      <h2 className="mt-3 text-2xl font-black text-[#17223b]">
                        {item.title || "Untitled AI Generation"}
                      </h2>

                      <p className="mt-2 text-sm font-semibold text-slate-500">
                        Saved {formatDate(item.created_at)}
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full bg-[#e8fbfb] px-4 py-2 text-sm font-black text-[#35aeb1] transition group-hover:translate-x-1">
                    Open
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            );
          })}
        </section>
      )}
    </main>
  );
}