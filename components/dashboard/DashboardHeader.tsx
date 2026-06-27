import { Star } from "lucide-react";

export default function DashboardHeader({ name }: { name?: string }) {
  const firstName = name?.split(" ")[0] ?? "Teacher";

  return (
    <section>
      <p className="font-semibold uppercase tracking-widest text-blue-600">
        Teacher Dashboard
      </p>

      <div className="mt-3 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Good Afternoon, {firstName} 👋
          </h1>

          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Welcome back! Everything you need for the classroom is organized
            and ready to teach.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          <Star size={16} />
          Founding Teacher Dashboard
        </div>
      </div>
    </section>
  );
}