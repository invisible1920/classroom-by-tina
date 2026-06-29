import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

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
            Week 1 Resources
          </h2>

          <p className="mt-4 text-lg leading-8 text-white/90">
            Pick up where you left off with this week’s lessons, literacy
            centers, activities, assessments, and family communication.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-black">
              📚 Lesson Plans
            </span>

            <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-black">
              🎲 Centers
            </span>

            <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-black">
              📝 Assessments
            </span>

            <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-black">
              💌 Parent Letters
            </span>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm font-bold text-white/90">
            <BookOpen size={17} />
            Start with the weekly resource hub.
          </div>
        </div>

        <div className="shrink-0">
          <Link
            href="/dashboard/first-grade"
            className={buttonStyles({
              variant: "white",
              size: "lg",
              className:
                "rounded-full px-8 shadow-xl transition hover:scale-105",
            })}
          >
            Open Week 1
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}