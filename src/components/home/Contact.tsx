import type { ReactNode } from "react";
import { profile } from "../../data/profile.ts";
import { isTodo, SHOW_TODOS, textOrNull } from "../../lib/todo.ts";
import { GitHubIcon, LinkedInIcon, MailIcon } from "../ui/icons.tsx";
import Section from "../ui/Section.tsx";
import { TodoBadge } from "../ui/TodoText.tsx";

/** "https://github.com/Bileljb/" → "github.com/Bileljb" */
function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

export default function Contact() {
  const email = textOrNull(profile.email);

  return (
    <Section id="contact" index="04" label="Contact" title="Hiring for a remote full stack role?">
      <p className="text-muted max-w-prose text-lg">
        I’m open to remote full stack positions. Reach out through any of these.
      </p>

      <ul className="border-fg mt-10 border-t">
        {email ? (
          <ContactRow label="Email" href={`mailto:${email}`} icon={<MailIcon />}>
            {email}
          </ContactRow>
        ) : (
          SHOW_TODOS &&
          isTodo(profile.email) && (
            <li className="border-rule border-b py-5">
              <TodoBadge note={profile.email.__todo} />
            </li>
          )
        )}
        <ContactRow label="LinkedIn" href={profile.links.linkedin} icon={<LinkedInIcon />}>
          {displayUrl(profile.links.linkedin)}
        </ContactRow>
        <ContactRow label="GitHub" href={profile.links.github} icon={<GitHubIcon />}>
          {displayUrl(profile.links.github)}
        </ContactRow>
        {profile.links.cv && (
          <ContactRow label="CV" href={profile.links.cv}>
            Download CV (PDF)
          </ContactRow>
        )}
      </ul>
    </Section>
  );
}

interface ContactRowProps {
  label: string;
  href: string;
  icon?: ReactNode;
  children: ReactNode;
}

function ContactRow({ label, href, icon, children }: ContactRowProps) {
  return (
    <li className="border-rule border-b">
      <a
        href={href}
        rel={href.startsWith("http") ? "me noopener" : undefined}
        className="group hover:bg-surface flex flex-wrap items-center gap-x-6 gap-y-2 py-5 transition-colors sm:flex-nowrap sm:px-2"
      >
        <span className="text-muted flex w-full shrink-0 items-center gap-2 font-mono text-xs tracking-widest uppercase sm:w-28">
          {icon}
          {label}
        </span>
        <span className="font-display min-w-0 flex-1 text-base font-medium [overflow-wrap:anywhere] sm:text-2xl">
          {children}
        </span>
        <span
          aria-hidden="true"
          className="text-accent-text hidden font-mono transition-transform group-hover:translate-x-1 motion-reduce:transition-none sm:inline"
        >
          →
        </span>
      </a>
    </li>
  );
}
