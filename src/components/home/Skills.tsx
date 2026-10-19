import { profile } from "../../data/profile.ts";
import Section from "../ui/Section.tsx";
import Tag from "../ui/Tag.tsx";

export default function Skills() {
  return (
    <Section id="stack" index="02" label="Stack" title="Tools I build with">
      <div className="border-rule grid border-y sm:auto-cols-fr sm:grid-flow-col">
        {profile.skills.map((group, i) => (
          <div
            key={group.group}
            className="border-rule border-b py-6 last:border-b-0 sm:border-b-0 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0"
          >
            <h3 className="font-mono text-sm">
              <span className="text-accent-text">{String(i + 1).padStart(2, "0")}</span>{" "}
              {group.group}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
