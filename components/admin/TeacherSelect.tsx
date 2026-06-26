"use client";

import type { TeacherRole, TeacherSubscription } from "@/types/teacher";

export function RoleSelect({
  teacherId,
  value,
  action,
}: {
  teacherId: string;
  value: TeacherRole;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="teacherId" value={teacherId} />

      <select
        name="role"
        defaultValue={value}
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
        className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-black uppercase text-[#1f2a44] shadow-sm outline-none"
      >
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>
    </form>
  );
}

export function PlanSelect({
  teacherId,
  value,
  action,
}: {
  teacherId: string;
  value: TeacherSubscription;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action}>
      <input type="hidden" name="teacherId" value={teacherId} />

      <select
        name="subscription"
        defaultValue={value}
        onChange={(event) => event.currentTarget.form?.requestSubmit()}
        className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-black uppercase text-[#1f2a44] shadow-sm outline-none"
      >
        <option value="free">Free</option>
        <option value="pro">Pro</option>
      </select>
    </form>
  );
}