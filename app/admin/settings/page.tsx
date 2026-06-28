import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Brush,
  Download,
  LifeBuoy,
  Lock,
  RefreshCw,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Users,
} from "lucide-react";

import Card from "@/components/ui/Card";

const platformStats = [
  { label: "Environment", value: "Production", detail: "Vercel deployment" },
  { label: "Access Model", value: "Paid", detail: "All teachers have access" },
  { label: "Storage Bucket", value: "resources", detail: "Supabase Storage" },
  { label: "Auth", value: "Active", detail: "Email + Google SSO" },
];

const teacherSettings = [
  "Allow teacher login",
  "Require account before download",
  "Show featured resources",
  "Track resource downloads",
];

const maintenanceActions = [
  {
    title: "Refresh Analytics",
    description: "Recalculate dashboard totals and engagement stats.",
    icon: RefreshCw,
  },
  {
    title: "Review Access",
    description: "Check teacher roles, subscriptions, and admin access.",
    icon: ShieldCheck,
  },
  {
    title: "Audit Resources",
    description: "Find resources missing PDFs, thumbnails, or metadata.",
    icon: LifeBuoy,
  },
];

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#fff8f0] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 font-black text-[#3b82f6] transition hover:gap-3"
        >
          <ArrowLeft size={18} />
          Back to Admin
        </Link>

        <section className="mt-8 rounded-[2rem] bg-[#1f2a44] p-8 text-white shadow-2xl shadow-slate-950/15">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-white/10 p-3">
                <Settings size={30} className="text-[#f5b942]" />
              </div>

              <div>
                <p className="text-sm font-black uppercase tracking-widest text-[#f5b942]">
                  Platform Settings
                </p>

                <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                  Control the Tina platform
                </h1>

                <p className="mt-4 max-w-3xl text-lg leading-8 text-white/70">
                  Configure branding, teacher experience, downloads,
                  maintenance, and future platform tools from one place.
                </p>
              </div>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 font-black text-[#1f2a44]">
              <BadgeCheck size={18} />
              Live Platform
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {platformStats.map((stat) => (
            <Card key={stat.label}>
              <p className="text-sm font-black uppercase tracking-widest text-slate-400">
                {stat.label}
              </p>
              <p className="mt-3 text-3xl font-black text-[#1f2a44]">
                {stat.value}
              </p>
              <p className="mt-2 font-semibold text-slate-500">
                {stat.detail}
              </p>
            </Card>
          ))}
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_420px]">
          <Card className="p-8">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-[#3b82f6]/10 p-3 text-[#3b82f6]">
                <Brush size={24} />
              </div>

              <div>
                <p className="text-sm font-black uppercase tracking-widest text-[#3b82f6]">
                  Branding
                </p>
                <h2 className="mt-2 text-2xl font-black text-[#1f2a44]">
                  Classroom by Tina identity
                </h2>
                <p className="mt-2 leading-7 text-slate-600">
                  These controls will eventually power the public brand, admin
                  portal, emails, and teacher dashboard.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <SettingField label="Brand Name" value="Classroom by Tina" />
              <SettingField label="Admin Label" value="Admin Dashboard" />
              <SettingField label="Primary Color" value="#1f2a44" />
              <SettingField label="Accent Color" value="#f5b942" />
            </div>

            <button
              type="button"
              className="mt-6 rounded-full bg-[#1f2a44] px-6 py-3 font-black text-white opacity-60"
            >
              Save Branding Soon
            </button>
          </Card>

          <Card className="p-8">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-[#f5b942]/20 p-3 text-[#92400e]">
                <Users size={24} />
              </div>

              <div>
                <p className="text-sm font-black uppercase tracking-widest text-[#f5b942]">
                  Teacher Experience
                </p>
                <h2 className="mt-2 text-2xl font-black text-[#1f2a44]">
                  Access and engagement
                </h2>
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              {teacherSettings.map((setting) => (
                <label
                  key={setting}
                  className="flex items-center justify-between rounded-2xl bg-[#fff8f0] p-4"
                >
                  <span className="font-black text-[#1f2a44]">{setting}</span>
                  <input
                    type="checkbox"
                    defaultChecked
                    disabled
                    className="h-5 w-5 accent-[#3b82f6]"
                  />
                </label>
              ))}
            </div>
          </Card>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-3">
          <FeatureCard
            icon={<Download size={24} />}
            eyebrow="Downloads"
            title="Download rules"
            description="Downloads are tracked through a Server Action and stored in resource_downloads."
            items={["Require login", "Track every download", "Redirect to PDF"]}
          />

          <FeatureCard
            icon={<Sparkles size={24} />}
            eyebrow="AI Tools"
            title="Future AI controls"
            description="Central switches for worksheet, parent letter, homework, and center generators."
            items={["Homework generator", "Parent letters", "Differentiation"]}
          />

          <FeatureCard
            icon={<Lock size={24} />}
            eyebrow="Security"
            title="Authentication"
            description="Email/password, Google SSO, admin roles, and teacher access controls."
            items={["Google SSO active", "Email login active", "Admin role check"]}
          />
        </section>

        <section className="mt-8 rounded-[2rem] border border-[#f5b942]/30 bg-white p-8 shadow-sm">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
            <div>
              <p className="text-sm font-black uppercase tracking-widest text-[#f5b942]">
                Maintenance
              </p>
              <h2 className="mt-2 text-3xl font-black text-[#1f2a44]">
                Platform health tools
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                These actions are placeholders for the next admin utilities:
                analytics refreshes, resource audits, storage checks, and access
                reviews.
              </p>
            </div>

            <div className="rounded-full bg-[#fff8f0] px-5 py-3 font-black text-[#1f2a44]">
              Phase 1
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {maintenanceActions.map((action) => {
              const Icon = action.icon;

              return (
                <div
                  key={action.title}
                  className="rounded-[1.5rem] border border-slate-200 bg-[#fff8f0] p-5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#3b82f6] shadow-sm">
                    <Icon size={22} />
                  </div>

                  <h3 className="mt-5 text-xl font-black text-[#1f2a44]">
                    {action.title}
                  </h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    {action.description}
                  </p>

                  <button
                    type="button"
                    className="mt-5 rounded-full bg-white px-4 py-2 text-sm font-black text-slate-400"
                    disabled
                  >
                    Coming Soon
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-slate-200 bg-[#1f2a44] p-8 text-white shadow-sm">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-white/10 p-3 text-[#f5b942]">
              <SlidersHorizontal size={24} />
            </div>

            <div>
              <h2 className="text-2xl font-black">
                Future CMS Configuration
              </h2>
              <p className="mt-3 max-w-3xl leading-7 text-white/70">
                Next, this page can manage grades, subjects, categories,
                months, weeks, ability groups, and resource types so those
                values are no longer hard-coded across the app.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function SettingField({ label, value }: { label: string; value: string }) {
  return (
    <label>
      <span className="text-sm font-black uppercase tracking-widest text-slate-400">
        {label}
      </span>

      <input
        type="text"
        defaultValue={value}
        disabled
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 font-semibold text-slate-500 outline-none"
      />
    </label>
  );
}

function FeatureCard({
  icon,
  eyebrow,
  title,
  description,
  items,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
}) {
  return (
    <Card className="p-7">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3b82f6]/10 text-[#3b82f6]">
        {icon}
      </div>

      <p className="mt-5 text-sm font-black uppercase tracking-widest text-[#3b82f6]">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-2xl font-black text-[#1f2a44]">{title}</h2>

      <p className="mt-3 leading-7 text-slate-600">{description}</p>

      <div className="mt-5 grid gap-2">
        {items.map((item) => (
          <div key={item} className="flex items-center gap-2 font-semibold text-slate-600">
            <span className="h-2 w-2 rounded-full bg-[#f5b942]" />
            {item}
          </div>
        ))}
      </div>
    </Card>
  );
}