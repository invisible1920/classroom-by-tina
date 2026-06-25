import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "white";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200",
    size === "sm" && "px-4 py-2 text-sm",
    size === "md" && "px-5 py-3",
    size === "lg" && "px-6 py-4",
    variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
    variant === "secondary" &&
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
    variant === "ghost" && "text-slate-600 hover:bg-slate-100",
    variant === "white" && "bg-white text-blue-700 hover:bg-blue-50",
    className
  );
}

export default function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button className={buttonStyles({ variant, size, className })} {...props}>
      {children}
    </button>
  );
}