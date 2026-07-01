import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/admin/LogoutButton";
import { enforceDeviceLimit } from "@/lib/account-sharing";
import {
  BarChart3,
  FileText,
  Home,
  Sparkles,
  Users,
  LifeBuoy,
} from "lucide-react";

const adminNavItems = [
  { label: "Home", href: "/admin", icon: Home },
  { label: "Resources", href: "/admin/resources", icon: FileText },
  { label: "Teachers", href: "/admin/teachers", icon: Users },
  { label: "Support", href: "/admin/support", icon: LifeBuoy },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "AI Tools", href: "/admin/ai", icon: Sparkles },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const deviceCheck = await enforceDeviceLimit();

  if (!deviceCheck.allowed) {
  if (deviceCheck.reason === "DEVICE_REVOKED") {
    redirect("/login?reason=device_revoked");
  }

  redirect("/account/device-limit");
}

  return (
    <div className="min-h-screen bg-[#fff8f0]">
      <header className="sticky top-0 z-50 border-b border-amber-100/80 bg-[#fff8f0]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <Link href="/admin" className="flex items-center gap-4">
            <div className="relative h-14 w-14 shrink-0">
              <Image
                src="/images/logo.png"
                alt="Classroom by Tina"
                width={56}
                height={56}
                priority
                className="h-14 w-14 object-contain"
              />
            </div>

            <div>
              <h1 className="text-xl font-black leading-tight text-[#1f2a44]">
                Classroom by Tina
              </h1>

              <p className="mt-0.5 text-sm font-medium text-slate-500">
                Admin Dashboard
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-black text-[#1f2a44] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#f5b942]"
            >
              Teacher Dashboard
            </Link>

            <LogoutButton />
          </div>
        </div>

        <nav className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-6 pb-3">
          {adminNavItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-[#3b82f6]"
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