import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-amber-100/80 bg-[#fffaf3]/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-lg font-black text-white shadow-sm">
            T
          </div>

          <div>
            <p className="text-lg font-black tracking-tight text-slate-950">
              Classroom by Tina
            </p>
            <p className="-mt-1 text-xs font-semibold uppercase tracking-widest text-amber-700">
              K–2 Teacher OS
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-semibold text-slate-600 hover:text-slate-950">
            Features
          </a>
          <a href="#preview" className="text-sm font-semibold text-slate-600 hover:text-slate-950">
            Platform
          </a>
          <a href="#pricing" className="text-sm font-semibold text-slate-600 hover:text-slate-950">
            Pricing
          </a>
          <a href="#about" className="text-sm font-semibold text-slate-600 hover:text-slate-950">
            About Tina
          </a>
        </div>

        <a
          href="#pricing"
          className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          Join early
        </a>
      </nav>
    </header>
  );
}