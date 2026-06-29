import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Download,
  Heart,
  Home,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react";

import { signOut } from "@/app/actions/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const grades = [
    { label: "Kindergarten", href: "/dashboard/kindergarten", icon: Sparkles, emoji: "✨" },
    { label: "First Grade", href: "/dashboard/first-grade", icon: BookOpen, emoji: "📚" },
    { label: "Second Grade", href: "/dashboard/second-grade", icon: BookOpen, emoji: "⭐" },
  ];

  const resources = [
    { label: "Favorites", href: "/dashboard/favorites", icon: Heart, emoji: "💛" },
    { label: "Downloads", href: "/dashboard/downloads", icon: Download, emoji: "📥" },
  ];

  return (
    <div className="min-h-screen bg-[#fffaf3]">
      <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-[#ffe7b5] bg-white p-6">
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
            <p className="text-lg font-black leading-tight text-[#17223b]">
              Classroom by Tina
            </p>
            <p className="text-sm font-bold text-[#ff8a3d]">
              CMS K–2 Resources 🍎
            </p>
          </div>
        </Link>

        <nav className="mt-10 flex-1 space-y-8">
          <div>
            <p className="px-4 text-xs font-black uppercase tracking-widest text-slate-400">
              Main
            </p>

            <Link
              href="/dashboard"
              className="mt-3 flex items-center gap-3 rounded-2xl bg-[#35c6c9]/12 px-4 py-3 font-black text-[#35c6c9]"
            >
              <span className="text-lg">🏠</span>
              <Home size={19} />
              Dashboard
            </Link>
          </div>

          <div>
            <p className="px-4 text-xs font-black uppercase tracking-widest text-slate-400">
              Grades
            </p>

            <div className="mt-3 space-y-2">
              {grades.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 font-bold text-slate-600 transition hover:bg-[#fff3c4] hover:text-[#17223b]"
                  >
                    <span className="text-lg">{item.emoji}</span>
                    <Icon size={19} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <p className="px-4 text-xs font-black uppercase tracking-widest text-slate-400">
              Resources
            </p>

            <div className="mt-3 space-y-2">
              {resources.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-2xl px-4 py-3 font-bold text-slate-600 transition hover:bg-[#ffeaf0] hover:text-[#17223b]"
                  >
                    <span className="text-lg">{item.emoji}</span>
                    <Icon size={19} />
                    {item.label}
                  </Link>
                );
              })}
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
              <span className="text-lg">⚙️</span>
              <Settings size={19} />
              Account
            </Link>
          </div>
        </nav>

        <form action={signOut} className="border-t border-[#ffe7b5] pt-4">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 font-bold text-slate-600 transition hover:bg-[#ff6f91]/10 hover:text-[#ff6f91]"
          >
            <span className="text-lg">👋</span>
            <LogOut size={19} />
            Sign Out
          </button>
        </form>
      </aside>

      <main className="ml-72 min-h-screen p-10">{children}</main>
    </div>
  );
}