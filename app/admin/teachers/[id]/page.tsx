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
    .select("id, full_name, email, role, subscription_status, created_at")
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

  const lastDownload = downloads?.[0]?.downloaded_at;

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
            value={teacher.subscription_status ?? "free"}
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
              lastDownload
                ? new Date(lastDownload).toLocaleDateString()
                : "None"
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

          <Panel title="Purchases / Subscription" icon={<Receipt size={22} />}>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400">
                Current Plan
              </p>
              <p className="mt-2 text-xl font-black uppercase text-[#1f2a44]">
                {teacher.subscription_status ?? "free"}
              </p>
            </div>

            <p className="mt-4 text-slate-500">
              Stripe purchase history can be connected here next.
            </p>
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