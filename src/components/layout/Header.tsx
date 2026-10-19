import { Link } from "react-router";
import { profile } from "../../data/profile.ts";
import ThemeToggle from "./ThemeToggle.tsx";

const nav = [
  { label: "Work", to: "/#work" },
  { label: "About", to: "/#about" },
  { label: "Contact", to: "/#contact" },
];

export default function Header() {
  return (
    <header className="border-rule bg-bg/90 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-3" aria-label={`${profile.name}, home`}>
          <span
            aria-hidden="true"
            className="border-fg text-fg group-hover:text-accent-text relative grid size-9 place-items-center border-2 font-mono text-sm font-semibold tracking-tighter transition-colors motion-reduce:transition-none"
          >
            &lt;/&gt;
            <span className="bg-accent absolute -top-1 -right-1 size-2 rounded-full" />
          </span>
          <span className="font-display hidden font-semibold sm:inline">{profile.name}</span>
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          <ul className="flex items-center">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-muted hover:text-fg px-2 py-2 font-mono text-xs tracking-wide uppercase transition-colors sm:px-3 sm:text-sm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
