import { Sparkles } from "lucide-react";

export default function AIPage() {
  return (
    <main className="min-h-screen bg-[#fff8f0] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[2rem] bg-[#1f2a44] p-8 text-white shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white/10 p-3">
              <Sparkles size={28} className="text-[#f5b942]" />
            </div>

            <div>
              <h1 className="text-4xl font-black">AI Tools</h1>
              <p className="mt-2 text-white/70">
                AI-powered tools for teachers.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-[2rem] border border-amber-100 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-black text-[#1f2a44]">
            AI Workspace
          </h2>

          <p className="mt-3 text-slate-600">
            Homework generators, lesson planning, parent letters and more will
            live here.
          </p>
        </section>
      </div>
    </main>
  );
}