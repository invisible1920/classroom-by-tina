import Image from "next/image";
import Link from "next/link";
import { BookOpen, Heart, Sparkles, Star } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#ffe7b5] bg-[#fffaf3]">
      <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-[#35c6c9]/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#ff6f91]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-white shadow-md">
                <Image
                  src="/images/logo.png"
                  alt="Classroom by Tina"
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                />
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-xl font-black text-[#17223b]">
                  Classroom by Tina
                </h3>

                <p className="text-base font-bold leading-5 text-[#ff8a3d]">
                  Charlotte-Mecklenburg K–2 Resources 🍎
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-base leading-8 text-slate-600">
              Helping Charlotte-Mecklenburg Kindergarten, First Grade, and
              Second Grade teachers save time with classroom-tested lesson
              plans, centers, assessments, games, and teaching tools.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-full bg-[#35c6c9]/10 px-4 py-2 text-sm font-black text-[#35c6c9]">
                🍎 Teacher Created
              </div>

              <div className="rounded-full bg-[#f7b928]/20 px-4 py-2 text-sm font-black text-[#d48806]">
                📚 K–2 Focused
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-black text-[#17223b]">
              <BookOpen size={18} />
              Explore
            </h3>

            <div className="mt-5 flex flex-col gap-4">
              <a
                href="#features"
                className="font-semibold text-slate-600 transition hover:text-[#35c6c9]"
              >
                Features
              </a>

              <a
                href="#preview"
                className="font-semibold text-slate-600 transition hover:text-[#35c6c9]"
              >
                Platform Preview
              </a>

              <a
                href="#pricing"
                className="font-semibold text-slate-600 transition hover:text-[#35c6c9]"
              >
                Pricing
              </a>

              <a
                href="#about"
                className="font-semibold text-slate-600 transition hover:text-[#35c6c9]"
              >
                Meet Tina
              </a>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-black text-[#17223b]">
              <Heart size={18} />
              Account
            </h3>

            <div className="mt-5 flex flex-col gap-4">
              <Link
                href="/signup"
                className="font-semibold text-slate-600 transition hover:text-[#35c6c9]"
              >
                Create Account
              </Link>

              <Link
                href="/login"
                className="font-semibold text-slate-600 transition hover:text-[#35c6c9]"
              >
                Sign In
              </Link>

            </div>
          </div>

          {/* Included */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-black text-[#17223b]">
              <Sparkles size={18} />
              What&apos;s Included
            </h3>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm transition hover:shadow-md">
                📚 Lesson Plans
              </div>

              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm transition hover:shadow-md">
                🎯 Centers
              </div>

              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm transition hover:shadow-md">
                📝 Assessments
              </div>

              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm transition hover:shadow-md">
                🏡 Parent Letters
              </div>

              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm transition hover:shadow-md">
                ⭐ Favorites
              </div>

              <div className="rounded-2xl bg-white px-4 py-3 shadow-sm transition hover:shadow-md">
                📊 Slides
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-[#ffe7b5] pt-8 md:flex-row">
          <p className="text-center text-sm font-semibold text-slate-500 md:text-left">
            © 2026 Classroom by Tina. All rights reserved.
          </p>

          <div className="flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-sm">
            <Star
              size={16}
              className="shrink-0 text-[#f7b928]"
              fill="currentColor"
            />

            <span className="text-sm font-bold text-[#17223b]">
              Built by teachers • Loved by teachers 🍎
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}