import Link from "next/link";
import { notFound } from "next/navigation";
import {
  User,
  Mail,
  Calendar,
  BadgeCheck,
  Crown,
  Download,
  Receipt,
  Activity,
  RefreshCw,
  AlertCircle,
  PauseCircle,
  XCircle,
} from "lucide-react";
import { createClient } from "@/utils/supabase/server";

export default async function TeacherDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: teacher, error } = await supabase
    .from("profiles")
    .select(`
      id,
      full_name,
      email,
      role,
      subscription_status,
      stripe_customer_id,
      stripe_subscription_id,
      stripe_price_id,
      stripe_current_period_end,
      created_at
    `)
    .eq("id", id)
    .maybeSingle();

  if (error || !teacher) {
    notFound();
  }

  const { data: downloads, count: downloadCount } = await supabase
    .from("resource_downloads")
    .select("id, resource_title, downloaded_at", { count: "exact" })
    .eq("user_id", id)
    .order("downloaded_at", { ascending: false })
    .limit(10);

  const { count: downloadsThisMonth } = await supabase
    .from("resource_downloads")
    .select("id", { count: "exact", head: true })
    .eq("user_id", id)
    .gte("downloaded_at", getStartOfMonthIso());

  const { count: favoriteCount } = await supabase
    .from("favorites")
    .select("id", { count: "exact", head: true })
    .eq("user_id", id);

  const lastDownload = downloads?.[0]?.downloaded_at;
  const subscription = getSubscriptionDisplay(
    teacher.subscription_status,
    teacher.stripe_current_period_end
  );

  return (
    <main className="min-h-screen bg-[#fff8f0] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <Link href="/admin/teachers" className="font-black text-blue-500">
          ← Back to Teachers
        </Link>

        <section className="mt-6 rounded-[2rem] bg-[#1f2a44] p-8 text-white shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl font-black">
              {getInitials(teacher.full_name ?? teacher.email)}
            </div>

            <div>
              <h1 className="text-4xl font-black">
                {teacher.full_name ?? "No Name"}
              </h1>
              <p className="mt-2 text-white/70">{teacher.email}</p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-5">
          <InfoCard icon={<User size={22} />} label="Role" value={teacher.role} />

          <InfoCard
            icon={<Crown size={22} />}
            label="Plan"
            value={subscription.label}
          />

          <InfoCard
            icon={<Download size={22} />}
            label="Downloads"
            value={String(downloadCount ?? 0)}
          />

          <InfoCard
            icon={<BadgeCheck size={22} />}
            label="Last Download"
            value={
              lastDownload ? new Date(lastDownload).toLocaleDateString() : "None"
            }
          />

          <InfoCard
            icon={<Calendar size={22} />}
            label="Joined"
            value={new Date(teacher.created_at).toLocaleDateString()}
          />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <Panel title="Downloads" icon={<Download size={22} />}>
            {downloads && downloads.length > 0 ? (
              <div className="overflow-hidden rounded-2xl border border-slate-100">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 text-left text-slate-500">
                    <tr>
                      <th className="px-4 py-3 font-black">Resource</th>
                      <th className="px-4 py-3 font-black">Downloaded</th>
                    </tr>
                  </thead>

                  <tbody>
                    {downloads.map((download) => (
                      <tr key={download.id} className="border-t border-slate-100">
                        <td className="px-4 py-3 font-bold text-[#1f2a44]">
                          {download.resource_title}
                        </td>
                        <td className="px-4 py-3 text-slate-500">
                          {new Date(download.downloaded_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState>No downloads recorded yet.</EmptyState>
            )}
          </Panel>

          <Panel title="Subscription" icon={<Receipt size={22} />}>
            <div className="rounded-[1.5rem] bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <div className={subscription.badgeClass}>{subscription.icon}</div>

                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Current Status
                  </p>
                  <p className="mt-1 text-2xl font-black text-[#1f2a44]">
                    {subscription.label}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm font-bold text-slate-500">
                {subscription.description}
              </p>
            </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <SubscriptionStat
                label="Renews / Ends"
                value={
                  teacher.stripe_current_period_end
                    ? new Date(
                        teacher.stripe_current_period_end
                      ).toLocaleDateString()
                    : "Not available"
                }
              />

              <SubscriptionStat
                label="Days Remaining"
                value={
                  teacher.stripe_current_period_end
                    ? String(getDaysRemaining(teacher.stripe_current_period_end))
                    : "N/A"
                }
              />

              <SubscriptionStat
                label="Downloads This Month"
                value={String(downloadsThisMonth ?? 0)}
              />

              <SubscriptionStat
                label="Favorite Resources"
                value={String(favoriteCount ?? 0)}
              />
            </div>

            <details className="mt-5 rounded-2xl border border-slate-100 bg-white p-4">
              <summary className="cursor-pointer text-sm font-black text-slate-500">
                Developer Stripe Info
              </summary>

              <div className="mt-4 space-y-3">
                <DeveloperInfo
                  label="Customer ID"
                  value={teacher.stripe_customer_id ?? "Not connected"}
                />
                <DeveloperInfo
                  label="Subscription ID"
                  value={teacher.stripe_subscription_id ?? "No subscription"}
                />
                <DeveloperInfo
                  label="Price ID"
                  value={teacher.stripe_price_id ?? "No price"}
                />
              </div>
            </details>
          </Panel>

          <Panel title="Activity" icon={<Activity size={22} />}>
            <div className="space-y-4">
              <ActivityItem
                title="Account created"
                date={new Date(teacher.created_at).toLocaleDateString()}
              />

              {downloads?.slice(0, 3).map((download) => (
                <ActivityItem
                  key={download.id}
                  title={`Downloaded ${download.resource_title}`}
                  date={new Date(download.downloaded_at).toLocaleDateString()}
                />
              ))}

              {(!downloads || downloads.length === 0) && (
                <EmptyState>No recent activity yet.</EmptyState>
              )}
            </div>
          </Panel>

          <Panel title="Contact" icon={<Mail size={22} />}>
            <div className="flex items-center gap-3 text-slate-600">
              <Mail size={18} />
              <span>{teacher.email}</span>
            </div>

            <a
              href={`mailto:${teacher.email}`}
              className="mt-5 inline-flex rounded-full bg-[#1f2a44] px-5 py-3 text-sm font-black text-white"
            >
              Email Teacher
            </a>
          </Panel>
        </section>
      </div>
    </main>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-amber-100 bg-white p-5 shadow-sm">
      <div className="mb-4 text-[#f5b942]">{icon}</div>
      <p className="text-xs font-black uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <p className="mt-2 font-black uppercase text-[#1f2a44]">{value}</p>
    </div>
  );
}

function Panel({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-amber-100 bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="text-[#f5b942]">{icon}</div>
        <h2 className="text-2xl font-black text-[#1f2a44]">{title}</h2>
      </div>

      <div className="mt-5">{children}</div>
    </section>
  );
}

function SubscriptionStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-black uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-lg font-black text-[#1f2a44]">{value}</p>
    </div>
  );
}

function DeveloperInfo({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-black uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <p className="mt-1 break-all text-sm font-bold text-slate-600">{value}</p>
    </div>
  );
}

function ActivityItem({ title, date }: { title: string; date: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <p className="font-black text-[#1f2a44]">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{date}</p>
    </div>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-slate-500">
      {children}
    </div>
  );
}

function getInitials(value: string) {
  return value
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getStartOfMonthIso() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
}

function getDaysRemaining(date: string) {
  const end = new Date(date).getTime();
  const now = new Date().getTime();
  return Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));
}

function getSubscriptionDisplay(
  status?: string | null,
  currentPeriodEnd?: string | null
) {
  const normalized = status ?? "inactive";
  const daysRemaining = currentPeriodEnd
    ? getDaysRemaining(currentPeriodEnd)
    : null;

  if (normalized === "pro") {
    return {
      label: "Active Pro",
      description:
        daysRemaining !== null
          ? `This teacher has active access. Renewal is in ${daysRemaining} day${
              daysRemaining === 1 ? "" : "s"
            }.`
          : "This teacher has active access.",
      icon: <BadgeCheck size={22} />,
      badgeClass:
        "flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-green-700",
    };
  }

  if (normalized === "canceling") {
    return {
      label: "Canceling",
      description:
        daysRemaining !== null
          ? `Access remains active for ${daysRemaining} day${
              daysRemaining === 1 ? "" : "s"
            }, then ends.`
          : "This subscription is scheduled to cancel.",
      icon: <AlertCircle size={22} />,
      badgeClass:
        "flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-700",
    };
  }

  if (normalized === "paused") {
    return {
      label: "Paused",
      description: "This subscription is paused and may not have active access.",
      icon: <PauseCircle size={22} />,
      badgeClass:
        "flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-700",
    };
  }

  if (normalized === "canceled") {
    return {
      label: "Canceled",
      description: "This teacher canceled their subscription.",
      icon: <XCircle size={22} />,
      badgeClass:
        "flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-700",
    };
  }

  return {
    label: "Inactive",
    description: "This teacher does not currently have an active subscription.",
    icon: <RefreshCw size={22} />,
    badgeClass:
      "flex h-11 w-11 items-center justify-center rounded-full bg-slate-200 text-slate-600",
  };
}