import Link from "next/link";
import { GraduationCap } from "lucide-react";

import Card from "@/components/ui/Card";

type GradeCardProps = {
  name: string;
  href: string;
  description: string;
};

export default function GradeCard({
  name,
  href,
  description,
}: GradeCardProps) {
  return (
    <Link href={href} className="group block">
      <Card className="h-full p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
          <GraduationCap size={24} />
        </div>

        <h3 className="mt-6 text-2xl font-bold text-slate-900">{name}</h3>

        <p className="mt-3 text-slate-600">{description}</p>

        <p className="mt-6 font-semibold text-blue-600 transition-all group-hover:translate-x-1">
          Browse resources →
        </p>
      </Card>
    </Link>
  );
}