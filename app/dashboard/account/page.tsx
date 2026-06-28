import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  BadgeCheck,
  CalendarClock,
  CreditCard,
  GraduationCap,
  Mail,
  School,
  ShieldCheck,
  User,
} from "lucide-react";

import { createCustomerPortalSession } from "@/app/actions/stripe";
import { getCurrentUserAccess } from "@/lib/auth/get-current-user-access";
import { createClient } from "@/utils/supabase/server";

async function updateProfile(formData: FormData) {
  "use server";

  const access = await getCurrentUserAccess();

  if (!access.userId) {
    redirect("/login");
  }

  const supabase = await createClient();

  const fullName = String(formData.get("fullName") ?? "").trim();
  const school = String(formData.get("school") ?? "").trim();
  const gradeLevel = String(formData.get("gradeLevel") ?? "").trim();
  const subjects = formData.getAll("subjects").map(String);

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      school,
      grade_level: gradeLevel,
      subjects,
      updated_at: new Date().toISOString(),
    })
    .eq("id", access.userId);

  if (error) {
    redirect(
      `/dashboard/account?error=${encodeURIComponent(
        "Could not update profile"
      )}`
    );
  }

  revalidatePath("/dashboard/account");
  revalidatePath("/dashboard");

  redirect(
    `/dashboard/account?success=${encodeURIComponent("Profile updated")}`
  );
}

function formatDate(value?: string | null) {
  if (!value) return null;

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function getSubscriptionDisplay(status: string) {
  if (status === "pro") {
    return {
      label: "Active",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      description: "Your subscription is active.",
    };
  }

  if (status === "canceling") {
    return {
      label: "Canceling",
      badge: "bg-amber-50 text-amber-700 border-amber-200",
      description: "Your subscription is scheduled to cancel.",
    };
  }

  if (status === "paused") {
    return {
      label: "Paused",
      badge: "bg-orange-50 text-orange-700 border-orange-200",
      description: "Your subscription is currently paused.",
    };
  }

  if (status === "canceled") {
    return {
      label: "Canceled",
      badge: "bg-red-50 text-red-700 border-red-200",
      description: "Your subscription has been canceled.",
    };
  }

  return {
    label: "Inactive",
    badge: "bg-slate-50 text-slate-600 border-slate-200",
    description: "You do not currently have an active subscription.",
  };
}

export default async function AccountPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const params = await searchParams;
  const access = await getCurrentUserAccess();

  if (!access.userId) {
    redirect("/login");
  }

  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "full_name, email, school, role, subscription_status, grade_level, subjects, created_at, stripe_current_period_end, stripe_customer_id"
    )
    .eq("id", access.userId)
    .maybeSingle();

  if (!profile) {
    redirect("/signup");
  }

  const selectedSubjects = profile.subjects ?? [];
  const planStatus = profile.subscription_status ?? "inactive";
  const subscription = getSubscriptionDisplay(planStatus);
  const periodEnd = formatDate(profile.stripe_current_period_end);
  const memberSince = formatDate(profile.created_at);

  return (
    <>
      <section className="overflow-hidden rounded-[2rem] bg-[#1f2a44] p-8 text-white shadow-xl">
        <p className="text-sm font-black uppercase tracking-widest text-[#f5b942]">
          Account
        </p>

        <div className="mt-4 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <h1 className="text-4xl font-black tracking-tight">
              Profile & Subscription
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/70">
              Manage your teacher profile, classroom preferences, and billing
              settings.
            </p>
          </div>

          <div
            className={`w-fit rounded-full border px-4 py-2 text-sm font-black ${subscription.badge}`}
          >
            {subscription.label}
          </div>
        </div>
      </section>

      {params.success && (
        <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 font-bold text-green-700">
          {params.success}
        </div>
      )}

      {params.error && (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 font-bold text-red-700">
          {params.error}
        </div>
      )}

      <section className="mt-8 grid gap-6 lg:grid-cols-4">
        <SummaryCard
          icon={<User size={22} />}
          label="Teacher"
          value={profile.full_name || "Teacher"}
          detail={profile.email}
        />

        <SummaryCard
          icon={<BadgeCheck size={22} />}
          label="Role"
          value={profile.role ?? "teacher"}
          detail={memberSince ? `Member since ${memberSince}` : "Member"}
        />

        <SummaryCard
          icon={<GraduationCap size={22} />}
          label="Grade Level"
          value={profile.grade_level || "Not selected"}
          detail={profile.school || "No school added"}
        />

        <SummaryCard
          icon={<CreditCard size={22} />}
          label="Subscription"
          value={subscription.label}
          detail={
            planStatus === "canceling" && periodEnd
              ? `Access until ${periodEnd}`
              : periodEnd
              ? `Renews ${periodEnd}`
              : subscription.description
          }
        />
      </section>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_420px]">
        <form
          action={updateProfile}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-blue-50 p-3 text-blue-600">
              <User size={22} />
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Profile Details
              </h2>
              <p className="mt-1 text-slate-500">
                Keep your classroom preferences up to date.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <Field label="Full Name" icon={<User size={18} />}>
              <input
                name="fullName"
                defaultValue={profile.full_name ?? ""}
                className="admin-input"
                placeholder="Your name"
              />
            </Field>

            <Field label="School" icon={<School size={18} />}>
              <input
                name="school"
                defaultValue={profile.school ?? ""}
                className="admin-input"
                placeholder="School name"
              />
            </Field>

            <Field label="Grade Level" icon={<GraduationCap size={18} />}>
              <select
                name="gradeLevel"
                defaultValue={profile.grade_level ?? ""}
                className="admin-input"
              >
                <option value="">Select grade</option>
                <option value="Kindergarten">Kindergarten</option>
                <option value="First Grade">First Grade</option>
                <option value="Second Grade">Second Grade</option>
                <option value="Multiple Grades">Multiple Grades</option>
              </select>
            </Field>

            <div className="rounded-2xl bg-slate-50 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                <Mail size={18} />
                Email
              </div>
              <p className="mt-2 font-semibold text-slate-900">
                {profile.email}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p className="font-bold text-slate-700">Subjects</p>

            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Reading",
                "Writing",
                "Math",
                "Science",
                "Social Studies",
              ].map((subject) => (
                <label
                  key={subject}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border border-slate-200 p-4 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    name="subjects"
                    value={subject}
                    defaultChecked={selectedSubjects.includes(subject)}
                    className="h-4 w-4 accent-[#1f2a44]"
                  />
                  {subject}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 rounded-full bg-[#1f2a44] px-8 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Save Changes
          </button>
        </form>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-[#f5b942]/20 p-3 text-[#b7791f]">
              <CreditCard size={22} />
            </div>

            <div>
              <h2 className="text-2xl font-black text-slate-900">
                Subscription
              </h2>
              <p className="mt-1 text-slate-500">
                Billing is securely managed by Stripe.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-3xl bg-slate-50 p-6">
            <p className="text-sm font-black uppercase tracking-widest text-slate-400">
              Pro Teacher
            </p>

            <div className="mt-3 flex items-center justify-between gap-4">
              <p className="text-3xl font-black text-[#1f2a44]">
                {subscription.label}
              </p>

              <span
                className={`rounded-full border px-3 py-1 text-xs font-black ${subscription.badge}`}
              >
                {planStatus}
              </span>
            </div>

            <p className="mt-3 font-semibold text-slate-600">
              {planStatus === "canceling" && periodEnd
                ? `Your access remains active until ${periodEnd}.`
                : periodEnd
                ? `Next billing date: ${periodEnd}.`
                : subscription.description}
            </p>
          </div>

          <div className="mt-6 grid gap-3">
            <BillingInfo
              icon={<ShieldCheck size={18} />}
              label="Secure payments"
              value="Powered by Stripe"
            />

            <BillingInfo
              icon={<CalendarClock size={18} />}
              label={
                planStatus === "canceling" ? "Access ends" : "Billing date"
              }
              value={periodEnd ?? "Not available"}
            />

            <BillingInfo
              icon={<CreditCard size={18} />}
              label="Customer portal"
              value={
                profile.stripe_customer_id
                  ? "Connected"
                  : "Subscribe to activate billing"
              }
            />
          </div>

          <form action={createCustomerPortalSession} className="mt-8">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1f2a44] px-8 py-4 font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              <CreditCard size={20} />
              Manage Billing
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-blue-600">{icon}</div>
      <p className="mt-4 text-sm font-black uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <p className="mt-2 truncate text-xl font-black capitalize text-slate-900">
        {value}
      </p>
      <p className="mt-1 truncate text-sm font-semibold text-slate-500">
        {detail}
      </p>
    </div>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2">
      <span className="flex items-center gap-2 font-bold text-slate-700">
        {icon}
        {label}
      </span>
      {children}
    </label>
  );
}

function BillingInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
      <div className="text-slate-500">{icon}</div>
      <div>
        <p className="text-xs font-black uppercase tracking-widest text-slate-400">
          {label}
        </p>
        <p className="mt-1 font-bold text-slate-700">{value}</p>
      </div>
    </div>
  );
}