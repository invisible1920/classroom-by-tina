import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-100/80 bg-[#fff8f0]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#1f2a44] text-lg font-black text-white shadow-sm">
            T
          </div>

          <div>
            <p className="text-lg font-black tracking-tight text-[#1f2a44]">
              Classroom by Tina
            </p>
            <p className="-mt-1 text-xs font-black uppercase tracking-widest text-amber-700">
              K–2 Teacher Platform
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-bold text-slate-600 hover:text-[#1f2a44]">
            Features
          </a>
          <a href="#preview" className="text-sm font-bold text-slate-600 hover:text-[#1f2a44]">
            Platform
          </a>
          <a href="#pricing" className="text-sm font-bold text-slate-600 hover:text-[#1f2a44]">
            Pricing
          </a>
          <a href="#about" className="text-sm font-bold text-slate-600 hover:text-[#1f2a44]">
            About
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-full px-5 py-2.5 text-sm font-black text-[#1f2a44] hover:bg-white sm:inline-flex"
          >
            Sign in
          </Link>

          <Link
            href="/signup"
            className="rounded-full bg-[#1f2a44] px-5 py-2.5 text-sm font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Start free
          </Link>
        </div>
      </nav>
    </header>
  );
}