import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Clipboard,
  Download,
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
      color: "text-[#8a4fba]",
      bg: "bg-[#f7efff]",
      icon: <BookOpen size={18} />,
    };
  }

  if (tool === "activity-generator") {
    return {
      label: "Activity Generator",
      emoji: "🧩",
      color: "text-[#d94f75]",
      bg: "bg-[#fff0f4]",
      icon: <FileText size={18} />,
    };
  }

  if (tool === "parent-letter") {
    return {
      label: "Parent Letter",
      emoji: "💌",
      color: "text-[#d96f00]",
      bg: "bg-[#fff7db]",
      icon: <MessageSquareText size={18} />,
    };
  }

  return {
    label: "AI Tool",
    emoji: "✨",
    color: "text-[#35aeb1]",
    bg: "bg-[#e8fbfb]",
    icon: <Sparkles size={18} />,
  };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function valueToText(value: unknown) {
  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (value && typeof value === "object") {
    return JSON.stringify(value, null, 2);
  }

  return "";
}

function getOutputSections(output: Record<string, unknown>) {
  const hiddenKeys = new Set(["title", "grade", "subject", "duration", "letterType", "tone", "activityType"]);

  return Object.entries(output)
    .filter(([key]) => !hiddenKeys.has(key))
    .map(([key, value]) => ({
      title: key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (char) => char.toUpperCase()),
      text: valueToText(value),
    }))
    .filter((section) => section.text);
}

export default async function AIHistoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("ai_generations")
    .select("id, tool, title, input, output, created_at")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    redirect("/dashboard/ai/history");
  }

  const generation = data as AIGeneration;
  const meta = getToolMeta(generation.tool);
  const sections = getOutputSections(generation.output);

  return (
    <main className="pb-12">
      <Link
        href="/dashboard/ai/history"
        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#35c6c9] shadow-sm transition hover:-translate-x-1"
      >
        <ArrowLeft size={16} />
        Back to AI History
      </Link>

      <section className="mt-6 rounded-[2.25rem] bg-white p-8 shadow-[0_18px_50px_rgba(23,34,59,0.08)] md:p-10">
        <div className={`inline-flex items-center gap-2 rounded-full ${meta.bg} px-4 py-2 text-sm font-black ${meta.color}`}>
          {meta.icon}
          {meta.label}
        </div>

        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-[#17223b] md:text-5xl">
              {generation.title}
            </h1>

            <p className="mt-4 text-sm font-semibold text-slate-500">
              Saved {formatDate(generation.created_at)}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-[#e8fbfb] px-5 py-3 text-sm font-black text-[#35aeb1] shadow-sm"
            >
              <Clipboard size={16} />
              Copy
            </button>

            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full bg-[#fff3c4] px-5 py-3 text-sm font-black text-[#b87900] shadow-sm"
            >
              <Download size={16} />
              Download
            </button>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-8 xl:grid-cols-[0.75fr_1.25fr]">
        <aside className="rounded-[2rem] bg-[#fffaf3] p-6 shadow-sm">
          <p className="text-sm font-black uppercase tracking-widest text-[#ff6f91]">
            Original Request
          </p>

          <div className="mt-5 grid gap-3">
            {Object.entries(generation.input).map(([key, value]) => (
              <div key={key} className="rounded-2xl bg-white p-4 shadow-sm">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                  {key}
                </p>
                <p className="mt-1 text-sm font-black text-[#17223b]">
                  {valueToText(value)}
                </p>
              </div>
            ))}
          </div>
        </aside>

        <section className="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(23,34,59,0.08)]">
          <p className="text-sm font-black uppercase tracking-widest text-[#35aeb1]">
            Generated Output
          </p>

          <div className="mt-6 grid gap-4">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-3xl border border-[#f3efe6] bg-[#fffaf3] p-5"
              >
                <h2 className="text-lg font-black text-[#17223b]">
                  {section.title}
                </h2>

                <p className="mt-3 whitespace-pre-wrap text-sm font-semibold leading-7 text-slate-600">
                  {section.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}