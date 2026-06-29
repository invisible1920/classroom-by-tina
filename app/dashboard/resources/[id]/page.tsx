import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Download,
  FileText,
  GraduationCap,
  Layers3,
  Star,
} from "lucide-react";

import { getResource } from "@/services";
import { createClient } from "@/utils/supabase/server";

async function trackDownload(formData: FormData) {
  "use server";

  const resourceId = String(formData.get("resourceId") ?? "");
  const resourceTitle = String(formData.get("resourceTitle") ?? "");
  const pdfUrl = String(formData.get("pdfUrl") ?? "");

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (resourceId && resourceTitle) {
    const { error } = await supabase.from("resource_downloads").insert({
      user_id: user.id,
      resource_id: resourceId,
      resource_title: resourceTitle,
    });

    if (error) {
      console.error("DOWNLOAD TRACKING ERROR:", error);
    }
  }

  redirect(pdfUrl);
}

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
      className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-black text-[#35c6c9] shadow-sm transition hover:bg-[#e8fbfb]"
    >
      <ArrowLeft size={16} />
      Back to Dashboard
    </Link>

    <section className="mt-8 grid max-w-6xl gap-6 lg:grid-cols-[1fr_380px]">
      <div className="overflow-hidden rounded-[2rem] border border-[#ffe7b5] bg-white shadow-sm">
        <div className="relative h-72 bg-[#fff3c4]">
          {resource.thumbnail ? (
            <img
              src={resource.thumbnail}
              alt={resource.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <FileText size={48} className="text-[#35c6c9]" />
            </div>
          )}
        </div>

        <div className="p-8">
          <div className="flex flex-wrap gap-2">
            <InfoPill icon={<GraduationCap size={15} />} label={resource.grade} />
            <InfoPill icon={<FileText size={15} />} label={resource.subject} />
            <InfoPill
              icon={<CalendarDays size={15} />}
              label={`${resource.month} · Week ${resource.week}`}
            />
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-[#17223b]">
            {resource.title}
          </h1>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            {resource.description}
          </p>
        </div>
      </div>

      <aside className="h-fit rounded-[2rem] border border-[#ffe7b5] bg-white p-6 shadow-sm">
        <p className="text-sm font-black uppercase tracking-widest text-[#ff8a3d]">
          Resource Details
        </p>

        <div className="mt-5 grid gap-3">
          <DetailBox emoji="📚" label="Type" value={resource.category || "Not set"} />
          <DetailBox emoji="🎯" label="Standard" value={resource.standard || "Not set"} />
          <DetailBox emoji="📅" label="Week" value={`${resource.month} · Week ${resource.week}`} />
          <DetailBox emoji="✅" label="Status" value={resource.status} />
        </div>

        <div className="mt-6 grid gap-3">
          {resource.pdf ? (
            <form action={trackDownload}>
              <input type="hidden" name="resourceId" value={resource.id} />
              <input type="hidden" name="resourceTitle" value={resource.title} />
              <input type="hidden" name="pdfUrl" value={resource.pdf} />

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#35c6c9] px-6 py-4 font-black text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#2fb4b7]"
              >
                <Download size={18} />
                Download Resource
              </button>
            </form>
          ) : (
            <button
              disabled
              className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-200 px-6 py-4 font-black text-slate-500"
            >
              <Layers3 size={18} />
              PDF Coming Soon
            </button>
          )}

          <Link
            href="/dashboard"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-[#ffe7b5] bg-white px-6 py-4 font-black text-[#17223b] transition hover:bg-[#fff3c4]"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </div>
      </aside>
    </section>
  </main>
);
}

function InfoPill({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-[#35c6c9]/10 px-4 py-2 text-sm font-black text-[#35c6c9]">
      {icon}
      {label}
    </div>
  );
}

function DetailBox({
  emoji,
  label,
  value,
}: {
  emoji: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="text-2xl">{emoji}</div>

      <p className="mt-3 text-xs font-black uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p className="mt-1 break-words font-black capitalize text-[#17223b]">
        {value}
      </p>
    </div>
  );
}