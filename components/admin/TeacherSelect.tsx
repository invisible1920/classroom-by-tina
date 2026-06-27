"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { TeacherRole, TeacherSubscription } from "@/types/teacher";

export function RoleSelect({
  teacherId,
  value,
  action,
}: {
  teacherId: string;
  value: TeacherRole;
  action: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [role, setRole] = useState(value);

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          await action(formData);
          router.refresh();
        });
      }}
    >
      <input type="hidden" name="teacherId" value={teacherId} />

      <select
        name="role"
        value={role}
        disabled={pending}
        onChange={(e) => {
          setRole(e.target.value as TeacherRole);
          e.currentTarget.form?.requestSubmit();
        }}
        className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-black text-[#1f2a44]"
      >
        <option value="teacher">TEACHER</option>
        <option value="admin">ADMIN</option>
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
  action: (formData: FormData) => Promise<void>;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [subscription, setSubscription] = useState(value);

  return (
    <form
      action={(formData) => {
        startTransition(async () => {
          await action(formData);
          router.refresh();
        });
      }}
    >
      <input type="hidden" name="teacherId" value={teacherId} />

      <select
        name="subscription"
        value={subscription}
        disabled={pending}
        onChange={(e) => {
          setSubscription(e.target.value as TeacherSubscription);
          e.currentTarget.form?.requestSubmit();
        }}
        className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-black text-[#1f2a44]"
      >
        <option value="free">FREE</option>
        <option value="pro">PRO</option>
      </select>
    </form>
  );
}