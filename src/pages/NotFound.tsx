import { Link, useLocation } from "react-router";
import { profile } from "../data/profile.ts";
import { usePageMeta } from "../hooks/usePageMeta.ts";

export default function NotFound() {
  const { pathname } = useLocation();
  usePageMeta({
    title: `Page not found · ${profile.name}`,
    description: "This page doesn’t exist.",
    noindex: true,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
      <p className="text-accent-text font-mono text-sm">ERR 404 · route not found</p>
      <h1 className="mt-4 text-5xl font-semibold sm:text-7xl">Nothing at this address.</h1>
      <p className="text-muted mt-6 max-w-prose">
        <code className="bg-surface border-rule border px-1.5 py-0.5 font-mono text-sm break-all">
          {pathname}
        </code>{" "}
        doesn’t match any page. It may have moved, or the link has a typo.
      </p>
      <Link
        to="/"
        className="bg-accent-fill text-on-accent mt-10 inline-block px-5 py-3 font-mono text-sm font-medium"
      >
        ← Back home
      </Link>
    </div>
  );
}
