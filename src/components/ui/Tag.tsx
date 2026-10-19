import type { ReactNode } from "react";

export default function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="border-rule bg-surface text-fg inline-block border px-2 py-0.5 font-mono text-xs">
      {children}
    </span>
  );
}
