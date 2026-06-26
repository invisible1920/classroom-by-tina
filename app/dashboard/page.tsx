import { redirect } from "next/navigation";
import { BookOpen, Download, Star, Users } from "lucide-react";

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

  const featuredResources = await getResources({
    featured: true,
    status: "published",
    pageSize: 3,
  });

  const recentResources = await getResources({
    status: "published",
    sortBy: "updatedAt",
    sortOrder: "desc",
    pageSize: 3,
  });

  return (
    <>
      <DashboardHeader />

      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Resources"
          value="245"
          subtitle="Across K–2"
          icon={<BookOpen size={24} />}
        />

        <StatsCard
          title="Featured"
          value="12"
          subtitle="This week"
          icon={<Star size={24} />}
        />

        <StatsCard
          title="Downloads"
          value="3,422"
          subtitle="Teacher downloads"
          icon={<Download size={24} />}
        />

        <StatsCard
          title="Teachers"
          value="218"
          subtitle="Founding members"
          icon={<Users size={24} />}
        />
      </section>

      <ContinueTeachingCard />

      <section className="mt-12">
        <SectionTitle
          eyebrow="Teaching Library"
          title="Browse by Grade"
          description="Start with the grade level, then move into subject, week, and resource type."
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
          eyebrow="This Week"
          title="Featured Resources"
          description="High-priority resources Tina wants teachers to see first."
        />

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {featuredResources.items.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
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