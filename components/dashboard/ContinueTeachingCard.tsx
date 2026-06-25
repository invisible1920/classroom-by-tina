import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

import { buttonStyles } from "@/components/ui/Button";

export default function ContinueTeachingCard() {
  return (
    <section className="mt-10 overflow-hidden rounded-3xl border border-blue-100 bg-blue-600 p-8 text-white shadow-sm">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/15 p-3">
              <BookOpen size={24} />
            </div>

            <p className="font-semibold uppercase tracking-widest text-blue-100">
              Continue Teaching
            </p>
          </div>

          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            First Grade ELA · Week 1
          </h2>

          <p className="mt-3 max-w-xl text-blue-100">
            Pick up with short vowels, sight words, centers, and weekly
            assessment resources.
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm font-medium text-blue-100">
            <Clock size={16} />
            Estimated planning time: 12 minutes
          </div>
        </div>

        <Link
          href="/dashboard/first-grade"
          className={buttonStyles({
            variant: "white",
            size: "lg",
            className: "shrink-0",
          })}
        >
          Continue
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}