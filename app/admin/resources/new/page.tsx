import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  ArrowLeft,
  FilePlus2,
  Image,
  Save,
  Sparkles,
  UploadCloud,
} from "lucide-react";

import { createResource } from "@/services";
import { supabaseAdmin } from "@/lib/supabase-admin";
import type {
  AbilityGroup,
  Grade,
  ResourceCategory,
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

const abilityGroups: AbilityGroup[] = ["All", "Low", "Medium", "High"];

const months = [
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
];

const weeks = [1, 2, 3, 4];

async function createResourceAction(formData: FormData) {
  "use server";

  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const grade = String(formData.get("grade") ?? "First Grade") as Grade;
  const subject = String(formData.get("subject") ?? "ELA") as Subject;
  const month = String(formData.get("month") ?? "August").trim();
const week = Number(formData.get("week") ?? 1);

if (!weeks.includes(week)) {
  throw new Error("Week must be between 1 and 4.");
}
  const standard = String(formData.get("standard") ?? "").trim();
  const category = String(
    formData.get("category") ?? "Lesson Plan"
  ) as ResourceCategory;
  const abilityGroup = String(
  formData.get("ability_group") ?? "All"
) as AbilityGroup;
  const featured = formData.get("featured") === "on";

  const pdfFile = formData.get("pdf") as File | null;
  const thumbnailFile = formData.get("thumbnail") as File | null;

  let pdfPath = "/resources/sample.pdf";
  let thumbnailPath = "/images/resource-placeholder.png";

  if (!title) {
    throw new Error("Title is required.");
  }

  if (pdfFile && pdfFile.size > 0) {
    pdfPath = await uploadResourceFile(pdfFile, "pdfs");
  }

  if (thumbnailFile && thumbnailFile.size > 0) {
    thumbnailPath = await uploadResourceFile(thumbnailFile, "thumbnails");
  }

  await createResource({
  title,
  description,
  grade,
  subject,
  month,
  week,
  standard,
  category,
  ability_group: abilityGroup,
  featured,
  status: "published",
  thumbnail: thumbnailPath,
  pdf: pdfPath,
});

  revalidatePath("/admin/resources");
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

export default function NewResourcePage() {
  return (
    <main className="min-h-screen bg-[#fff8f0] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 font-black text-[#3b82f6] transition hover:gap-3"
        >
          <ArrowLeft size={18} />
          Back to Admin
        </Link>

        <section className="mt-8 rounded-[2rem] bg-[#1f2a44] p-8 text-white shadow-2xl shadow-slate-950/15">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-white/10 p-3 text-[#f5b942]">
              <FilePlus2 size={28} />
            </div>

            <div>
              <p className="text-sm font-black uppercase tracking-widest text-[#f5b942]">
                Upload Resource
              </p>

              <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                Add a new teaching resource
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
                Create a live resource with PDF and thumbnail uploads stored in
                Supabase.
              </p>
            </div>
          </div>
        </section>

        <form
          action={createResourceAction}
          className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]"
        >
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-[#1f2a44]">
              Resource Details
            </h2>

            <div className="mt-6 grid gap-5">
              <Field label="Title">
                <input
                  name="title"
                  type="text"
                  required
                  placeholder="Example: First Grade ELA Week 4 Lesson Plan"
                  className="admin-input"
                />
              </Field>

              <Field label="Description">
                <textarea
                  name="description"
                  placeholder="Briefly describe what this resource helps teachers do..."
                  rows={5}
                  className="admin-input resize-none"
                />
              </Field>

             <div className="grid gap-5 md:grid-cols-2">
  <Field label="Month">
    <select name="month" defaultValue="August" className="admin-input">
      {months.map((month) => (
        <option key={month} value={month}>
          {month}
        </option>
      ))}
    </select>
  </Field>

  <Field label="Week">
    <select name="week" defaultValue="1" className="admin-input">
      {weeks.map((week) => (
        <option key={week} value={week}>
          Week {week}
        </option>
      ))}
    </select>
  </Field>
</div>

<div className="grid gap-5 md:grid-cols-3">
  <Field label="Standard">
    <input
      name="standard"
      type="text"
      placeholder="RL.1.2"
      className="admin-input"
    />
  </Field>

  <Field label="Category">
    <select name="category" className="admin-input">
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  </Field>

  <Field label="Ability Group">
    <select name="ability_group" defaultValue="All" className="admin-input">
      {abilityGroups.map((group) => (
        <option key={group} value={group}>
          {group}
        </option>
      ))}
    </select>
  </Field>
</div>
            </div>
          </section>

          <aside className="grid gap-6">
            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black text-[#1f2a44]">Files</h2>

              <div className="mt-5 grid gap-4">
                <FileUploadField
                  name="pdf"
                  accept="application/pdf"
                  icon={<UploadCloud size={24} />}
                  title="Upload PDF"
                  description="Upload a lesson plan, packet, slides, or printable PDF."
                />

                <FileUploadField
                  name="thumbnail"
                  accept="image/*"
                  icon={<Image size={24} />}
                  title="Upload Thumbnail"
                  description="Upload a preview image for the resource card."
                />
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
                  className="h-5 w-5 accent-[#3b82f6]"
                />
              </label>

              <button
                type="submit"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1f2a44] px-6 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <Save size={18} />
                Save Resource
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
                    Later, Tina will be able to upload one lesson and generate
                    homework, parent letters, centers, and differentiation from
                    it.
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
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">
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