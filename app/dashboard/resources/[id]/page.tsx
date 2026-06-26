import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { getResource } from "@/services";
import { createClient } from "@/utils/supabase/server";

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

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

  const resource = await getResource(id);

  if (!resource || resource.status !== "published") {
    notFound();
  }

  return (
    <main>
      <Link
        href="/dashboard"
        className="inline-flex font-bold text-blue-600 hover:text-blue-700"
      >
        ← Back to Dashboard
      </Link>

      <section className="mt-8 max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {resource.thumbnail && (
          <img
            src={resource.thumbnail}
            alt={resource.title}
            className="h-72 w-full object-cover"
          />
        )}

        <div className="p-10">
          <p className="text-sm font-semibold text-blue-600">
            {resource.grade} · {resource.subject}
            {resource.week ? ` · Week ${resource.week}` : ""}
          </p>

          <h1 className="mt-4 text-4xl font-bold text-slate-900">
            {resource.title}
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            {resource.description}
          </p>

          <div className="mt-8 grid gap-4 rounded-2xl bg-slate-50 p-6 sm:grid-cols-3">
            <div>
              <p className="text-sm font-bold text-slate-500">
                Resource Type
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                {resource.category || "Not set"}
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-500">
                Standard
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                {resource.standard || "Not set"}
              </p>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-500">
                Status
              </p>
              <p className="mt-1 font-semibold capitalize text-slate-900">
                {resource.status}
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {resource.pdf ? (
              <a
                href={resource.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700"
              >
                Download Resource
              </a>
            ) : (
              <button
                disabled
                className="rounded-xl bg-slate-300 px-8 py-4 font-semibold text-white"
              >
                PDF Coming Soon
              </button>
            )}

            <Link
  href="/dashboard"
  className="inline-flex rounded-xl border border-slate-200 px-8 py-4 font-semibold text-slate-700 hover:bg-slate-50"
>
  ← Back to Dashboard
</Link>
          </div>
        </div>
      </section>
    </main>
  );
}