import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import Footer from "./Footer.tsx";
import Header from "./Header.tsx";
import SkipLink from "./SkipLink.tsx";

export default function Layout() {
  const { hash, pathname } = useLocation();

  // React Router doesn't scroll to #anchors on its own (e.g. "/#work" from a project page).
  // Smooth only for in-page jumps; route changes snap to top via ScrollRestoration.
  useEffect(() => {
    if (!hash) return;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    target?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }, [hash, pathname]);

  return (
    <div className="flex min-h-dvh flex-col">
      <SkipLink />
      <Header />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
