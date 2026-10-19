import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  index: string;
  label: string;
  title?: string;
  children: ReactNode;
}

/** Numbered home-page section: "01 / WORK", optional display title, then content. */
export default function Section({ id, index, label, title, children }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className="border-rule border-t py-16 sm:py-24">
      <p className="font-mono text-xs tracking-widest uppercase sm:text-sm" aria-hidden={!!title}>
        <span className="text-accent-text">{index}</span> / {label}
      </p>
      {title ? (
        <h2 id={headingId} className="mt-4 max-w-2xl text-3xl font-semibold sm:text-4xl">
          {title}
        </h2>
      ) : (
        <h2 id={headingId} className="sr-only">
          {label}
        </h2>
      )}
      <div className="reveal mt-10">{children}</div>
    </section>
  );
}
