import { MapPin, Star } from "lucide-react";

export default function DashboardHeader({ name }: { name?: string }) {
  const firstName = name?.split(" ")[0] ?? "Teacher";

  return (
    <section className="overflow-hidden rounded-[2rem] border border-[#ffe7b5] bg-white p-8 shadow-sm">
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#fff3c4] px-4 py-2 text-sm font-black text-[#17223b]">
            <MapPin size={16} className="text-[#ff8a3d]" />
            Charlotte-Mecklenburg K–2 Resources
          </div>

          <h1 className="mt-5 text-4xl font-black tracking-tight text-[#17223b]">
            Welcome back, {firstName} 👋
          </h1>

          <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">
            Your CMS classroom resources are organized by grade, subject, week,
            and teaching routine.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-full bg-[#35c6c9]/10 px-4 py-2 text-sm font-black text-[#35c6c9]">
          <Star size={16} fill="currentColor" />
          Pro Teacher Dashboard
        </div>
      </div>
    </section>
  );
}