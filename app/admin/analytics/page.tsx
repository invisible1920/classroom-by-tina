import {
  BarChart3,
  Download,
  Users,
  BookOpen,
  Clock,
  Activity,
  Flame,
  AlertTriangle,
} from "lucide-react";
import type { ReactNode } from "react";
import { createClient } from "@/utils/supabase/server";

export default async function AnalyticsPage() {
  const supabase = await createClient();

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
  thirtyDaysAgo.setHours(0, 0, 0, 0);

  const { count: teacherCount } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("role", "teacher");

  const { count: downloadCount } = await supabase
    .from("resource_downloads")
    .select("id", { count: "exact", head: true });

  const { count: todayDownloads } = await supabase
    .from("resource_downloads")
    .select("id", { count: "exact", head: true })
    .gte("downloaded_at", todayStart.toISOString());

  const { data: allDownloads } = await supabase
    .from("resource_downloads")
    .select("id, user_id, resource_id, resource_title, downloaded_at, profiles(full_name, email)")
    .order("downloaded_at", { ascending: false })
    .limit(500);

  const { data: resources } = await supabase
    .from("resources")
    .select("id, title, status")
    .eq("status", "published");

  const downloads = allDownloads ?? [];
  const recentDownloads = downloads.slice(0, 10);
  const popularResources = getPopularResources(downloads);
  const activeTeachers = getMostActiveTeachers(downloads);
  const zeroDownloadResources = getZeroDownloadResources(resources ?? [], downloads);
  const sevenDayTrend = getDailyTrend(downloads, 7);
  const thirtyDayTrend = getDailyTrend(downloads, 30);
  const topResource = popularResources[0]?.title ?? "None yet";

  return (
    <main className="min-h-screen bg-[#fff8f0] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] bg-[#1f2a44] p-8 text-white shadow-2xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-2xl bg-white/10 p-3">
                <BarChart3 size={30} className="text-[#f5b942]" />
              </div>

              <div>
                <h1 className="text-4xl font-black">Analytics</h1>
                <p className="mt-2 text-white/70">
                  Downloads, teacher activity, resource usage, and library insights.
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white/10 px-5 py-4">
              <p className="text-xs font-black uppercase tracking-widest text-white/50">
                Top Resource
              </p>
              <p className="mt-1 font-black text-[#f5b942]">{topResource}</p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <MetricCard icon={<Users size={22} />} label="Teachers" value={teacherCount ?? 0} />
          <MetricCard icon={<Download size={22} />} label="Total Downloads" value={downloadCount ?? 0} />
          <MetricCard icon={<Clock size={22} />} label="Today" value={todayDownloads ?? 0} />
          <MetricCard icon={<BookOpen size={22} />} label="Resources Used" value={popularResources.length} />
          <MetricCard icon={<AlertTriangle size={22} />} label="Zero Downloads" value={zeroDownloadResources.length} />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <Panel title="7-Day Download Trend">
            <LineChart data={sevenDayTrend} />
          </Panel>

          <Panel title="30-Day Download Trend">
            <LineChart data={thirtyDayTrend} />
          </Panel>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <Panel title="Recent Downloads" className="lg:col-span-2">
            {recentDownloads.length > 0 ? (
              <DownloadTable downloads={recentDownloads} />
            ) : (
              <EmptyState>No downloads yet.</EmptyState>
            )}
          </Panel>

          <Panel title="Popular Resources">
            {popularResources.length > 0 ? (
              <ResourceBars resources={popularResources} />
            ) : (
              <EmptyState>No popular resources yet.</EmptyState>
            )}
          </Panel>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <Panel title="Most Active Teachers">
            {activeTeachers.length > 0 ? (
              <div className="space-y-3">
                {activeTeachers.map((teacher, index) => (
                  <div key={teacher.name} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                    <div>
                      <p className="font-black text-[#1f2a44]">
                        #{index + 1} {teacher.name}
                      </p>
                      <p className="text-sm text-slate-500">{teacher.email}</p>
                    </div>
                    <span className="rounded-full bg-[#f5b942]/20 px-3 py-1 text-xs font-black text-[#1f2a44]">
                      {teacher.count} downloads
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState>No teacher activity yet.</EmptyState>
            )}
          </Panel>

          <Panel title="Resources With Zero Downloads">
            {zeroDownloadResources.length > 0 ? (
              <div className="space-y-3">
                {zeroDownloadResources.slice(0, 10).map((resource) => (
                  <div key={resource.id} className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-black text-[#1f2a44]">{resource.title}</p>
                    <p className="mt-1 text-sm text-slate-500">Published but not downloaded yet.</p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState>Every published resource has at least one download.</EmptyState>
            )}
          </Panel>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <InsightCard
            icon={<Activity size={22} />}
            title="Engagement"
            text={`${todayDownloads ?? 0} downloads happened today.`}
          />
          <InsightCard
            icon={<Flame size={22} />}
            title="Best Performer"
            text={
              popularResources.length
                ? `${popularResources[0].title} has ${popularResources[0].count} downloads.`
                : "No download data yet."
            }
          />
          <InsightCard
            icon={<AlertTriangle size={22} />}
            title="Needs Attention"
            text={`${zeroDownloadResources.length} published resources have zero downloads.`}
          />
        </section>
      </div>
    </main>
  );
}

function MetricCard({ icon, label, value }: { icon: ReactNode; label: string; value: number | string }) {
  return (
    <div className="rounded-[1.5rem] border border-amber-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 text-[#f5b942]">{icon}</div>
      <p className="text-sm font-black uppercase tracking-widest text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-black text-[#1f2a44]">{value}</p>
    </div>
  );
}

function Panel({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-[2rem] border border-amber-100 bg-white p-8 shadow-sm ${className}`}>
      <h2 className="text-2xl font-black text-[#1f2a44]">{title}</h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function InsightCard({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-[2rem] border border-amber-100 bg-white p-6 shadow-sm">
      <div className="text-[#f5b942]">{icon}</div>
      <h3 className="mt-4 text-xl font-black text-[#1f2a44]">{title}</h3>
      <p className="mt-2 leading-7 text-slate-600">{text}</p>
    </div>
  );
}

function EmptyState({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-5 text-slate-500">
      {children}
    </div>
  );
}

function DownloadTable({ downloads }: { downloads: any[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left text-slate-500">
          <tr>
            <th className="px-4 py-3 font-black">Teacher</th>
            <th className="px-4 py-3 font-black">Resource</th>
            <th className="px-4 py-3 font-black">Date</th>
          </tr>
        </thead>
        <tbody>
          {downloads.map((download) => {
            const profile = Array.isArray(download.profiles)
              ? download.profiles[0]
              : download.profiles;

            return (
              <tr key={download.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-bold text-[#1f2a44]">
                  {profile?.full_name ?? profile?.email ?? "Unknown"}
                </td>
                <td className="px-4 py-3 text-slate-600">{download.resource_title}</td>
                <td className="px-4 py-3 text-slate-500">
                  {new Date(download.downloaded_at).toLocaleDateString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function ResourceBars({ resources }: { resources: { title: string; count: number }[] }) {
  return (
    <div className="space-y-3">
      {resources.map((resource, index) => (
        <div key={resource.title} className="rounded-2xl bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="font-black text-[#1f2a44]">
              #{index + 1} {resource.title}
            </p>
            <span className="rounded-full bg-[#f5b942]/20 px-3 py-1 text-xs font-black text-[#1f2a44]">
              {resource.count}
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
            <div
              className="h-full rounded-full bg-[#f5b942]"
              style={{
                width: `${Math.max(10, (resource.count / resources[0].count) * 100)}%`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function LineChart({ data }: { data: { label: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  const points = data
    .map((d, index) => {
      const x = data.length === 1 ? 0 : (index / (data.length - 1)) * 100;
      const y = 100 - (d.count / max) * 80 - 10;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div>
      <div className="rounded-2xl bg-slate-50 p-5">
        <svg viewBox="0 0 100 100" className="h-52 w-full overflow-visible">
          <polyline
            points={points}
            fill="none"
            stroke="#f5b942"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {data.map((d, index) => {
            const x = data.length === 1 ? 0 : (index / (data.length - 1)) * 100;
            const y = 100 - (d.count / max) * 80 - 10;

            return (
              <circle key={d.label} cx={x} cy={y} r="2.5" fill="#1f2a44" />
            );
          })}
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400">
        {data.slice(-7).map((d) => (
          <div key={d.label}>
            <p>{d.label}</p>
            <p className="mt-1 text-[#1f2a44]">{d.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function getPopularResources(downloads: any[]) {
  const counts = new Map<string, number>();

  downloads.forEach((download) => {
    counts.set(download.resource_title, (counts.get(download.resource_title) ?? 0) + 1);
  });

  return Array.from(counts.entries())
    .map(([title, count]) => ({ title, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

function getMostActiveTeachers(downloads: any[]) {
  const counts = new Map<string, { name: string; email: string; count: number }>();

  downloads.forEach((download) => {
    const profile = Array.isArray(download.profiles)
      ? download.profiles[0]
      : download.profiles;

    const email = profile?.email ?? "Unknown";
    const name = profile?.full_name ?? email;
    const key = download.user_id ?? email;

    const existing = counts.get(key) ?? { name, email, count: 0 };
    existing.count += 1;
    counts.set(key, existing);
  });

  return Array.from(counts.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

function getZeroDownloadResources(resources: any[], downloads: any[]) {
  const downloadedIds = new Set(downloads.map((download) => String(download.resource_id)));
  const downloadedTitles = new Set(downloads.map((download) => download.resource_title));

  return resources.filter((resource) => {
    const id = String(resource.id);
    return !downloadedIds.has(id) && !downloadedTitles.has(resource.title);
  });
}

function getDailyTrend(downloads: any[], days: number) {
  const result: { label: string; count: number; key: string }[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    const key = date.toISOString().slice(0, 10);

    result.push({
      key,
      label: `${date.getMonth() + 1}/${date.getDate()}`,
      count: 0,
    });
  }

  downloads.forEach((download) => {
    const key = new Date(download.downloaded_at).toISOString().slice(0, 10);
    const day = result.find((item) => item.key === key);

    if (day) {
      day.count += 1;
    }
  });

  return result;
}