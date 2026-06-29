import Image from "next/image";
import Link from "next/link";
import { BookOpen, Heart, Sparkles, Star } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#ffe7b5] bg-[#fffaf3]">
      <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-[#35c6c9]/10 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-[#ff6f91]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl bg-white shadow-md">
                <Image
                  src="/images/logo.png"
                  alt="Classroom by Tina"
                  fill
                  sizes="56px"
                  className="object-contain p-1"
                />
              </div>

              <div>
                <h3 className="text-xl font-black text-[#17223b]">
                  Classroom by Tina
                </h3>

                <p className="font-bold text-[#ff8a3d]">
                  Charlotte-Mecklenburg K–2 Resources 🍎
                </p>
              </div>
            </Link>

            <p className="mt-5 leading-7 text-slate-600">
              Helping Charlotte-Mecklenburg Kindergarten, First Grade, and Second Grade
teachers save time with classroom-tested lesson plans, centers, assessments,
games, and teaching tools.
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

          <div>
            <h3 className="flex items-center gap-2 text-lg font-black text-[#17223b]">
              <BookOpen size={18} />
              Explore
            </h3>

            <div className="mt-5 space-y-3">
              <a
                href="#features"
                className="block font-semibold text-slate-600 hover:text-[#35c6c9]"
              >
                Features
              </a>

              <a
                href="#preview"
                className="block font-semibold text-slate-600 hover:text-[#35c6c9]"
              >
                Platform Preview
              </a>

              <a
                href="#pricing"
                className="block font-semibold text-slate-600 hover:text-[#35c6c9]"
              >
                Pricing
              </a>

              <a
                href="#about"
                className="block font-semibold text-slate-600 hover:text-[#35c6c9]"
              >
                Meet Tina
              </a>
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-black text-[#17223b]">
              <Heart size={18} />
              Account
            </h3>

            <div className="mt-5 space-y-3">
              <Link
                href="/signup"
                className="block font-semibold text-slate-600 hover:text-[#35c6c9]"
              >
                Create Account
              </Link>

              <Link
                href="/login"
                className="block font-semibold text-slate-600 hover:text-[#35c6c9]"
              >
                Sign In
              </Link>

              <Link
                href="/subscribe"
                className="block font-semibold text-slate-600 hover:text-[#35c6c9]"
              >
                Upgrade to Pro
              </Link>
            </div>
          </div>

          <div>
            <h3 className="flex items-center gap-2 text-lg font-black text-[#17223b]">
              <Sparkles size={18} />
              What&apos;s Included
            </h3>

            <div className="mt-5 space-y-4">
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                📚 Lesson Plans
              </div>

              <div className="rounded-2xl bg-white p-3 shadow-sm">
                🎯 Centers & Small Groups
              </div>

              <div className="rounded-2xl bg-white p-3 shadow-sm">
                📝 Assessments & Quizzes
              </div>

              <div className="rounded-2xl bg-white p-3 shadow-sm">
                🏡 Homework & Parent Letters
              </div>

              <div className="rounded-2xl bg-white p-3 shadow-sm">
                ⭐ Favorites & Downloads
              </div>

              <div className="rounded-2xl bg-white p-3 shadow-sm">
                📊 Teaching Slides & Resources
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#ffe7b5] pt-8 md:flex-row">
          <p className="font-semibold text-slate-500">
            © 2026 Classroom by Tina. All rights reserved.
          </p>

          <div className="flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-sm">
            <Star size={16} className="text-[#f7b928]" fill="currentColor" />
            <span className="font-bold text-[#17223b]">
              Built by teachers • Loved by teachers 🍎
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}