import Link from "next/link";
import { Search, Users } from "lucide-react";
import { getTeachers } from "@/services";
import { RoleSelect, PlanSelect } from "@/components/admin/TeacherSelect";
import {
  updateTeacherRole,
  updateTeacherSubscription,
} from "./actions";

export default async function TeachersPage({
  searchParams,
}: {
  searchParams?: Promise<{
    search?: string;
    role?: string;
    plan?: string;
  }>;
}) {
  const params = await searchParams;
  const teachers = await getTeachers();

  const search = params?.search?.toLowerCase() ?? "";
  const roleFilter = params?.role ?? "all";
  const planFilter = params?.plan ?? "all";

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.full_name?.toLowerCase().includes(search) ||
      teacher.email.toLowerCase().includes(search);

    const matchesRole = roleFilter === "all" || teacher.role === roleFilter;

    const matchesPlan =
      planFilter === "all" || teacher.subscription_status === planFilter;

    return matchesSearch && matchesRole && matchesPlan;
  });

  const teacherCount = teachers.filter((t) => t.role === "teacher").length;
  const adminCount = teachers.filter((t) => t.role === "admin").length;
  const proCount = teachers.filter((t) => t.subscription_status === "pro").length;
  const freeCount = teachers.filter((t) => t.subscription_status === "free").length;

  return (
    <main className="min-h-screen bg-[#fff8f0] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] bg-[#1f2a44] p-8 text-white shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white/10 p-3">
              <Users size={28} className="text-[#f5b942]" />
            </div>

            <div>
              <h1 className="text-4xl font-black">Teachers</h1>
              <p className="mt-2 text-white/70">
                {filteredTeachers.length} account
                {filteredTeachers.length !== 1 ? "s" : ""} shown
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-4">
          <MetricCard label="Teachers" value={teacherCount} />
          <MetricCard label="Admins" value={adminCount} />
          <MetricCard label="Pro" value={proCount} />
          <MetricCard label="Free" value={freeCount} />
        </section>

        <section className="mt-8 rounded-[2rem] border border-amber-100 bg-white p-8 shadow-sm">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-2xl font-black text-[#1f2a44]">
              Teacher Accounts
            </h2>

            <form className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  name="search"
                  defaultValue={params?.search ?? ""}
                  placeholder="Search teachers..."
                  className="w-full rounded-full border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm font-semibold outline-none focus:border-[#3b82f6]"
                />
              </div>

              <select
                name="role"
                defaultValue={roleFilter}
                className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-black text-[#1f2a44]"
              >
                <option value="all">All Roles</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>

              <select
                name="plan"
                defaultValue={planFilter}
                className="rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-black text-[#1f2a44]"
              >
                <option value="all">All Plans</option>
                <option value="free">Free</option>
                <option value="pro">Pro</option>
              </select>

              <button className="rounded-full bg-[#1f2a44] px-5 py-3 text-sm font-black text-white">
                Filter
              </button>
            </form>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="py-3 font-black">Account</th>
                  <th className="py-3 font-black">Role</th>
                  <th className="py-3 font-black">Plan</th>
                  <th className="py-3 font-black">Joined</th>
                  <th className="py-3 font-black">Update</th>
                  <th className="py-3 font-black">Details</th>
                </tr>
              </thead>

              <tbody>
                {filteredTeachers.map((teacher) => {
                  const initials = getInitials(
                    teacher.full_name ?? teacher.email
                  );

                  return (
                    <tr key={teacher.id} className="border-b border-slate-100">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1f2a44] text-sm font-black text-white">
                            {initials}
                          </div>

                          <div>
                            <p className="font-black text-[#1f2a44]">
                              {teacher.full_name ?? "No Name"}
                            </p>
                            <p className="text-slate-500">{teacher.email}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4">
                        <RoleBadge role={teacher.role} />
                      </td>

                      <td className="py-4">
                        <PlanBadge plan={teacher.subscription_status ?? "free"} />
                      </td>

                      <td className="py-4 text-slate-600">
                        {new Date(teacher.created_at).toLocaleDateString()}
                      </td>

                      <td className="py-4">
                        <div className="flex gap-2">
                          <RoleSelect
                            teacherId={teacher.id}
                            value={teacher.role}
                            action={updateTeacherRole}
                          />

                          <PlanSelect
                            teacherId={teacher.id}
                            value={teacher.subscription_status ?? "free"}
                            action={updateTeacherSubscription}
                          />
                        </div>
                      </td>

                      <td className="py-4">
                        <Link
                          href={`/admin/teachers/${teacher.id}`}
                          className="rounded-full bg-[#1f2a44] px-4 py-2 text-xs font-black text-white"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}

                {filteredTeachers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500">
                      No accounts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[1.5rem] border border-amber-100 bg-white p-5 shadow-sm">
      <p className="text-sm font-black uppercase tracking-widest text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black text-[#1f2a44]">{value}</p>
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  const isAdmin = role === "admin";

  return (
    <span
      className={
        isAdmin
          ? "rounded-full bg-[#1f2a44] px-3 py-1 text-xs font-black uppercase text-white"
          : "rounded-full bg-slate-100 px-3 py-1 text-xs font-black uppercase text-slate-600"
      }
    >
      {role}
    </span>
  );
}

function PlanBadge({ plan }: { plan: string }) {
  const isPro = plan === "pro";

  return (
    <span
      className={
        isPro
          ? "rounded-full bg-green-100 px-3 py-1 text-xs font-black uppercase text-green-700"
          : "rounded-full bg-[#f5b942]/20 px-3 py-1 text-xs font-black uppercase text-[#1f2a44]"
      }
    >
      {plan}
    </span>
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