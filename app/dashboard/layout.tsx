import Link from "next/link";
import {
  BookOpen,
  Download,
  Heart,
  Home,
  Settings,
  Sparkles,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: Home },
    { label: "Kindergarten", href: "/dashboard/kindergarten", icon: Sparkles },
    { label: "First Grade", href: "/dashboard/first-grade", icon: BookOpen },
    { label: "Second Grade", href: "/dashboard/second-grade", icon: BookOpen },
    { label: "Favorites", href: "/dashboard/favorites", icon: Heart },
    { label: "Downloads", href: "/dashboard/downloads", icon: Download },
    { label: "Account", href: "/dashboard/account", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 h-screen w-72 border-r border-slate-200 bg-white p-6">
        <Link href="/" className="text-2xl font-bold text-slate-900">
          Classroom by Tina
        </Link>

        <nav className="mt-10 space-y-2">
          {navItems.map((item) => {
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
        </nav>
      </aside>

      <main className="ml-72 min-h-screen p-10">{children}</main>
    </div>
  );
}