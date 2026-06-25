import { BookOpen, Pencil, Sparkles } from "lucide-react";

export default function ClassroomIllustration() {
  return (
    <div className="pointer-events-none absolute right-8 top-28 hidden lg:block">
      <div className="relative h-40 w-40">
        <div className="absolute left-0 top-8 flex h-16 w-16 rotate-[-10deg] items-center justify-center rounded-3xl bg-[#f5b942] text-[#1f2a44] shadow-xl">
          <BookOpen size={30} />
        </div>

        <div className="absolute right-0 top-0 flex h-14 w-14 rotate-[12deg] items-center justify-center rounded-2xl bg-[#3b82f6] text-white shadow-xl">
          <Pencil size={26} />
        </div>

        <div className="absolute bottom-0 left-16 flex h-12 w-12 rotate-[8deg] items-center justify-center rounded-2xl bg-[#fb7185] text-white shadow-xl">
          <Sparkles size={22} />
        </div>
      </div>
    </div>
  );
}