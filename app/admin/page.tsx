import Link from "next/link";
import {
  BarChart3,
  FilePlus2,
  FileText,
  GraduationCap,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";

import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { getResources } from "@/services";

const adminActions = [
  {
    title: "Upload Resource",
    description: "Add lesson plans, centers, assessments, homework, and more.",
    href: "/admin/resources/new",
    icon: FilePlus2,
  },
  {
    title: "Manage Resources",
    description: "Edit titles, weeks, standards, categories, and featured items.",
    href: "/admin/resources",
    icon: FileText,
  },
  {
    title: "Teachers",
    description: "View teacher accounts, memberships, downloads, and activity.",
    href: "/admin/teachers",
    icon: Users,
  },
  {
    title: "Analytics",
    description: "Track downloads, popular grades, subjects, and conversions.",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "AI Tools",
    description: "Future tools for homework, parent letters, and differentiation.",
    href: "/admin/ai",
    icon: Sparkles,
  },
  {
    title: "Settings",
    description: "Manage account, branding, pricing, and platform settings.",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default async function AdminPage() {
  const allResources = await getResources({ pageSize: 1 });
  const featuredResources = await getResources({ featured: true, pageSize: 1 });
  const firstGradeResources = await getResources({
    grade: "First Grade",
    pageSize: 1,
  });

  const totalResources = allResources.total;

  return (
    <main className="min-h-screen bg-[#fff8f0] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] bg-[#1f2a44] p-8 text-white shadow-2xl shadow-slate-950/15">
          <p className="text-sm font-black uppercase tracking-widest text-[#f5b942]">
            Admin Portal
          </p>

          <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-4xl font-black tracking-tight md:text-5xl">
                Tina’s Control Center
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
                Upload resources, manage the teaching library, review analytics,
                and prepare Classroom by Tina for paid subscribers.
              </p>
            </div>

            <Link
              href="/dashboard"
              className="inline-flex w-fit items-center justify-center rounded-full bg-white px-6 py-3 font-black text-[#1f2a44] transition hover:-translate-y-0.5 hover:bg-[#f5b942]"
            >
              View Teacher Dashboard
            </Link>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-3">
          <AdminStatCard
            label="Total Resources"
            value={String(totalResources)}
            detail="From resource service"
          />

          <AdminStatCard
            label="Featured"
            value={String(featuredResources.total)}
            detail="Highlighted for teachers"
          />

          <AdminStatCard
            label="First Grade"
            value={String(firstGradeResources.total)}
            detail="Resources ready for launch"
          />
        </section>

        <section className="mt-12">
          <SectionTitle
            eyebrow="Admin Actions"
            title="Manage the platform"
            description="This is the first version of Tina’s admin portal. Next we’ll add upload forms, then connect everything to Supabase."
          />

          <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {adminActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link key={action.title} href={action.href} className="group">
                  <Card className="h-full p-7">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3b82f6]/10 text-[#3b82f6] transition group-hover:scale-105">
                      <Icon size={24} />
                    </div>

                    <h2 className="mt-6 text-2xl font-black text-[#1f2a44]">
                      {action.title}
                    </h2>

                    <p className="mt-3 leading-7 text-slate-600">
                      {action.description}
                    </p>

                    <p className="mt-6 font-black text-[#3b82f6] transition group-hover:translate-x-1">
                      Open →
                    </p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border border-[#f5b942]/30 bg-white p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-[#f5b942]/20 p-3 text-[#1f2a44]">
              <GraduationCap size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-black text-[#1f2a44]">
                Next build step
              </h2>

              <p className="mt-3 max-w-3xl leading-7 text-slate-600">
                The resource service layer is now the boundary between pages and data. Next we’ll make the CMS actions functional, then swap the fake database for Supabase without rewriting pages.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function AdminStatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <Card>
      <p className="text-sm font-black uppercase tracking-widest text-slate-400">
        {label}
      </p>

      <p className="mt-3 text-4xl font-black text-[#1f2a44]">{value}</p>

      <p className="mt-2 font-semibold text-slate-500">{detail}</p>
    </Card>
  );
}