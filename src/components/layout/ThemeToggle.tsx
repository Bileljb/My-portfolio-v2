import { useEffect, useState } from "react";
import { getTheme, hasStoredTheme, setTheme, type Theme } from "../../lib/theme.ts";
import { MoonIcon, SunIcon } from "../ui/icons.tsx";

export default function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>(getTheme);

  // Follow OS changes until the visitor picks a theme explicitly.
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (hasStoredTheme()) return;
      const next: Theme = e.matches ? "dark" : "light";
      document.documentElement.dataset.theme = next;
      setThemeState(next);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(next);
        setThemeState(next);
      }}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="border-rule text-fg hover:border-fg grid size-10 place-items-center border transition-colors"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
