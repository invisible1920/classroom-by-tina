import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 border-b border-[#ffe7b5] bg-[#fffaf3]/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3">
          <div className="relative h-11 w-11 shrink-0 sm:h-14 sm:w-14">
            <Image
              src="/images/logo.png"
              alt="Classroom by Tina"
              fill
              priority
              sizes="56px"
              className="object-contain"
            />
          </div>

          <div className="min-w-0">
            <p className="truncate text-base font-black tracking-tight text-[#17223b] sm:text-lg">
              Classroom by Tina
            </p>

            <p className="hidden text-sm font-bold text-[#ff8a3d] sm:block">
              K–2 Teacher Platform 🍎
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-bold text-slate-600 hover:text-[#35c6c9]"
          >
            Features
          </a>

          <a
            href="#pricing"
            className="text-sm font-bold text-slate-600 hover:text-[#35c6c9]"
          >
            Pricing
          </a>

          <a
            href="#about"
            className="text-sm font-bold text-slate-600 hover:text-[#35c6c9]"
          >
            About
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {user ? (
            <Link
              href="/dashboard"
              className="rounded-full bg-[#17223b] px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#35c6c9] sm:px-5"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-full px-5 py-2.5 text-sm font-black text-[#17223b] hover:bg-white sm:inline-flex"
              >
                Sign in
              </Link>

              <Link
                href="/signup"
                className="rounded-full bg-[#17223b] px-4 py-2.5 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#35c6c9] sm:px-5"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}