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

import { generateParentLetterAction } from "@/app/actions/ai";
import type { ParentLetterOutput } from "@/lib/ai/types";

const gradeOptions = ["Kindergarten", "First Grade", "Second Grade"];
const letterTypes = [
  "Weekly Update",
  "Behavior Note",
  "Homework Reminder",
  "Field Trip Note",
  "Celebration Message",
  "General Announcement",
];
const toneOptions = ["Warm", "Professional", "Encouraging", "Short and Simple"];

const fallbackLetter: ParentLetterOutput = {
  title: "Your Parent Letter Will Appear Here",
  grade: "CMS K–2",
  letterType: "Choose a letter type",
  tone: "Choose a tone",
  greeting: "Hi families!",
  body:
    "Fill out the form and click Generate Parent Letter to create a polished family message.",
  importantDetails: "Important dates and details will appear here.",
  closing: "Thank you for partnering with us!",
};

function getLetterSections(letter: ParentLetterOutput) {
  return [
    { emoji: "👋", title: "Friendly Greeting", text: letter.greeting },
    { emoji: "📌", title: "Main Message", text: letter.body },
    {
      emoji: "📅",
      title: "Important Details",
      text: letter.importantDetails,
    },
    { emoji: "💛", title: "Encouraging Close", text: letter.closing },
  ];
}

function letterToText(letter: ParentLetterOutput) {
  return [
    letter.title,
    "",
    `${letter.grade} · ${letter.letterType} · ${letter.tone}`,
    "",
    letter.greeting,
    "",
    letter.body,
    "",
    letter.importantDetails,
    "",
    letter.closing,
  ].join("\n");
}

export default function AIParentLetterPage() {
  const [letter, setLetter] = useState<ParentLetterOutput | null>(null);
  const [generationId, setGenerationId] = useState("");
  const [error, setError] = useState("");
  const [generatedAt, setGeneratedAt] = useState("");
  const [copied, setCopied] = useState(false);
  const [isPending, startTransition] = useTransition();

  const activeLetter = letter ?? fallbackLetter;
  const letterSections = getLetterSections(activeLetter);

  const letterText = useMemo(() => letterToText(activeLetter), [activeLetter]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setError("");
    setCopied(false);

    startTransition(async () => {
      const result = await generateParentLetterAction(formData);

      if (!result.success || !result.letter) {
        setError(result.error || "Something went wrong.");
        return;
      }

      setLetter(result.letter);
      setGenerationId(result.generationId || "");
      setGeneratedAt(new Date().toLocaleTimeString());
    });
  }

  async function handleCopy() {
    if (!letter) return;

    await navigator.clipboard.writeText(letterText);
    setCopied(true);
  }

  function handleDownload() {
    if (!letter) return;

    const blob = new Blob([letterText], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${letter.title
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

      <section className="mt-6 overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-[#f7b928] via-[#ff8a3d] to-[#ff6f91] p-1 shadow-[0_24px_70px_rgba(23,34,59,0.12)]">
        <div className="rounded-[2rem] bg-white/95 p-8 md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#fff7db] px-4 py-2 text-sm font-black text-[#b87900]">
            <Sparkles size={16} />
            AI Tools
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-black tracking-tight text-[#17223b] md:text-5xl">
            AI Parent Letter Helper
          </h1>

          <p className="mt-4 max-w-2xl text-lg font-medium leading-8 text-slate-600">
            Draft warm, clear CMS K–2 family communication in a polished teacher
            voice.
          </p>
        </div>
      </section>

      <section className="mt-10 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] bg-white p-6 shadow-[0_18px_50px_rgba(23,34,59,0.08)]"
        >
          <div>
            <p className="text-sm font-black uppercase tracking-widest text-[#b87900]">
              Letter Details
            </p>
            <h2 className="mt-2 text-2xl font-black text-[#17223b]">
              What should Tina help you write?
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
                Letter type
              </label>
              <select name="letterType" className="admin-input mt-2">
                {letterTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-black text-[#17223b]">
                Tone
              </label>
              <select name="tone" className="admin-input mt-2">
                {toneOptions.map((tone) => (
                  <option key={tone} value={tone}>
                    {tone}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-black text-[#17223b]">
                Main message
              </label>
              <textarea
                name="message"
                required
                className="admin-input mt-2 min-h-36 resize-none"
                placeholder="Example: Remind families that reading logs are due Friday and students should practice short vowel words nightly."
              />
            </div>

            <div>
              <label className="text-sm font-black text-[#17223b]">
                Important dates or details
              </label>
              <input
                name="details"
                className="admin-input mt-2"
                placeholder="Example: Friday, March 8"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#ff8a3d] px-6 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "💌 Generating..." : "💌 Generate Parent Letter"}
          </button>

          {error && (
            <p className="mt-4 rounded-2xl bg-[#fff0f4] px-4 py-3 text-sm font-bold text-[#d94f75]">
              {error}
            </p>
          )}

          {letter && (
            <div className="mt-4 rounded-2xl bg-[#fff7db] p-4 text-sm font-black text-[#b87900]">
              <p>✅ Parent letter generated and saved at {generatedAt}.</p>

              {generationId && (
                <Link
                  href={`/dashboard/ai/history/${generationId}`}
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-black text-[#b87900] shadow-sm"
                >
                  Open saved letter
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
                <div className="inline-flex items-center gap-2 rounded-full bg-[#fff7db] px-4 py-2 text-sm font-black text-[#b87900]">
                  <FileText size={16} />
                  {letter ? "Generated Letter" : "Letter Preview"}
                </div>

                <h2 className="mt-4 text-3xl font-black text-[#17223b]">
                  {activeLetter.title}
                </h2>

                <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                  {activeLetter.grade} · {activeLetter.letterType} ·{" "}
                  {activeLetter.tone}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!letter}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#fff7db] text-[#b87900] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Copy letter"
                >
                  <Clipboard size={18} />
                </button>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={!letter}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#fff0f4] text-[#d94f75] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Download letter"
                >
                  <Download size={18} />
                </button>
              </div>
            </div>

            {copied && (
              <p className="mt-4 rounded-2xl bg-[#fff7db] px-4 py-3 text-sm font-black text-[#b87900]">
                Copied to clipboard.
              </p>
            )}

            <div className="mt-6 rounded-3xl border border-[#f3efe6] bg-[#fffaf3] p-6">
              <p className="whitespace-pre-line text-sm font-semibold leading-7 text-slate-700">
                {letterText}
              </p>
            </div>

            <div className="mt-6 grid gap-4">
              {letterSections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-3xl border border-[#f3efe6] bg-white p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#fffaf3] text-2xl shadow-sm">
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