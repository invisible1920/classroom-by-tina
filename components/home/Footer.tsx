import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-amber-100 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 md:grid-cols-4">

          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1f2a44] text-lg font-black text-white">
                T
              </div>

              <div>
                <p className="font-black text-[#1f2a44]">
                  Classroom by Tina
                </p>

                <p className="text-sm font-semibold text-slate-500">
                  K–2 Teacher Platform
                </p>
              </div>
            </Link>

            <p className="mt-5 leading-7 text-slate-600">
              Premium classroom resources designed by a real teacher to help
              educators save time, stay organized, and love planning again.
            </p>
          </div>

          <div>
            <h3 className="font-black text-[#1f2a44]">
              Platform
            </h3>

            <div className="mt-5 space-y-3">
              <a
                href="#features"
                className="block font-semibold text-slate-600 hover:text-[#1f2a44]"
              >
                Features
              </a>

              <a
                href="#preview"
                className="block font-semibold text-slate-600 hover:text-[#1f2a44]"
              >
                Dashboard
              </a>

              <a
                href="#pricing"
                className="block font-semibold text-slate-600 hover:text-[#1f2a44]"
              >
                Pricing
              </a>

              <a
                href="#about"
                className="block font-semibold text-slate-600 hover:text-[#1f2a44]"
              >
                About Tina
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-black text-[#1f2a44]">
              Account
            </h3>

            <div className="mt-5 space-y-3">
              <Link
                href="/signup"
                className="block font-semibold text-slate-600 hover:text-[#1f2a44]"
              >
                Create Account
              </Link>

              <Link
                href="/login"
                className="block font-semibold text-slate-600 hover:text-[#1f2a44]"
              >
                Sign In
              </Link>

              <Link
                href="/subscribe"
                className="block font-semibold text-slate-600 hover:text-[#1f2a44]"
              >
                Upgrade
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-black text-[#1f2a44]">
              Coming Soon
            </h3>

            <div className="mt-5 space-y-3">
              <p className="font-semibold text-slate-600">
                AI Lesson Planning
              </p>

              <p className="font-semibold text-slate-600">
                Homework Generator
              </p>

              <p className="font-semibold text-slate-600">
                Parent Letters
              </p>

              <p className="font-semibold text-slate-600">
                Weekly Planner
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 md:flex-row">
          <p className="text-sm font-semibold text-slate-500">
            © 2026 Classroom by Tina. All rights reserved.
          </p>

          <p className="text-sm font-semibold text-slate-500">
            Built by teachers • For teachers
          </p>
        </div>
      </div>
    </footer>
  );
}