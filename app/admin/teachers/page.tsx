import { Users } from "lucide-react";
import { getTeachers } from "@/services";

export default async function TeachersPage() {
  const teachers = await getTeachers();

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
                {teachers.length} teacher{teachers.length !== 1 ? "s" : ""} found
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-amber-100 bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-black text-[#1f2a44]">
            Teacher Accounts
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="py-3 font-black">Name</th>
                  <th className="py-3 font-black">Email</th>
                  <th className="py-3 font-black">Plan</th>
                  <th className="py-3 font-black">Joined</th>
                </tr>
              </thead>

              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.id} className="border-b border-slate-100">
                    <td className="py-4 font-bold text-[#1f2a44]">
                      {teacher.full_name ?? "No Name"}
                    </td>

                    <td className="py-4 text-slate-600">{teacher.email}</td>

                    <td className="py-4 capitalize text-slate-600">
                      {teacher.subscription}
                    </td>

                    <td className="py-4 text-slate-600">
                      {new Date(teacher.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}

                {teachers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-500">
                      No teachers found.
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