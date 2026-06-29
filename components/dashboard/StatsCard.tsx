import Card from "@/components/ui/Card";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
}

const colors = {
  Resources: {
    bg: "bg-[#35c6c9]/10",
    text: "text-[#35c6c9]",
    border: "border-[#35c6c9]/20",
    emoji: "📚",
  },
  Featured: {
    bg: "bg-[#f7b928]/20",
    text: "text-[#d48806]",
    border: "border-[#f7b928]/30",
    emoji: "⭐",
  },
  New: {
    bg: "bg-[#ff6f91]/15",
    text: "text-[#ff6f91]",
    border: "border-[#ff6f91]/20",
    emoji: "🎉",
  },
  "My Downloads": {
    bg: "bg-[#8b5cf6]/10",
    text: "text-[#8b5cf6]",
    border: "border-[#8b5cf6]/20",
    emoji: "📥",
  },
};

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
}: StatsCardProps) {
  const style =
    colors[title as keyof typeof colors] ??
    {
      bg: "bg-slate-100",
      text: "text-slate-700",
      border: "border-slate-200",
      emoji: "✨",
    };

  return (
    <Card
      className={`rounded-[2rem] border ${style.border} bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-black text-[#17223b]">
            {value}
          </h2>

          <p className="mt-2 text-sm font-semibold text-slate-500">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${style.bg} ${style.text}`}
        >
          {icon}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <span className="text-xl">{style.emoji}</span>

        <div className="h-2 flex-1 rounded-full bg-[#fff3c4]">
          <div className="h-full w-3/4 rounded-full bg-[#35c6c9]" />
        </div>
      </div>
    </Card>
  );
}