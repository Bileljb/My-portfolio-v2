import { featuredProjects, inProgressProjects } from "../../lib/projects.ts";
import ProjectCard from "../project/ProjectCard.tsx";
import Section from "../ui/Section.tsx";

export default function Work() {
  const featured = featuredProjects();
  const building = inProgressProjects();

  return (
    <Section id="work" index="01" label="Work" title="Selected work">
      <div className="grid gap-8">
        {featured.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i + 1} />
        ))}
      </div>

      {building.length > 0 && (
        <div className="mt-16">
          <h3 className="text-muted font-mono text-xs tracking-widest uppercase sm:text-sm">
            Currently building
          </h3>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {building.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                index={featured.length + i + 1}
                variant="in-progress"
              />
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
