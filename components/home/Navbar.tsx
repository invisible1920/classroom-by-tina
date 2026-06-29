import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#ffe7b5] bg-[#fffaf3]/95 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-14 w-14 shrink-0">
            <Image
              src="/images/logo.png"
              alt="Classroom by Tina"
              fill
              priority
              sizes="56px"
              className="object-contain"
            />
          </div>

          <div>
            <p className="text-lg font-black tracking-tight text-[#17223b]">
              Classroom by Tina
            </p>
            <p className="hidden text-sm font-bold text-[#ff8a3d] sm:block">
              K–2 Teacher Platform 🍎
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-bold text-slate-600 hover:text-[#35c6c9]">
            Features
          </a>
          <a href="#pricing" className="text-sm font-bold text-slate-600 hover:text-[#35c6c9]">
            Pricing
          </a>
          <a href="#about" className="text-sm font-bold text-slate-600 hover:text-[#35c6c9]">
            About
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-full px-5 py-2.5 text-sm font-black text-[#17223b] hover:bg-white sm:inline-flex"
          >
            Sign in
          </Link>

          <Link
            href="/signup"
            className="rounded-full bg-[#17223b] px-5 py-2.5 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#35c6c9]"
          >
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
}