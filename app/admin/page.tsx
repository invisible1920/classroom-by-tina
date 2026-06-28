import Link from "next/link";
import {
  BarChart3,
  FilePlus2,
  FileText,
  Settings,
  Sparkles,
  Users,
  ArrowRight,
} from "lucide-react";

import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { getResources } from "@/services";
import { createClient } from "@/utils/supabase/server";

const adminActions = [
  {
    title: "Upload Resource",
    description: "Add a new teaching resource to the library.",
    href: "/admin/resources/new",
    icon: FilePlus2,
    primary: true,
  },
  {
    title: "Manage Resources",
    description: "Edit, publish, feature, duplicate, or archive resources.",
    href: "/admin/resources",
    icon: FileText,
  },
  {
    title: "Teachers",
    description: "Review teacher accounts, subscriptions, downloads, and activity.",
    href: "/admin/teachers",
    icon: Users,
  },
  {
    title: "Analytics",
    description: "View resource performance and teacher engagement.",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "AI Tools",
    description: "Generate lessons, worksheets, assessments, and passages.",
    href: "/admin/ai",
    icon: Sparkles,
  },
  {
    title: "Settings",
    description: "Manage branding, billing, platform settings, and policies.",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Admin";

  const allResources = await getResources({ pageSize: 1 });
  const featuredResources = await getResources({ featured: true, pageSize: 1 });
  const kindergartenResources = await getResources({
    grade: "Kindergarten",
    pageSize: 1,
  });
  const firstGradeResources = await getResources({
    grade: "First Grade",
    pageSize: 1,
  });
  const secondGradeResources = await getResources({
    grade: "Second Grade",
    pageSize: 1,
  });

  const totalResources = allResources.total;

  return (
    <main className="min-h-screen bg-[#fff8f0] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] bg-[#1f2a44] p-8 text-white shadow-2xl shadow-slate-950/15">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-[#f5b942]">
                Classroom by Tina Admin
              </p>

              <h1 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                Welcome back, {displayName}
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
                Manage resources, teacher accounts, subscriptions, downloads,
                analytics, and platform settings.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/admin/resources/new"
                className="inline-flex w-fit items-center justify-center rounded-full bg-[#f5b942] px-6 py-3 font-black text-[#1f2a44] transition hover:-translate-y-0.5 hover:bg-white"
              >
                Upload Resource
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex w-fit items-center justify-center rounded-full bg-white/10 px-6 py-3 font-black text-white ring-1 ring-white/20 transition hover:-translate-y-0.5 hover:bg-white hover:text-[#1f2a44]"
              >
                View Teacher Dashboard
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3 xl:grid-cols-5">
          <AdminStatCard
            label="Total Resources"
            value={String(totalResources)}
            detail="Published and draft resources"
          />

          <AdminStatCard
            label="Featured"
            value={String(featuredResources.total)}
            detail="Shown first to teachers"
          />

          <AdminStatCard
            label="Kindergarten"
            value={String(kindergartenResources.total)}
            detail="Grade library"
          />

          <AdminStatCard
            label="First Grade"
            value={String(firstGradeResources.total)}
            detail="Grade library"
          />

          <AdminStatCard
            label="Second Grade"
            value={String(secondGradeResources.total)}
            detail="Grade library"
          />
        </section>

        <section className="mt-12">
          <SectionTitle
            eyebrow="Admin Tools"
            title="Platform management"
            description="Control the resource library, teacher accounts, subscriptions, analytics, and classroom content tools."
          />

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {adminActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link key={action.title} href={action.href} className="group">
                  <Card
                    className={`h-full p-6 transition hover:-translate-y-0.5 hover:shadow-lg ${
                      action.primary
                        ? "border-[#f5b942]/50 bg-[#f5b942]/10"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-2xl transition group-hover:scale-105 ${
                          action.primary
                            ? "bg-[#f5b942] text-[#1f2a44]"
                            : "bg-[#3b82f6]/10 text-[#3b82f6]"
                        }`}
                      >
                        <Icon size={22} />
                      </div>

                      <ArrowRight
                        size={18}
                        className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#3b82f6]"
                      />
                    </div>

                    <h2 className="mt-5 text-xl font-black text-[#1f2a44]">
                      {action.title}
                    </h2>

                    <p className="mt-2 leading-7 text-slate-600">
                      {action.description}
                    </p>
                  </Card>
                </Link>
              );
            })}
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
    <Card className="p-5">
      <p className="text-xs font-black uppercase tracking-widest text-slate-400">
        {label}
      </p>

      <p className="mt-3 text-3xl font-black text-[#1f2a44]">{value}</p>

      <p className="mt-2 text-sm font-semibold text-slate-500">{detail}</p>
    </Card>
  );
}