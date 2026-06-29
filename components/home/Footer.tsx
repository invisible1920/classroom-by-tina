import Image from "next/image";
import Link from "next/link";
import { BookOpen, Heart, Sparkles, Star } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#ffe7b5] bg-[#fffaf3]">
      <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-[#35c6c9]/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-[#ff6f91]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-white shadow-md sm:h-14 sm:w-14">
                <Image
                  src="/images/logo.png"
                  alt="Classroom by Tina"
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                />
              </div>

              <div className="min-w-0">
                <h3 className="truncate text-lg font-black text-[#17223b] sm:text-xl">
                  Classroom by Tina
                </h3>

                <p className="text-sm font-bold leading-5 text-[#ff8a3d] sm:text-base">
                  Charlotte-Mecklenburg K–2 Resources 🍎
                </p>
              </div>
            </Link>

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              Helping Charlotte-Mecklenburg Kindergarten, First Grade, and Second Grade
              teachers save time with classroom-tested lesson plans, centers,
              assessments, games, and teaching tools.
            </p>

            <div className="mt-6 flex flex-wrap gap-2 sm:gap-3">
              <div className="rounded-full bg-[#35c6c9]/10 px-4 py-2 text-xs font-black text-[#35c6c9] sm:text-sm">
                🍎 Teacher Created
              </div>

              <div className="rounded-full bg-[#f7b928]/20 px-4 py-2 text-xs font-black text-[#d48806] sm:text-sm">
                📚 K–2 Focused
              </div>
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-black text-[#17223b]">
              <BookOpen size={18} />
              Explore
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:block sm:space-y-3">
              <a href="#features" className="font-semibold text-slate-600 hover:text-[#35c6c9]">
                Features
              </a>

              <a href="#preview" className="font-semibold text-slate-600 hover:text-[#35c6c9]">
                Platform Preview
              </a>

              <a href="#pricing" className="font-semibold text-slate-600 hover:text-[#35c6c9]">
                Pricing
              </a>

              <a href="#about" className="font-semibold text-slate-600 hover:text-[#35c6c9]">
                Meet Tina
              </a>
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-black text-[#17223b]">
              <Heart size={18} />
              Account
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:block sm:space-y-3">
              <Link href="/signup" className="font-semibold text-slate-600 hover:text-[#35c6c9]">
                Create Account
              </Link>

              <Link href="/login" className="font-semibold text-slate-600 hover:text-[#35c6c9]">
                Sign In
              </Link>

              <Link href="/subscribe" className="font-semibold text-slate-600 hover:text-[#35c6c9]">
                Upgrade to Pro
              </Link>
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-black text-[#17223b]">
              <Sparkles size={18} />
              What&apos;s Included
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-5 sm:block sm:space-y-4">
              <div className="rounded-2xl bg-white p-3 text-sm shadow-sm sm:text-base">
                📚 Lesson Plans
              </div>

              <div className="rounded-2xl bg-white p-3 text-sm shadow-sm sm:text-base">
                🎯 Centers
              </div>

              <div className="rounded-2xl bg-white p-3 text-sm shadow-sm sm:text-base">
                📝 Assessments
              </div>

              <div className="rounded-2xl bg-white p-3 text-sm shadow-sm sm:text-base">
                🏡 Parent Letters
              </div>

              <div className="rounded-2xl bg-white p-3 text-sm shadow-sm sm:text-base">
                ⭐ Favorites
              </div>

              <div className="rounded-2xl bg-white p-3 text-sm shadow-sm sm:text-base">
                📊 Slides
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-[#ffe7b5] pt-6 text-center sm:mt-14 sm:pt-8 md:flex-row md:text-left">
          <p className="text-sm font-semibold text-slate-500 sm:text-base">
            © 2026 Classroom by Tina. All rights reserved.
          </p>

          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-center shadow-sm sm:px-5">
            <Star size={16} className="shrink-0 text-[#f7b928]" fill="currentColor" />
            <span className="text-sm font-bold text-[#17223b] sm:text-base">
              Built by teachers • Loved by teachers 🍎
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}