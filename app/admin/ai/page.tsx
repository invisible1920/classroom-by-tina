import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  GraduationCap,
  Mail,
  PencilLine,
  Sparkles,
  Wand2,
} from "lucide-react";

import Card from "@/components/ui/Card";

const aiTools = [
  {
    title: "Homework Generator",
    description: "Create homework from an uploaded lesson or resource.",
    icon: PencilLine,
  },
  {
    title: "Parent Letter Generator",
    description: "Turn classroom updates into polished parent communication.",
    icon: Mail,
  },
  {
    title: "Centers Generator",
    description: "Generate differentiated center activities by ability group.",
    icon: GraduationCap,
  },
  {
    title: "Worksheet Generator",
    description: "Create printable practice sheets from standards and skills.",
    icon: FileText,
  },
  {
    title: "Reading Passage Generator",
    description: "Generate grade-level passages with questions and vocabulary.",
    icon: BookOpen,
  },
  {
    title: "Resource Remix",
    description: "Adapt one resource into multiple versions for different learners.",
    icon: Wand2,
  },
];

export default function AIPage() {
  return (
    <main className="min-h-screen bg-[#fff8f0] px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 font-black text-[#3b82f6] transition hover:gap-3"
        >
          <ArrowLeft size={18} />
          Back to Admin
        </Link>

        <section className="mt-8 rounded-[2rem] bg-[#1f2a44] p-8 text-white shadow-2xl shadow-slate-950/15">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl bg-white/10 p-3">
                <Sparkles size={30} className="text-[#f5b942]" />
              </div>

              <div>
                <p className="text-sm font-black uppercase tracking-widest text-[#f5b942]">
                  AI Workspace
                </p>

                <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">
                  Tina’s AI teaching tools
                </h1>

                <p className="mt-4 max-w-3xl text-lg leading-8 text-white/70">
                  Future generators for homework, parent letters, centers,
                  worksheets, reading passages, and differentiated resources.
                </p>
              </div>
            </div>

            <div className="rounded-full bg-white px-5 py-3 font-black text-[#1f2a44]">
              Coming Soon
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {aiTools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Card key={tool.title} className="p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#3b82f6]/10 text-[#3b82f6]">
                  <Icon size={24} />
                </div>

                <h2 className="mt-6 text-2xl font-black text-[#1f2a44]">
                  {tool.title}
                </h2>

                <p className="mt-3 leading-7 text-slate-600">
                  {tool.description}
                </p>

                <button
                  type="button"
                  disabled
                  className="mt-6 rounded-full bg-slate-100 px-5 py-3 text-sm font-black text-slate-400"
                >
                  Coming Soon
                </button>
              </Card>
            );
          })}
        </section>

        <section className="mt-8 rounded-[2rem] border border-[#f5b942]/30 bg-white p-8 shadow-sm">
          <p className="text-sm font-black uppercase tracking-widest text-[#f5b942]">
            Recommended Build Order
          </p>

          <h2 className="mt-2 text-3xl font-black text-[#1f2a44]">
            Start with resource-based generation
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-600">
            The first useful AI workflow should let Tina upload or select one
            existing resource, then generate homework, parent letters, centers,
            and ability-level variations from that resource.
          </p>
        </section>
      </div>
    </main>
  );
}