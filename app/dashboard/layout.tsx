import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { signOut } from "@/app/actions/auth";
import { enforceDeviceLimit } from "@/lib/account-sharing";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const deviceCheck = await enforceDeviceLimit();

  if (!deviceCheck.allowed) {
    redirect("/account/device-limit");
  }

  const grades = [
    { label: "Kindergarten", href: "/dashboard/kindergarten", emoji: "✨" },
    { label: "First Grade", href: "/dashboard/first-grade", emoji: "📚" },
    { label: "Second Grade", href: "/dashboard/second-grade", emoji: "⭐" },
  ];

  const resources = [
    { label: "Favorites", href: "/dashboard/favorites", emoji: "💛" },
    { label: "Downloads", href: "/dashboard/downloads", emoji: "📥" },
  ];

  const tools = [{ label: "AI Tools", href: "/dashboard/ai", emoji: "🤖" }];

  return (
    <div className="min-h-screen bg-[#fffaf3]">
      <aside className="fixed left-0 top-0 flex h-dvh w-72 flex-col overflow-hidden border-r border-[#ffe7b5] bg-white p-6">
        <Link href="/" className="shrink-0 flex items-center gap-3">
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
            <p className="text-lg font-black leading-tight text-[#17223b]">
              Classroom by Tina
            </p>
            <p className="text-sm font-bold text-[#ff8a3d]">
              CMS K–2 Resources 🍎
            </p>
          </div>
        </Link>

        <nav className="mt-8 min-h-0 flex-1 space-y-7 overflow-y-auto pr-1">
          <div>
            <p className="px-4 text-xs font-black uppercase tracking-widest text-slate-400">
              Main
            </p>

            <Link
              href="/dashboard"
              className="mt-3 flex items-center gap-3 rounded-2xl bg-[#35c6c9]/12 px-4 py-3 font-black text-[#35c6c9]"
            >
              <span className="w-6 text-lg">🏠</span>
              Dashboard
            </Link>
          </div>

          <div>
            <p className="px-4 text-xs font-black uppercase tracking-widest text-slate-400">
              Grades
            </p>

            <div className="mt-3 space-y-2">
              {grades.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 font-bold text-slate-600 transition hover:bg-[#fff3c4] hover:text-[#17223b]"
                >
                  <span className="w-6 text-lg">{item.emoji}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="px-4 text-xs font-black uppercase tracking-widest text-slate-400">
              AI
            </p>

            <div className="mt-3 space-y-2">
              {tools.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-2xl bg-[#f7efff] px-4 py-3 font-black text-[#8a4fba] transition hover:bg-[#eadcff] hover:text-[#17223b]"
                >
                  <span className="w-6 text-lg">{item.emoji}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="px-4 text-xs font-black uppercase tracking-widest text-slate-400">
              Resources
            </p>

            <div className="mt-3 space-y-2">
              {resources.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 font-bold text-slate-600 transition hover:bg-[#ffeaf0] hover:text-[#17223b]"
                >
                  <span className="w-6 text-lg">{item.emoji}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="px-4 text-xs font-black uppercase tracking-widest text-slate-400">
              Settings
            </p>

            <Link
              href="/dashboard/account"
              className="mt-3 flex items-center gap-3 rounded-2xl px-4 py-3 font-bold text-slate-600 transition hover:bg-[#e8fbfb] hover:text-[#17223b]"
            >
              <span className="w-6 text-lg">⚙️</span>
              Account
            </Link>
          </div>
        </nav>

        <form action={signOut} className="shrink-0 border-t border-[#ffe7b5] pt-4">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 font-bold text-slate-600 transition hover:bg-[#ff6f91]/10 hover:text-[#ff6f91]"
          >
            <span className="w-6 text-lg">👋</span>
            Sign Out
          </button>
        </form>
      </aside>

      <main className="ml-72 min-h-screen p-10">{children}</main>
    </div>
  );
}