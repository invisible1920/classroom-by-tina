import Link from "next/link";
import {
  ArrowLeft,
  FilePlus2,
  Image,
  Save,
  Sparkles,
  UploadCloud,
} from "lucide-react";

const grades = ["Kindergarten", "First Grade", "Second Grade"];
const subjects = ["ELA", "Math", "Science", "Social Studies"];
const categories = [
  "Lesson Plan",
  "Centers",
  "Assessment",
  "Homework",
  "Parent Letter",
  "Slides",
  "Activity",
];

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
                This is the first version of Tina’s upload workflow. For now,
                this form is visual only. Next we’ll connect it to Supabase
                storage and database tables.
              </p>
            </div>
          </div>
        </section>

        <form className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-black text-[#1f2a44]">
              Resource Details
            </h2>

            <div className="mt-6 grid gap-5">
              <Field label="Title">
                <input
                  type="text"
                  placeholder="Example: First Grade ELA Week 4 Lesson Plan"
                  className="admin-input"
                />
              </Field>

              <Field label="Description">
                <textarea
                  placeholder="Briefly describe what this resource helps teachers do..."
                  rows={5}
                  className="admin-input resize-none"
                />
              </Field>

              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Grade">
                  <select className="admin-input">
                    {grades.map((grade) => (
                      <option key={grade}>{grade}</option>
                    ))}
                  </select>
                </Field>

                <Field label="Subject">
                  <select className="admin-input">
                    {subjects.map((subject) => (
                      <option key={subject}>{subject}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <Field label="Week">
                  <input
                    type="number"
                    min="1"
                    placeholder="4"
                    className="admin-input"
                  />
                </Field>

                <Field label="Standard">
                  <input
                    type="text"
                    placeholder="RL.1.2"
                    className="admin-input"
                  />
                </Field>

                <Field label="Category">
                  <select className="admin-input">
                    {categories.map((category) => (
                      <option key={category}>{category}</option>
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
                <UploadBox
                  icon={<UploadCloud size={24} />}
                  title="Upload PDF"
                  description="Lesson plan, packet, slides, or printable file."
                />

                <UploadBox
                  icon={<Image size={24} />}
                  title="Upload Thumbnail"
                  description="Preview image teachers will see on resource cards."
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

                <input type="checkbox" className="h-5 w-5 accent-[#3b82f6]" />
              </label>

              <button
                type="button"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1f2a44] px-6 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                <Save size={18} />
                Save Resource
              </button>

              <p className="mt-4 text-center text-sm font-semibold text-slate-500">
                Supabase saving coming next.
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

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-black uppercase tracking-widest text-slate-500">
        {label}
      </span>

      <div className="mt-2">{children}</div>
    </label>
  );
}

function UploadBox({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button
      type="button"
      className="flex w-full items-start gap-4 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-5 text-left transition hover:border-[#3b82f6] hover:bg-blue-50"
    >
      <div className="rounded-2xl bg-white p-3 text-[#3b82f6] shadow-sm">
        {icon}
      </div>

      <div>
        <p className="font-black text-[#1f2a44]">{title}</p>
        <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </button>
  );
}