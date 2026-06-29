import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Sparkles,
} from "lucide-react";

import { buttonStyles } from "@/components/ui/Button";

export default function ContinueTeachingCard() {
  return (
    <section className="mt-10 overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#35c6c9] to-[#2aaeb0] p-8 text-white shadow-xl">
      <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-black">
            <Sparkles size={16} />
            Continue Teaching 🍎
          </div>

          <h2 className="mt-6 text-4xl font-black leading-tight">
            First Grade ELA
            <br />
            Week 1
          </h2>

          <p className="mt-4 text-lg leading-8 text-white/90">
            Jump back into short vowels, sight words, literacy centers,
            assessments, and classroom activities for this week's lessons.
          </p>

          <div className="mt-8">
            <div className="flex items-center justify-between text-sm font-bold">
              <span>Week Ready</span>
              <span>72%</span>
            </div>

            <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/25">
              <div className="h-full w-[72%] rounded-full bg-[#ffd54a]" />
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-6 text-sm font-bold text-white/90">
            <div className="flex items-center gap-2">
              <BookOpen size={17} />
              18 Resources
            </div>

            <div className="flex items-center gap-2">
              <Clock size={17} />
              12 min planning
            </div>
          </div>
        </div>

        <div className="shrink-0">
          <Link
            href="/dashboard/first-grade"
            className={buttonStyles({
              variant: "white",
              size: "lg",
              className:
                "rounded-full px-8 shadow-xl hover:scale-105 transition",
            })}
          >
            Continue Teaching
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-black">
          📚 Lesson Plans
        </span>

        <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-black">
          🎲 Centers
        </span>

        <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-black">
          📝 Assessment
        </span>

        <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-black">
          💌 Parent Letter
        </span>
      </div>
    </section>
  );
}