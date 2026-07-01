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

import { generateLessonPlanAction } from "@/app/actions/ai";
import type { LessonPlanOutput } from "@/lib/ai/types";

const gradeOptions = ["Kindergarten", "First Grade", "Second Grade"];
const subjectOptions = ["ELA", "Math", "Science", "Social Studies"];
const timeOptions = ["15 minutes", "30 minutes", "45 minutes", "60 minutes"];

const fallbackLesson: LessonPlanOutput = {
  title: "Your Lesson Plan Will Appear Here",
  grade: "CMS K–2",
  subject: "Choose a subject",
  duration: "Choose a lesson length",
  objective:
    "Fill out the form and click Generate Lesson Plan to create a classroom-ready lesson.",
  materials: ["Suggested classroom materials will appear here."],
  miniLesson: "The AI-generated mini lesson will appear here.",
  studentPractice: "Student practice steps will appear here.",
  differentiation: "Differentiation ideas will appear here.",
  teacherNotes: "Teacher notes and classroom tips will appear here.",
};

function getLessonSections(lesson: LessonPlanOutput) {
  return [
    { emoji: "🎯", title: "Learning Objective", text: lesson.objective },
    { emoji: "📚", title: "Materials", text: lesson.materials.join(", ") },
    { emoji: "🧠", title: "Mini Lesson", text: lesson.miniLesson },
    { emoji: "🧩", title: "Student Practice", text: lesson.studentPractice },
    { emoji: "⭐", title: "Differentiation", text: lesson.differentiation },
    { emoji: "💡", title: "Teacher Notes", text: lesson.teacherNotes },
  ];
}

function lessonToText(lesson: LessonPlanOutput) {
  return [
    lesson.title,
    "",
    `${lesson.grade} · ${lesson.subject} · ${lesson.duration}`,
    "",
    "Learning Objective",
    lesson.objective,
    "",
    "Materials",
    lesson.materials.join(", "),
    "",
    "Mini Lesson",
    lesson.miniLesson,
    "",
    "Student Practice",
    lesson.studentPractice,
    "",
    "Differentiation",
    lesson.differentiation,
    "",
    "Teacher Notes",
    lesson.teacherNotes,
  ].join("\n");
}

export default function LessonPlannerClient() {
  const [lesson, setLesson] = useState<LessonPlanOutput | null>(null);
  const [generationId, setGenerationId] = useState("");
  const [error, setError] = useState("");
  const [generatedAt, setGeneratedAt] = useState("");
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const activeLesson = lesson ?? fallbackLesson;
  const lessonSections = getLessonSections(activeLesson);

  const lessonText = useMemo(() => lessonToText(activeLesson), [activeLesson]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setError("");
    setCopied(false);

    startTransition(async () => {
      const result = await generateLessonPlanAction(formData);

      if (!result.success || !result.lesson) {
        setError(result.error || "Something went wrong.");
        return;
      }

      setLesson(result.lesson);
      setGenerationId(result.generationId || "");
      setGeneratedAt(new Date().toLocaleTimeString());
    });
  }

  async function handleCopy() {
    if (!lesson) return;

    await navigator.clipboard.writeText(lessonText);
    setCopied(true);
  }

  function handleDownload() {
    if (!lesson) return;

    const blob = new Blob([lessonText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${lesson.title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}.txt`;
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

      <section className="mt-6 overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-[#a66dd4] via-[#35c6c9] to-[#f7b928] p-1 shadow-[0_24px_70px_rgba(23,34,59,0.12)]">
        <div className="rounded-[2rem] bg-white/95 p-8 md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#f7efff] px-4 py-2 text-sm font-black text-[#8a4fba]">
            <Sparkles size={16} />
            AI Planning
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-[#17223b] md:text-5xl">
            AI Lesson Planner
          </h1>

          <p className="mt-4 max-w-2xl text-lg font-medium leading-8 text-slate-600">
            Build a polished CMS K–2 lesson plan with objectives, materials,
            activities, and teacher notes.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(23,34,59,0.08)]"
        >
          <p className="text-sm font-black uppercase tracking-widest text-[#a66dd4]">
            Lesson Details
          </p>

          <h2 className="mt-2 text-2xl font-black text-[#17223b]">
            Tell Tina what you’re teaching
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <label className="text-sm font-black text-[#17223b]">Grade</label>
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
                Subject
              </label>
              <select name="subject" className="admin-input mt-2">
                {subjectOptions.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-black text-[#17223b]">
                Skill or standard
              </label>
              <input
                name="skill"
                required
                className="admin-input mt-2"
                placeholder="Example: short vowel CVC words"
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#17223b]">
                Lesson length
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
                Extra notes
              </label>
              <textarea
                name="notes"
                className="admin-input mt-2 min-h-32 resize-none"
                placeholder="Small group? Whole group? Centers? Add anything helpful."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#35c6c9] px-6 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "✨ Generating..." : "✨ Generate Lesson Plan"}
          </button>

          {error && (
            <p className="mt-4 rounded-2xl bg-[#fff0f4] px-4 py-3 text-sm font-bold text-[#d94f75]">
              {error}
            </p>
          )}

          {lesson && (
            <div className="mt-4 rounded-2xl bg-[#e8fbfb] p-4 text-sm font-black text-[#35aeb1]">
              <p>✅ Lesson generated and saved at {generatedAt}.</p>

              {generationId && (
                <Link
                  href={`/dashboard/ai/history/${generationId}`}
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#35aeb1] shadow-sm"
                >
                  Open saved lesson
                  <ExternalLink size={14} />
                </Link>
              )}
            </div>
          )}
        </form>

        <aside className="rounded-[2rem] bg-[#fff7db] p-6 shadow-sm">
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(23,34,59,0.08)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#f7efff] px-4 py-2 text-sm font-black text-[#8a4fba]">
                  <FileText size={16} />
                  {lesson ? "Generated Lesson" : "Lesson Preview"}
                </div>

                <h2 className="mt-4 text-3xl font-black text-[#17223b]">
                  {activeLesson.title}
                </h2>

                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  {activeLesson.grade} · {activeLesson.subject} ·{" "}
                  {activeLesson.duration}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!lesson}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#e8fbfb] text-[#35c6c9] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Copy lesson"
                >
                  <Clipboard size={18} />
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!lesson}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#fff3c4] text-[#b87900] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Download lesson"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>

            {copied && (
              <p className="mt-4 rounded-2xl bg-[#e8fbfb] px-4 py-3 text-sm font-black text-[#35aeb1]">
                Copied to clipboard.
              </p>
            )}

            <div className="mt-6 grid gap-4">
              {lessonSections.map((section) => (
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