import Link from "next/link";
import { resources } from "@/lib/resources";
import ResourceCard from "@/components/resources/ResourceCard";

export default function DashboardPage() {
  const featuredResources = resources.filter((resource) => resource.featured);
  const recentResources = resources.slice(0, 3);

  return (
    <>
      <section>
        <p className="font-semibold uppercase tracking-widest text-blue-600">
          Teacher Dashboard
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Welcome back 👋
        </h1>

        <p className="mt-3 text-lg text-slate-600">
          Find lesson plans, centers, assessments, and classroom resources fast.
        </p>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <input
            placeholder="Search everything..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-slate-900">
          Featured This Week
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {featuredResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Browse by Grade</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            { name: "Kindergarten", href: "/dashboard/kindergarten" },
            { name: "First Grade", href: "/dashboard/first-grade" },
            { name: "Second Grade", href: "/dashboard/second-grade" },
          ].map((grade) => (
            <Link
              key={grade.name}
              href={grade.href}
              className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-2xl font-bold text-slate-900">
                {grade.name}
              </h3>

              <p className="mt-3 text-slate-600">
                Browse lessons, centers, activities, and assessments.
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Recently Added</h2>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {recentResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>
    </>
  );
}