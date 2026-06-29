import { redirect } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  Download,
  Sparkles,
  Star,
} from "lucide-react";

import ContinueTeachingCard from "@/components/dashboard/ContinueTeachingCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import GradeCard from "@/components/dashboard/GradeCard";
import StatsCard from "@/components/dashboard/StatsCard";
import ResourceCard from "@/components/resources/ResourceCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { getResources } from "@/services";
import { createClient } from "@/utils/supabase/server";
import { getFavoriteResourceIds } from "@/lib/favorites";

const gradeLinks = [
  {
    name: "Kindergarten",
    href: "/dashboard/kindergarten",
    description: "Foundational literacy, number sense, centers, and routines.",
  },
  {
    name: "First Grade",
    href: "/dashboard/first-grade",
    description: "Weekly ELA, math, science, and social studies resources.",
  },
  {
    name: "Second Grade",
    href: "/dashboard/second-grade",
    description: "Structured lessons, assessments, activities, and review.",
  },
];

const aiTools = [
  {
    emoji: "✨",
    label: "AI Planning",
    title: "Lesson Planner",
    description: "Create CMS-aligned K–2 lesson ideas with a cleaner weekly plan.",
    badge: "Teacher workflow",
    gradient: "from-[#a66dd4] to-[#35c6c9]",
    bg: "bg-[#f7efff]",
    href: "/dashboard/ai/lesson-planner",
  },
  {
    emoji: "🧠",
    label: "AI Teaching Tools",
    title: "Activity Generator",
    description: "Turn a skill into centers, small group work, or quick practice.",
    badge: "Classroom ready",
    gradient: "from-[#ff6f91] to-[#ff8a3d]",
    bg: "bg-[#fff0f4]",
    href: "/dashboard/ai/activity-generator",
  },
  {
    emoji: "💌",
    label: "AI Tools",
    title: "Parent Letter Helper",
    description: "Draft friendly CMS family communication in a teacher voice.",
    badge: "CMS families",
    gradient: "from-[#f7b928] to-[#ff8a3d]",
    bg: "bg-[#fff7db]",
    href: "/dashboard/ai/parent-letter",
  },
];

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, subscription_status")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile) {
    redirect("/signup");
  }

  if (profile.role !== "admin" && profile.subscription_status !== "pro") {
    redirect("/subscribe");
  }

  const displayName =
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Teacher";

  const featuredResources = await getResources({
    featured: true,
    status: "published",
    pageSize: 5,
  });

  const favoriteResourceIds = new Set(await getFavoriteResourceIds(user.id));

  const recentResources = await getResources({
    status: "published",
    sortBy: "updatedAt",
    sortOrder: "desc",
    pageSize: 5,
  });

  const thirtyDaysAgo = new Date(
    Date.now() - 30 * 24 * 60 * 60 * 1000
  ).toISOString();

  const [
    { count: resourceCount },
    { count: featuredCount },
    { count: myDownloadCount },
    { count: recentlyAddedCount },
  ] = await Promise.all([
    supabase
      .from("resources")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("resources")
      .select("id", { count: "exact", head: true })
      .eq("status", "published")
      .eq("featured", true),
    supabase
      .from("resource_downloads")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id),
    supabase
      .from("resources")
      .select("id", { count: "exact", head: true })
      .eq("status", "published")
      .gte("created_at", thirtyDaysAgo),
  ]);

  return (
    <>
      {profile.role === "admin" && (
        <div className="mb-6 flex justify-end">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-700 shadow-sm transition hover:border-blue-600 hover:text-blue-600"
          >
            <ArrowLeft size={18} />
            Back to Admin
          </Link>
        </div>
      )}

      <DashboardHeader name={displayName} />

      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Resources"
          value={String(resourceCount ?? 0)}
          subtitle="Available to you"
          icon={<BookOpen size={24} />}
        />
        <StatsCard
          title="Featured"
          value={String(featuredCount ?? 0)}
          subtitle="Recommended resources"
          icon={<Star size={24} />}
        />
        <StatsCard
          title="New"
          value={String(recentlyAddedCount ?? 0)}
          subtitle="Added this month"
          icon={<Clock size={24} />}
        />
        <StatsCard
          title="My Downloads"
          value={String(myDownloadCount ?? 0)}
          subtitle="Resources downloaded"
          icon={<Download size={24} />}
        />
      </section>

      <ContinueTeachingCard />

      <section className="mt-12">
        <SectionTitle
          eyebrow="Teaching Library"
          title="Browse by Grade"
          description="Start with the grade level, then move into subject, month, week, and resource type."
        />

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {gradeLinks.map((grade) => (
            <GradeCard
              key={grade.name}
              name={grade.name}
              href={grade.href}
              description={grade.description}
            />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionTitle
          eyebrow="Recommended"
          title="Featured Resources"
          description="High-priority resources selected for teachers to see first."
        />

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {featuredResources.items.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              isFavorite={favoriteResourceIds.has(resource.id)}
            />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <SectionTitle
          eyebrow="Recently Added"
          title="New Teaching Materials"
          description="Freshly added resources for planning, centers, and classroom instruction."
        />

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {recentResources.items.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              isFavorite={favoriteResourceIds.has(resource.id)}
            />
          ))}
        </div>
      </section>

      <section className="mt-12 overflow-hidden rounded-[2rem] border border-[#eadcff] bg-white p-8 shadow-[0_20px_60px_rgba(23,34,59,0.08)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#f7efff] px-4 py-2 text-sm font-black text-[#8a4fba]">
              <Sparkles size={16} />
              AI Tools
            </div>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#17223b]">
              Need help planning?
            </h2>

            <p className="mt-2 max-w-2xl text-base font-medium leading-7 text-slate-600">
              Use Tina’s AI tools when you want a little extra support turning a
              skill, activity idea, or family message into something polished.
            </p>
          </div>

          <Link
            href="/dashboard/ai"
            className="inline-flex items-center justify-center rounded-full bg-[#35c6c9] px-5 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Open AI Tools →
          </Link>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {aiTools.map((tool) => (
            <Link
              key={tool.title}
              href={tool.href}
              className={`group rounded-3xl ${tool.bg} p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${tool.gradient} text-3xl shadow-lg`}
              >
                {tool.emoji}
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#17223b] shadow-sm">
                  {tool.label}
                </span>
                <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-black text-slate-600">
                  {tool.badge}
                </span>
              </div>

              <h3 className="mt-4 text-xl font-black text-[#17223b]">
                {tool.title}
              </h3>

              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                {tool.description}
              </p>

              <div className="mt-5 inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-black text-[#35c6c9] shadow-sm transition group-hover:translate-x-1">
                Open Tool →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}