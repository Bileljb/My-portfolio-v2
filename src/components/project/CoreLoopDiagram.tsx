const steps = [
  { label: "Create Community", actor: "Creator" },
  { label: "User Pays", actor: "Member" },
  { label: "Access Granted", actor: "System" },
  { label: "Engagement", actor: "Member" },
  { label: "Creator Earns", actor: "Creator" },
];

/**
 * OnePlace's core loop as a schematic. An ordered list, so screen readers get
 * the sequence; arrows are decorative. Vertical on mobile, horizontal from md.
 */
export default function CoreLoopDiagram() {
  return (
    <figure className="border-fg bg-surface relative border p-5 sm:p-8">
      <ol
        aria-label="OnePlace core loop"
        className="flex flex-col items-stretch gap-0 md:flex-row md:items-center"
      >
        {steps.map((step, i) => (
          <li key={step.label} className="flex flex-col items-center md:flex-1 md:flex-row">
            <div className="border-fg bg-bg w-full border px-3 py-3 text-center md:py-4">
              <span className="text-accent-text block font-mono text-[11px] tracking-widest uppercase">
                {String(i + 1).padStart(2, "0")} · {step.actor}
              </span>
              <span className="font-display mt-1 block leading-tight font-semibold">
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="text-accent py-1 font-mono text-lg leading-none md:px-1.5 md:py-0"
              >
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
            )}
          </li>
        ))}
      </ol>

      {/* Return path back to the first step: the loop repeats. */}
      <div aria-hidden="true" className="mt-3 hidden md:block">
        <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="text-accent h-8 w-full">
          <path
            d="M900 0 V24 H100 V6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="6 5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M92 12 L100 0 L108 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
      <p aria-hidden="true" className="text-accent mt-1 text-center font-mono text-lg md:hidden">
        ↺
      </p>

      <figcaption className="text-muted mt-4 text-center font-mono text-xs">
        <span className="text-accent-text">FIG.</span> OnePlace’s core product loop
      </figcaption>
    </figure>
  );
}
