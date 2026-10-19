import type { ReactNode } from "react";
import { Link, useParams } from "react-router";
import CoreLoopDiagram from "../components/project/CoreLoopDiagram.tsx";
import Gallery from "../components/project/Gallery.tsx";
import ProjectNav from "../components/project/ProjectNav.tsx";
import VideoEmbed from "../components/project/VideoEmbed.tsx";
import Tag from "../components/ui/Tag.tsx";
import TodoText from "../components/ui/TodoText.tsx";
import { profile } from "../data/profile.ts";
import type { Project } from "../data/types.ts";
import { usePageMeta } from "../hooks/usePageMeta.ts";
import { getProject } from "../lib/projects.ts";
import { isRenderable, textOrNull } from "../lib/todo.ts";
import NotFound from "./NotFound.tsx";

interface Block {
  id: string;
  label: string;
  content: ReactNode;
}

export default function ProjectPage() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFound />;
  return <ProjectView project={project} />;
}

function ProjectView({ project }: { project: Project }) {
  usePageMeta({
    title: `${project.title} · ${profile.name}`,
    description:
      textOrNull(project.summary) ??
      textOrNull(project.tagline) ??
      `${project.title}, a project by ${profile.name}.`,
  });

  const blocks = buildBlocks(project);

  return (
    <article className="mx-auto max-w-6xl px-4 sm:px-6">
      <ProjectHeader project={project} />

      {blocks.map((block, i) => (
        <section
          key={block.id}
          id={block.id}
          aria-labelledby={`${block.id}-heading`}
          className="border-rule grid gap-4 border-t py-10 sm:py-14 lg:grid-cols-[12rem_1fr] lg:gap-10"
        >
          <h2
            id={`${block.id}-heading`}
            className="font-mono text-xs font-normal tracking-widest uppercase sm:text-sm lg:sticky lg:top-24 lg:self-start"
          >
            <span className="text-accent-text">{String(i + 1).padStart(2, "0")}</span> /{" "}
            {block.label}
          </h2>
          <div className="reveal min-w-0">{block.content}</div>
        </section>
      ))}

      <ProjectNav slug={project.slug} />
    </article>
  );
}

function ProjectHeader({ project }: { project: Project }) {
  const { live, repo } = project.links;
  return (
    <header className="pt-10 pb-12 sm:pt-16 sm:pb-16">
      <nav aria-label="Breadcrumb" className="font-mono text-xs sm:text-sm">
        <ol className="text-muted flex flex-wrap items-center gap-2">
          <li>
            <Link to="/#work" className="hover:text-fg underline-offset-4 hover:underline">
              Work
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-fg">
            {project.slug}
          </li>
        </ol>
      </nav>

      <p className="mt-8">
        <span
          className={`inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-xs tracking-widest uppercase ${
            project.status === "in-progress"
              ? "border-accent text-accent-text border-dashed"
              : "border-rule bg-surface"
          }`}
        >
          {project.status === "in-progress" ? "In progress" : "Complete"}
        </span>
      </p>
      <h1 className="mt-4 text-5xl leading-[0.95] font-semibold sm:text-7xl">{project.title}</h1>
      <TodoText
        value={project.tagline}
        as="p"
        className="text-muted mt-5 max-w-2xl text-lg sm:text-xl"
      />

      {(live || repo) && (
        <ul className="mt-8 flex flex-wrap gap-4">
          {live && (
            <li>
              <ExternalButton href={live} primary>
                Visit live site ↗
              </ExternalButton>
            </li>
          )}
          {repo && (
            <li>
              <ExternalButton href={repo}>View source ↗</ExternalButton>
            </li>
          )}
        </ul>
      )}
    </header>
  );
}

function buildBlocks(project: Project): Block[] {
  const features = project.features.filter(isRenderable);
  // A decision without its "why" says nothing, so it's hidden until the reason is written.
  const decisions = project.decisions.filter((d) => isRenderable(d.why));
  const prose = "max-w-prose text-lg leading-relaxed";
  const blocks: (Block | false)[] = [
    isRenderable(project.summary) && {
      id: "overview",
      label: "Overview",
      content: <TodoText value={project.summary} as="p" className={prose} />,
    },
    isRenderable(project.problem) && {
      id: "problem",
      label: "Problem",
      content: <TodoText value={project.problem} as="p" className={prose} />,
    },
    (isRenderable(project.solution) || project.diagram !== undefined) && {
      id: "solution",
      label: "Solution",
      content: (
        <div className="space-y-8">
          <TodoText value={project.solution} as="p" className={prose} />
          {project.diagram === "oneplace-core-loop" && <CoreLoopDiagram />}
        </div>
      ),
    },
    (isRenderable(project.role) || (project.team?.length ?? 0) > 0) && {
      id: "role",
      label: "My role",
      content: (
        <div className="space-y-6">
          <TodoText value={project.role} as="p" className={prose} />
          {project.team && project.team.length > 0 && (
            <p className="text-muted font-mono text-sm">
              Built with{" "}
              {project.team.map((m, i) => (
                <span key={m.name}>
                  {i > 0 && ", "}
                  {m.url ? (
                    <a href={m.url} className="text-fg underline underline-offset-4">
                      {m.name}
                    </a>
                  ) : (
                    <span className="text-fg">{m.name}</span>
                  )}
                </span>
              ))}
            </p>
          )}
        </div>
      ),
    },
    features.length > 0 && {
      id: "features",
      label: "Features",
      content: (
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {features.map((f, i) => (
            <li key={i} className="border-rule flex gap-3 border-b pb-3">
              <span aria-hidden="true" className="text-accent-text font-mono text-sm leading-7">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="leading-7">
                <TodoText value={f} />
              </span>
            </li>
          ))}
        </ul>
      ),
    },
    project.stack.length > 0 && {
      id: "stack",
      label: "Stack",
      content: (
        <dl className="divide-rule border-rule divide-y border-y">
          {project.stack.map((s) => (
            <div key={s.group} className="grid gap-2 py-4 sm:grid-cols-[8rem_1fr] sm:items-center">
              <dt className="text-muted font-mono text-sm">{s.group}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      ),
    },
    decisions.length > 0 && {
      id: "decisions",
      label: "Key decisions",
      content: (
        <ul className="grid gap-6 md:grid-cols-2">
          {decisions.map((d) => (
            <li key={d.title} className="border-fg bg-surface border p-5 sm:p-6">
              <h3 className="text-xl font-semibold">{d.title}</h3>
              <TodoText value={d.why} as="p" className="text-muted mt-3 leading-relaxed" />
            </li>
          ))}
        </ul>
      ),
    },
    project.screenshots.length > 0 && {
      id: "screenshots",
      label: "Screenshots",
      content: (
        <>
          <Gallery shots={project.screenshots} title={project.title} />
          <p className="border-rule text-muted mt-8 border-t border-dashed pt-4 font-mono text-sm">
            These are a few of the screens: there’s more in the app
            {project.links.live ? (
              <>
                {", "}
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent-text underline underline-offset-4"
                >
                  explore the live demo ↗<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </>
            ) : null}
            .
          </p>
        </>
      ),
    },
    {
      id: "demo",
      label: "Demo video",
      content: <VideoEmbed url={project.videoUrl} title={project.title} />,
    },
    (project.links.live !== undefined || project.links.repo !== undefined) && {
      id: "links",
      label: "Links",
      content: (
        <ul className="flex flex-wrap gap-4">
          {project.links.live && (
            <li>
              <ExternalButton href={project.links.live} primary>
                Visit live site ↗
              </ExternalButton>
            </li>
          )}
          {project.links.repo && (
            <li>
              <ExternalButton href={project.links.repo}>View source ↗</ExternalButton>
            </li>
          )}
        </ul>
      ),
    },
  ];
  return blocks.filter((b): b is Block => b !== false);
}

function ExternalButton({
  href,
  primary = false,
  children,
}: {
  href: string;
  primary?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-11 items-center border-2 px-5 py-2.5 font-mono text-sm font-medium transition-colors ${
        primary
          ? "bg-accent-fill text-on-accent border-accent-fill shadow-[4px_4px_0_0_var(--color-fg)]"
          : "border-fg hover:bg-fg hover:text-bg"
      }`}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
