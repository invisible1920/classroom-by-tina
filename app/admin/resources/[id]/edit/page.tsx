import type { ReactNode } from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ArrowLeft,
  Eye,
  Image,
  Save,
  Sparkles,
  UploadCloud,
} from "lucide-react";

import { getResource, updateResource } from "@/services";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type {
  AbilityGroup,
  Grade,
  ResourceCategory,
  ResourceStatus,
  Subject,
} from "@/types/resource";


const grades: Grade[] = ["Kindergarten", "First Grade", "Second Grade"];
const subjects: Subject[] = ["ELA", "Math", "Science", "Social Studies"];
const categories: ResourceCategory[] = [
  "Lesson Plan",
  "Centers",
  "Assessment",
  "Homework",
  "Parent Letter",
  "Slides",
  "Activity",
];

const statuses: ResourceStatus[] = ["draft", "published", "archived"];

const abilityGroups: AbilityGroup[] = [
  "All",
  "Low",
  "Medium",
  "High",
];

type EditResourcePageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function updateResourceAction(formData: FormData) {
  "use server";

  const id = String(formData.get("id") ?? "");
  const currentPdf = String(formData.get("currentPdf") ?? "");
  const currentThumbnail = String(formData.get("currentThumbnail") ?? "");

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const grade = String(formData.get("grade") ?? "First Grade") as Grade;
  const subject = String(formData.get("subject") ?? "ELA") as Subject;
  const week = Number(formData.get("week") ?? 1);
  const standard = String(formData.get("standard") ?? "").trim();
  const category = String(
  formData.get("category") ?? "Lesson Plan"
) as ResourceCategory;

const abilityGroup = String(
  formData.get("ability_group") ?? "All"
) as AbilityGroup;

const status = String(formData.get("status") ?? "draft") as ResourceStatus;

const featured = formData.get("featured") === "on";

  const pdfFile = formData.get("pdf") as File | null;
  const thumbnailFile = formData.get("thumbnail") as File | null;

  let pdf = currentPdf;
  let thumbnail = currentThumbnail;

  if (!id) {
    throw new Error("Missing resource id.");
  }

  if (!title) {
    throw new Error("Title is required.");
  }

  if (pdfFile && pdfFile.size > 0) {
    pdf = await uploadResourceFile(pdfFile, "pdfs");
  }

  if (thumbnailFile && thumbnailFile.size > 0) {
    thumbnail = await uploadResourceFile(thumbnailFile, "thumbnails");
  }

  await updateResource(id, {
    title,
    description,
    grade,
    subject,
    week: Number.isFinite(week) && week > 0 ? week : 1,
    standard,
    category,
    ability_group: abilityGroup,
    featured,
    status,
    pdf,
    thumbnail,
  });

  revalidatePath("/admin/resources");
  revalidatePath(`/admin/resources/${id}/edit`);
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/kindergarten");
  revalidatePath("/dashboard/first-grade");
  revalidatePath("/dashboard/second-grade");

  redirect("/admin/resources");
}

async function uploadResourceFile(file: File, folder: string) {
  const extension = file.name.split(".").pop() ?? "file";
  const fileName = `${crypto.randomUUID()}.${extension}`;
  const storagePath = `${folder}/${fileName}`;

  const { error } = await supabaseAdmin.storage
    .from("resources")
    .upload(storagePath, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data } = supabaseAdmin.storage
    .from("resources")
    .getPublicUrl(storagePath);

  return data.publicUrl;
}

export default async function EditResourcePage({
  params,
}: EditResourcePageProps) {
  const { id } = await params;
  const resource = await getResource(id);

  if (!resource) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fff8f0] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/admin/resources"
          className="inline-flex items-center gap-2 font-black text-[#3b82f6] transition hover:gap-3"
        >
          <ArrowLeft size={18} />
          Back to Resources
        </Link>

        <section className="mt-8 rounded-[2rem] bg-[#1f2a44] p-8 text-white shadow-2xl shadow-slate-950/15">
          <p className="text-sm font-black uppercase tracking-widest text-[#f5b942]">
            Edit Resource
          </p>

          <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <h1 className="text-4xl font-black tracking-tight md:text-5xl">
                {resource.title}
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
                Update metadata, files, publish status, and preview how this
                resource appears to teachers.
              </p>
            </div>

            <Link
              href={`/dashboard/resources/${resource.id}`}
              className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-black text-[#1f2a44] transition hover:-translate-y-0.5 hover:bg-[#f5b942]"
            >
              <Eye size={18} />
              Preview
            </Link>
          </div>
        </section>

        <form action={updateResourceAction} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <input type="hidden" name="id" value={resource.id} />
          <input type="hidden" name="currentPdf" value={resource.pdf} />
          <input
            type="hidden"
            name="currentThumbnail"
            value={resource.thumbnail}
          />

          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-[#1f2a44]">
              Resource Details
            </h2>

            <div className="mt-6 grid gap-5">
              <Field label="Title">
                <input
                  name="title"
                  type="text"
                  defaultValue={resource.title}
                  required
                  className="admin-input"
                />
              </Field>

              <Field label="Description">
                <textarea
                  name="description"
                  defaultValue={resource.description}
                  rows={5}
                  className="admin-input resize-none"
                />
              </Field>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Grade">
                  <select
                    name="grade"
                    defaultValue={resource.grade}
                    className="admin-input"
                  >
                    {grades.map((grade) => (
                      <option key={grade} value={grade}>
                        {grade}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Subject">
                  <select
                    name="subject"
                    defaultValue={resource.subject}
                    className="admin-input"
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid gap-5 md:grid-cols-4">
                <Field label="Week">
                  <input
                    name="week"
                    type="number"
                    min="1"
                    defaultValue={resource.week}
                    className="admin-input"
                  />
                </Field>

                <Field label="Standard">
                  <input
                    name="standard"
                    type="text"
                    defaultValue={resource.standard}
                    className="admin-input"
                  />
                </Field>

                <Field label="Category">
                  <select
                    name="category"
                    defaultValue={resource.category}
                    className="admin-input"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Ability Group">
  <select
    name="ability_group"
    defaultValue={resource.ability_group ?? "All"}
    className="admin-input"
  >
    {abilityGroups.map((group) => (
      <option key={group} value={group}>
        {group}
      </option>
    ))}
  </select>
</Field>
              </div>

              <Field label="Status">
                <select
                  name="status"
                  defaultValue={resource.status}
                  className="admin-input"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
          </section>

          <aside className="grid gap-6">
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
  <h2 className="text-xl font-black text-[#1f2a44]">Files</h2>

  <div className="mt-5 space-y-6">

    {resource.thumbnail && (
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <img
          src={resource.thumbnail}
          alt={resource.title}
          className="h-44 w-full object-cover"
        />
      </div>
    )}

    <div className="rounded-2xl bg-slate-50 p-4">

      <div className="flex items-center justify-between">

        <div>

          <p className="font-black text-[#1f2a44]">
            PDF
          </p>

          <p className="text-sm text-slate-500">
            {resource.pdf ? "PDF uploaded" : "No PDF uploaded"}
          </p>

        </div>

        {resource.pdf && (
          <a
            href={resource.pdf}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#3b82f6]/10 px-4 py-2 text-sm font-black text-[#3b82f6] transition hover:bg-[#3b82f6] hover:text-white"
          >
            View PDF
          </a>
        )}

      </div>

      <div className="mt-4">

        <FileUploadField
          name="pdf"
          accept="application/pdf"
          icon={<UploadCloud size={24} />}
          title="Replace PDF"
          description="Upload a new PDF"
        />

      </div>

    </div>

    <div className="rounded-2xl bg-slate-50 p-4">

      <FileUploadField
        name="thumbnail"
        accept="image/*"
        icon={<Image size={24} />}
        title="Replace Thumbnail"
        description="Upload a new thumbnail"
      />

    </div>

  </div>
</section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#1f2a44]">Publish</h2>

              <label className="mt-5 flex cursor-pointer items-center justify-between rounded-2xl bg-[#fff8f0] p-4">
                <div>
                  <p className="font-black text-[#1f2a44]">Featured</p>
                  <p className="text-sm font-semibold text-slate-500">
                    Highlight this resource for teachers.
                  </p>
                </div>

                <input
                  name="featured"
                  type="checkbox"
                  defaultChecked={resource.featured}
                  className="h-5 w-5 accent-[#3b82f6]"
                />
              </label>

              <button
                type="submit"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1f2a44] px-6 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <Save size={18} />
                Save Changes
              </button>

              <p className="mt-4 text-center text-sm font-semibold text-slate-500">
                Saves directly to Supabase.
              </p>
            </section>

            <section className="rounded-[2rem] border border-[#f5b942]/30 bg-[#f5b942]/10 p-6">
              <div className="flex items-start gap-3">
                <Sparkles size={22} className="text-[#f5b942]" />

                <div>
                  <h3 className="font-black text-[#1f2a44]">
                    Future AI Assist
                  </h3>

                  <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                    Later this page can regenerate homework, parent letters,
                    centers, and modifications from this resource.
                  </p>
                </div>
              </div>
            </section>
          </aside>
        </form>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-black uppercase tracking-widest text-slate-500">
        {label}
      </span>

      <div className="mt-2">{children}</div>
    </label>
  );
}

function FileUploadField({
  name,
  accept,
  icon,
  title,
  description,
}: {
  name: string;
  accept: string;
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-5 transition hover:border-[#3b82f6] hover:bg-blue-50">
      <div className="flex items-start gap-4">
        <div className="rounded-2xl bg-white p-3 text-[#3b82f6] shadow-sm">
          {icon}
        </div>

        <div>
          <p className="font-black text-[#1f2a44]">{title}</p>
          <p className="mt-1 break-all text-sm font-semibold leading-6 text-slate-500">
            {description}
          </p>
          <p className="mt-3 text-xs font-black uppercase tracking-widest text-[#3b82f6]">
            Choose file
          </p>
        </div>
      </div>

      <input name={name} type="file" accept={accept} className="sr-only" />
    </label>
  );
}