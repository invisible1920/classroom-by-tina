import { CalendarDays, MapPin, Star } from "lucide-react";

import { getNextMonthReleaseInfo } from "@/lib/month-access";

export default function DashboardHeader({ name }: { name?: string }) {
  const firstName = name?.split(" ")[0] ?? "Teacher";
  const nextRelease = getNextMonthReleaseInfo();

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
          Teacher Dashboard
        </div>
      </div>

      {nextRelease?.nextMonth && nextRelease.releaseDate && (
        <div className="mt-8 rounded-[1.5rem] border border-[#ffe7b5] bg-[#fffaf3] p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-[#35c6c9]/10 p-3 text-[#35c6c9]">
                <CalendarDays size={24} />
              </div>

              <div>
                <p className="text-sm font-black uppercase tracking-widest text-[#ff8a3d]">
                  Monthly Resource Release
                </p>

                <h2 className="mt-2 text-2xl font-black text-[#17223b]">
                  {nextRelease.nextMonth} resources unlock{" "}
                  {nextRelease.releaseDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                  })}
                  .
                </h2>

                <p className="mt-2 font-semibold text-slate-600">
                  New lesson plans, centers, assessments, homework, parent
                  letters, and slides are added each month.
                </p>
              </div>
            </div>

            <div className="shrink-0 rounded-full bg-white px-5 py-3 text-center text-sm font-black text-[#17223b] shadow-sm">
              {nextRelease.daysUntilRelease === 0
                ? "Available today"
                : `${nextRelease.daysUntilRelease} days away`}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}