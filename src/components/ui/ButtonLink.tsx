import type { ReactNode } from "react";
import { Link } from "react-router";

type Variant = "primary" | "secondary";

const styles: Record<Variant, string> = {
  primary:
    "bg-accent-fill text-on-accent border-accent-fill shadow-[4px_4px_0_0_var(--color-fg)] hover:translate-x-px hover:translate-y-px hover:shadow-[3px_3px_0_0_var(--color-fg)]",
  secondary: "border-fg text-fg hover:bg-fg hover:text-bg",
};

interface ButtonLinkProps {
  to: string;
  variant?: Variant;
  children: ReactNode;
}

/** Router link styled as a button. Use for in-app destinations (including /#anchors). */
export default function ButtonLink({ to, variant = "primary", children }: ButtonLinkProps) {
  return (
    <Link
      to={to}
      className={`inline-flex min-h-11 items-center gap-2 border-2 px-5 py-2.5 font-mono text-sm font-medium transition-[transform,box-shadow,background-color,color] motion-reduce:transition-none ${styles[variant]}`}
    >
      {children}
    </Link>
  );
}
