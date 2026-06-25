import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Kindergarten", href: "/dashboard/kindergarten" },
    { label: "First Grade", href: "/dashboard/first-grade" },
    { label: "Second Grade", href: "/dashboard/second-grade" },
    { label: "Favorites", href: "/dashboard/favorites" },
    { label: "Downloads", href: "/dashboard/downloads" },
    { label: "Account", href: "/dashboard/account" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 h-screen w-72 border-r border-slate-200 bg-white p-6">
        <Link href="/" className="text-2xl font-bold text-slate-900">
          Classroom by Tina
        </Link>

        <nav className="mt-10 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl px-4 py-3 font-medium text-slate-700 hover:bg-slate-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="ml-72 min-h-screen p-10">{children}</main>
    </div>
  );
}