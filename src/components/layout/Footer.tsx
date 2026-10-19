import { profile } from "../../data/profile.ts";
import { GitHubIcon, LinkedInIcon } from "../ui/icons.tsx";

export default function Footer() {
  const year = new Date().getFullYear();
  const linkClass = "text-muted hover:text-fg inline-flex items-center gap-2 transition-colors";

  return (
    <footer className="border-rule mt-24 border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 font-mono text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-muted">
          © {year} {profile.name} · {profile.location}
        </p>
        <ul className="flex gap-6">
          <li>
            <a href={profile.links.github} className={linkClass} rel="me noopener">
              <GitHubIcon width={16} height={16} />
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.links.linkedin} className={linkClass} rel="me noopener">
              <LinkedInIcon width={16} height={16} />
              LinkedIn
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
