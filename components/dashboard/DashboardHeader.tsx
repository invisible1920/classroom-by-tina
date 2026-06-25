import { Search, Star } from "lucide-react";

export default function DashboardHeader() {
  return (
    <section>
      <p className="font-semibold uppercase tracking-widest text-blue-600">
        Teacher Dashboard
      </p>

      <div className="mt-3 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Good Afternoon 👋
          </h1>

          <p className="mt-3 max-w-2xl text-lg text-slate-600">
            Welcome back! Everything Tina needs for the classroom is organized
            and ready to teach.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          <Star size={16} />
          Founding Teacher Dashboard
        </div>
      </div>

      <div className="relative mt-8">
        <Search
          size={20}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          placeholder="Search lesson plans, standards, centers..."
          className="w-full rounded-2xl border border-slate-200 bg-white px-12 py-4 text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
        />
      </div>
    </section>
  );
}