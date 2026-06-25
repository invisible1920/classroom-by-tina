import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-amber-100 px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-950 text-sm font-black text-white">
            T
          </div>

          <div>
            <p className="font-black text-slate-950">Classroom by Tina</p>
            <p className="text-sm font-semibold text-slate-500">
              Premium K–2 teaching resources.
            </p>
          </div>
        </Link>

        <p className="text-sm font-semibold text-slate-500">
          © 2026 Classroom by Tina. Built for teachers.
        </p>
      </div>
    </footer>
  );
}