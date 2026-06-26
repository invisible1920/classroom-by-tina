import Link from "next/link";
import { getResource } from "@/services";
import { notFound } from "next/navigation";

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const resource = await getResource(id);

  if (!resource) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <Link href="/dashboard/first-grade" className="text-blue-600">
        ← Back to First Grade
      </Link>

      <section className="mt-8 max-w-4xl rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
        <p className="text-sm font-semibold text-blue-600">
          {resource.grade} · {resource.subject} · Week {resource.week}
        </p>

        <h1 className="mt-4 text-4xl font-bold text-slate-900">
          {resource.title}
        </h1>

        <p className="mt-4 text-lg text-slate-600">{resource.description}</p>

        <button className="mt-10 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700">
          Download Resource
        </button>
      </section>
    </main>
  );
}