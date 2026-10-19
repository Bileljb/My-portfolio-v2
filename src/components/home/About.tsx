import { profile } from "../../data/profile.ts";
import { assetUrl } from "../../lib/assetUrl.ts";
import { isRenderable } from "../../lib/todo.ts";
import Section from "../ui/Section.tsx";
import TodoText from "../ui/TodoText.tsx";

export default function About() {
  const paragraphs = profile.bio.filter(isRenderable);
  // Built only from facts in profile.ts, so the section is never empty in production.
  const fallback = `${profile.role} based in ${profile.location}, working across ${profile.skills
    .flatMap((g) => g.items)
    .filter((s, i, all) => all.indexOf(s) === i)
    .slice(0, 6)
    .join(", ")}.${profile.openToRemote ? " Open to remote roles." : ""}`;

  return (
    <Section id="about" index="03" label="About" title="About me">
      <div className={`grid gap-10 ${profile.photo ? "md:grid-cols-[1fr_16rem]" : ""}`}>
        <div className="max-w-prose space-y-4 text-lg">
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => <TodoText key={i} value={p} as="p" />)
          ) : (
            <p>{fallback}</p>
          )}
        </div>
        {profile.photo && (
          <img
            src={assetUrl(profile.photo.src)}
            alt={profile.photo.alt}
            width={256}
            height={256}
            loading="lazy"
            decoding="async"
            className="border-fg aspect-square w-full max-w-64 border object-cover grayscale"
          />
        )}
      </div>
    </Section>
  );
}
