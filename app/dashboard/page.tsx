import { redirect } from "next/navigation";
import { BookOpen, Clock, Download, Star } from "lucide-react";

import ContinueTeachingCard from "@/components/dashboard/ContinueTeachingCard";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import GradeCard from "@/components/dashboard/GradeCard";
import StatsCard from "@/components/dashboard/StatsCard";
import ResourceCard from "@/components/resources/ResourceCard";
import SectionTitle from "@/components/ui/SectionTitle";
import { getResources } from "@/services";
import { createClient } from "@/utils/supabase/server";

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
    pageSize: 3,
  });

  const { data: favoriteRows } = await supabase
  .from("resource_favorites")
  .select("resource_id")
  .eq("user_id", user.id);

  const favoriteResourceIds = new Set(
    (favoriteRows ?? []).map((favorite) => favorite.resource_id)
  );

  const recentResources = await getResources({
    status: "published",
    sortBy: "updatedAt",
    sortOrder: "desc",
    pageSize: 3,
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

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {recentResources.items.map((resource) => (
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

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {recentResources.items.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>
    </>
  );
}