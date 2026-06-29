"use client";

import { FormEvent, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clipboard,
  Download,
  ExternalLink,
  FileText,
  Sparkles,
} from "lucide-react";

import { generateActivityAction } from "@/app/actions/ai";
import type { ActivityOutput } from "@/lib/ai/types";

const gradeOptions = ["Kindergarten", "First Grade", "Second Grade"];
const activityTypes = [
  "Centers",
  "Small Group",
  "Independent Practice",
  "Partner Work",
  "Review Game",
];
const timeOptions = ["10 minutes", "15 minutes", "20 minutes", "30 minutes"];

const fallbackActivity: ActivityOutput = {
  title: "Your Activity Will Appear Here",
  grade: "CMS K–2",
  activityType: "Choose an activity type",
  duration: "Choose a length",
  setup:
    "Fill out the form and click Generate Activity to create a classroom-ready activity.",
  materials: ["Suggested materials will appear here."],
  teacherDirections:
    "Teacher directions will appear here after you submit the form.",
  studentSteps: "Student steps will appear here after generation.",
  differentiation:
    "Differentiation ideas will appear here based on your activity details.",
  quickCheck: "A quick check will appear here after generation.",
};

function getActivitySections(activity: ActivityOutput) {
  return [
    { emoji: "🧩", title: "Activity Setup", text: activity.setup },
    { emoji: "📚", title: "Materials Needed", text: activity.materials.join(", ") },
    { emoji: "👩‍🏫", title: "Teacher Directions", text: activity.teacherDirections },
    { emoji: "✏️", title: "Student Steps", text: activity.studentSteps },
    { emoji: "⭐", title: "Differentiation", text: activity.differentiation },
    { emoji: "✅", title: "Quick Check", text: activity.quickCheck },
  ];
}

function activityToText(activity: ActivityOutput) {
  return [
    activity.title,
    "",
    `${activity.grade} · ${activity.activityType} · ${activity.duration}`,
    "",
    "Activity Setup",
    activity.setup,
    "",
    "Materials Needed",
    activity.materials.join(", "),
    "",
    "Teacher Directions",
    activity.teacherDirections,
    "",
    "Student Steps",
    activity.studentSteps,
    "",
    "Differentiation",
    activity.differentiation,
    "",
    "Quick Check",
    activity.quickCheck,
  ].join("\n");
}

export default function AIActivityGeneratorPage() {
  const [activity, setActivity] = useState<ActivityOutput | null>(null);
  const [generationId, setGenerationId] = useState("");
  const [error, setError] = useState("");
  const [generatedAt, setGeneratedAt] = useState("");
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const activeActivity = activity ?? fallbackActivity;
  const activitySections = getActivitySections(activeActivity);

  const activityText = useMemo(
    () => activityToText(activeActivity),
    [activeActivity],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setError("");
    setCopied(false);

    startTransition(async () => {
      const result = await generateActivityAction(formData);

      if (!result.success || !result.activity) {
        setError(result.error || "Something went wrong.");
        return;
      }

      setActivity(result.activity);
      setGenerationId(result.generationId || "");
      setGeneratedAt(new Date().toLocaleTimeString());
    });
  }

  async function handleCopy() {
    if (!activity) return;

    await navigator.clipboard.writeText(activityText);
    setCopied(true);
  }

  function handleDownload() {
    if (!activity) return;

    const blob = new Blob([activityText], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${activity.title
      .replace(/[^a-z0-9]/gi, "-")
      .toLowerCase()}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  }

  return (
    <main>
      <Link
        href="/dashboard/ai"
        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#35c6c9] shadow-sm transition hover:-translate-x-1"
      >
        <ArrowLeft size={16} />
        Back to AI Tools
      </Link>

      <section className="mt-6 overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-[#ff6f91] via-[#ff8a3d] to-[#f7b928] p-1 shadow-[0_24px_70px_rgba(23,34,59,0.12)]">
        <div className="rounded-[2rem] bg-white/95 p-8 md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#fff0f4] px-4 py-2 text-sm font-black text-[#d94f75]">
            <Sparkles size={16} />
            AI Teaching Tools
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-[#17223b] md:text-5xl">
            AI Activity Generator
          </h1>

          <p className="mt-4 max-w-2xl text-lg font-medium leading-8 text-slate-600">
            Turn a CMS K–2 skill into a classroom-ready activity for centers,
            small groups, partner practice, or quick review.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(23,34,59,0.08)]"
        >
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-[#ff6f91]">
              Activity Details
            </p>
            <h2 className="mt-2 text-2xl font-black text-[#17223b]">
              What should Tina help you create?
            </h2>
          </div>

          <div className="mt-6 space-y-5">
            <div>
              <label className="text-sm font-black text-[#17223b]">
                Grade
              </label>
              <select name="grade" className="admin-input mt-2">
                {gradeOptions.map((grade) => (
                  <option key={grade} value={grade}>
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-black text-[#17223b]">
                Activity type
              </label>
              <select name="activityType" className="admin-input mt-2">
                {activityTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-black text-[#17223b]">
                Skill or topic
              </label>
              <input
                name="skill"
                required
                className="admin-input mt-2"
                placeholder="Example: comparing two-digit numbers"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#17223b]">
                Activity length
              </label>
              <select name="duration" className="admin-input mt-2">
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-black text-[#17223b]">
                Materials available
              </label>
              <textarea
                name="materials"
                className="admin-input mt-2 min-h-32 resize-none"
                placeholder="Example: whiteboards, counters, task cards, pocket chart..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ff6f91] px-6 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "🧠 Generating..." : "🧠 Generate Activity"}
          </button>

          {error && (
            <p className="mt-4 rounded-2xl bg-[#fff0f4] px-4 py-3 text-sm font-bold text-[#d94f75]">
              {error}
            </p>
          )}

          {activity && (
            <div className="mt-4 rounded-2xl bg-[#fff0f4] p-4 text-sm font-black text-[#d94f75]">
              <p>✅ Activity generated and saved at {generatedAt}.</p>

              {generationId && (
                <Link
                  href={`/dashboard/ai/history/${generationId}`}
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#d94f75] shadow-sm"
                >
                  Open saved activity
                  <ExternalLink size={14} />
                </Link>
              )}
            </div>
          )}
        </form>

        <aside className="rounded-[2rem] bg-[#fff0f4] p-6 shadow-sm">
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(23,34,59,0.08)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#fff0f4] px-4 py-2 text-sm font-black text-[#d94f75]">
                  <FileText size={16} />
                  {activity ? "Generated Activity" : "Activity Preview"}
                </div>

                <h2 className="mt-4 text-3xl font-black text-[#17223b]">
                  {activeActivity.title}
                </h2>

                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  {activeActivity.grade} · {activeActivity.activityType} ·{" "}
                  {activeActivity.duration}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!activity}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#fff0f4] text-[#d94f75] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Copy activity"
                >
                  <Clipboard size={18} />
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!activity}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#fff3c4] text-[#b87900] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Download activity"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>

            {copied && (
              <p className="mt-4 rounded-2xl bg-[#fff0f4] px-4 py-3 text-sm font-black text-[#d94f75]">
                Copied to clipboard.
              </p>
            )}

            <div className="mt-6 grid gap-4">
              {activitySections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-3xl border border-[#f3efe6] bg-[#fffaf3] p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm">
                      {section.emoji}
                    </div>

                    <h3 className="text-lg font-black text-[#17223b]">
                      {section.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
                    {section.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}