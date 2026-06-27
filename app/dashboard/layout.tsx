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
    { label: "Kindergarten", href: "/dashboard/kindergarten", icon: Sparkles },
    { label: "First Grade", href: "/dashboard/first-grade", icon: BookOpen },
    { label: "Second Grade", href: "/dashboard/second-grade", icon: BookOpen },
  ];

  const resources = [
    { label: "Favorites", href: "/dashboard/favorites", icon: Heart },
    { label: "Downloads", href: "/dashboard/downloads", icon: Download },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-slate-200 bg-white p-6">
        <Link href="/" className="block">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Classroom
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">by Tina</h1>
        </Link>

        <nav className="mt-10 flex-1 space-y-8">
          <div>
            <p className="px-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              Main
            </p>

            <Link
              href="/dashboard"
              className="mt-3 flex items-center gap-3 rounded-xl bg-blue-50 px-4 py-3 font-semibold text-blue-700"
            >
              <Home size={20} />
              Dashboard
            </Link>
          </div>

          <div>
            <p className="px-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              Grades
            </p>

            <div className="mt-3 space-y-2">
              {grades.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
                  >
                    <Icon size={20} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <p className="px-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              Resources
            </p>

            <div className="mt-3 space-y-2">
              {resources.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
                  >
                    <Icon size={20} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <p className="px-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              Settings
            </p>

            <Link
              href="/dashboard/account"
              className="mt-3 flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
            >
              <Settings size={20} />
              Account
            </Link>
            
          </div>
        </nav>
        <form action={signOut} className="border-t border-slate-200 pt-4">
  <button
    type="submit"
    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-red-50 hover:text-red-600"
  >
    <LogOut size={20} />
    Sign Out
  </button>
</form>
      </aside>

      <main className="ml-72 min-h-screen p-10">{children}</main>
    </div>
  );
}