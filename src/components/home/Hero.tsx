import type { CSSProperties } from "react";
import { profile } from "../../data/profile.ts";
import ButtonLink from "../ui/ButtonLink.tsx";
import TodoText from "../ui/TodoText.tsx";

const coreStack = ["React", "Node.js", "TypeScript", "PostgreSQL"];

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="grid gap-12 pt-10 pb-16 sm:pt-20 sm:pb-24 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-16 lg:pt-28"
    >
      <div>
        {profile.openToRemote && (
          <p className="rise border-rule bg-surface inline-flex items-center gap-2.5 border px-3 py-1.5 font-mono text-xs">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="bg-accent absolute inline-flex size-full rounded-full opacity-75 motion-safe:animate-ping" />
              <span className="bg-accent relative inline-flex size-2 rounded-full" />
            </span>
            Open to remote work
          </p>
        )}

        <h1
          id="hero-heading"
          className="mt-6 text-5xl leading-[0.95] font-semibold sm:text-7xl lg:text-8xl"
        >
          {profile.name}
        </h1>
        <p
          className="rise text-muted mt-5 text-lg sm:text-xl"
          style={{ "--i": 1 } as CSSProperties}
        >
          {profile.role} based in {profile.location}.
        </p>
        <div className="rise" style={{ "--i": 2 } as CSSProperties}>
          <TodoText value={profile.headline} as="p" className="mt-3 max-w-xl text-lg sm:text-xl" />
        </div>

        <div className="rise mt-8 flex flex-wrap gap-4" style={{ "--i": 3 } as CSSProperties}>
          <ButtonLink to="/#work">View my work →</ButtonLink>
          <ButtonLink to="/#contact" variant="secondary">
            Get in touch
          </ButtonLink>
        </div>
      </div>

      <div className="rise" style={{ "--i": 4 } as CSSProperties}>
        <SpecSheet />
      </div>
    </section>
  );
}

/** Engineering-drawing style summary card: the facts a remote recruiter scans for. */
function SpecSheet() {
  const rows: [string, string][] = [
    ["Role", profile.role],
    ["Based in", profile.location],
    ["Timezone", profile.timezone],
    ["Open to", profile.openToRemote ? "Remote roles" : "On-site roles"],
    ["Core stack", coreStack.join(" · ")],
  ];

  return (
    <aside
      aria-label="At a glance"
      className="border-fg bg-surface relative border font-mono text-sm"
    >
      <Corner className="-top-1.5 -left-1.5" />
      <Corner className="-top-1.5 -right-1.5" />
      <Corner className="-bottom-1.5 -left-1.5" />
      <Corner className="-right-1.5 -bottom-1.5" />
      <div className="border-rule text-muted flex justify-between border-b px-4 py-2 text-xs tracking-widest uppercase">
        <span>Spec sheet</span>
        <span aria-hidden="true">BJ/01</span>
      </div>
      <dl className="divide-rule divide-y">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 px-4 py-3">
            <dt className="text-muted">{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <span aria-hidden="true" className={`absolute size-3 ${className}`}>
      <span className="bg-accent absolute top-1/2 left-0 h-px w-full" />
      <span className="bg-accent absolute top-0 left-1/2 h-full w-px" />
    </span>
  );
}
