type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export default function SectionTitle({
  eyebrow,
  title,
  description,
}: SectionTitleProps) {
  return (
    <div>
      {eyebrow && (
        <p className="font-semibold uppercase tracking-widest text-blue-600">
          {eyebrow}
        </p>
      )}

      <h2 className="mt-2 text-2xl font-bold text-slate-900">{title}</h2>

      {description && (
        <p className="mt-2 max-w-2xl text-slate-600">{description}</p>
      )}
    </div>
  );
}