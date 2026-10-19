import { Link } from "react-router";
import { getAdjacent } from "../../lib/projects.ts";

export default function ProjectNav({ slug }: { slug: string }) {
  const adjacent = getAdjacent(slug);
  if (!adjacent) return null;
  const { prev, next } = adjacent;
  const same = prev.slug === next.slug;

  return (
    <nav aria-label="More projects" className="border-fg mt-20 grid border-t sm:grid-cols-2">
      {!same && (
        <NavCard to={prev.slug} direction="Previous project" title={prev.title} align="left" />
      )}
      <NavCard
        to={next.slug}
        direction={same ? "Other project" : "Next project"}
        title={next.title}
        align="right"
      />
    </nav>
  );
}

function NavCard({
  to,
  direction,
  title,
  align,
}: {
  to: string;
  direction: string;
  title: string;
  align: "left" | "right";
}) {
  return (
    <Link
      to={`/projects/${to}`}
      rel={align === "left" ? "prev" : "next"}
      className={`group border-rule hover:bg-surface block border-b px-2 py-6 transition-colors sm:py-8 ${
        align === "right" ? "sm:col-start-2 sm:border-l sm:text-right" : ""
      }`}
    >
      <span className="text-muted font-mono text-xs tracking-widest uppercase">
        {align === "left" ? "← " : ""}
        {direction}
        {align === "right" ? " →" : ""}
      </span>
      <span className="font-display mt-2 block text-2xl font-semibold group-hover:underline">
        {title}
      </span>
    </Link>
  );
}
