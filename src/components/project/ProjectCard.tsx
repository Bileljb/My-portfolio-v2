import { Link } from "react-router";
import type { Project } from "../../data/types.ts";
import Tag from "../ui/Tag.tsx";
import TodoText from "../ui/TodoText.tsx";

interface ProjectCardProps {
  project: Project;
  /** Display index, e.g. 1 → "P-01". */
  index: number;
  variant?: "featured" | "in-progress";
}

/** Whole card is clickable via a stretched link on the title. */
export default function ProjectCard({ project, index, variant = "featured" }: ProjectCardProps) {
  const stack = project.cardStack ?? [...new Set(project.stack.flatMap((s) => s.items))];
  const inProgress = variant === "in-progress";

  return (
    <article
      className={`group bg-surface has-[a:focus-visible]:outline-accent relative border transition-shadow has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 motion-reduce:transition-none ${
        inProgress
          ? "border-rule border-dashed"
          : "border-fg hover:shadow-[6px_6px_0_0_var(--color-accent)]"
      }`}
    >
      <div className="border-rule text-muted flex items-center justify-between border-b px-5 py-2 font-mono text-xs tracking-widest uppercase">
        <span>P-{String(index).padStart(2, "0")}</span>
        <span className={inProgress ? "text-accent-text" : undefined}>
          {project.status === "in-progress" ? "In progress" : "Complete"}
        </span>
      </div>

      <div
        className={`grid gap-8 p-5 sm:p-8 ${stack.length > 0 ? "md:grid-cols-[1.6fr_1fr]" : ""}`}
      >
        <div>
          <h3 className={`font-semibold ${inProgress ? "text-2xl" : "text-3xl sm:text-4xl"}`}>
            <Link
              to={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 focus-visible:outline-none"
            >
              {project.title}
            </Link>
          </h3>
          <TodoText value={project.tagline} as="p" className="text-muted mt-3 text-lg" />
          {!inProgress && <TodoText value={project.summary} as="p" className="mt-4 max-w-prose" />}
          <p className="text-accent-text mt-6 font-mono text-sm" aria-hidden="true">
            {inProgress ? "See progress" : "Read case study"}{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none">
              →
            </span>
          </p>
        </div>

        {stack.length > 0 && (
          <div>
            <p className="text-muted font-mono text-xs tracking-widest uppercase">Built with</p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${project.title} tech stack`}>
              {stack.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
