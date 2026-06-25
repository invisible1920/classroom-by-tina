import Link from "next/link";
import {
  BarChart3,
  FileText,
  Home,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

const adminNavItems = [
  {
    label: "Admin Home",
    href: "/admin",
    icon: Home,
  },
  {
    label: "Resources",
    href: "/admin/resources",
    icon: FileText,
  },
  {
    label: "Teachers",
    href: "/admin/teachers",
    icon: Users,
  },
  {
    label: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    label: "AI Tools",
    href: "/admin/ai",
    icon: Sparkles,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fff8f0]">
      <header className="sticky top-0 z-50 border-b border-amber-100/80 bg-[#fff8f0]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#1f2a44] text-sm font-black text-white">
              T
            </div>

            <div>
              <p className="font-black text-[#1f2a44]">Classroom Admin</p>
              <p className="-mt-0.5 text-xs font-bold uppercase tracking-widest text-[#f5b942]">
                Tina Control Center
              </p>
            </div>
          </Link>

          <Link
            href="/dashboard"
            className="rounded-full bg-white px-5 py-2.5 text-sm font-black text-[#1f2a44] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f5b942]"
          >
            Teacher Dashboard
          </Link>
        </div>

        <nav className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 pb-4">
          {adminNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex shrink-0 items-center gap-2 rounded-full border border-amber-100 bg-white px-4 py-2 text-sm font-black text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:text-[#3b82f6]"
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {children}
    </div>
  );
}