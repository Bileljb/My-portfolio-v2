import { useEffect } from "react";
import { useLocation } from "react-router";

const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "").replace(/\/$/, "");

interface PageMeta {
  title: string;
  description: string;
  /** Adds <meta name="robots" content="noindex"> (e.g. 404). */
  noindex?: boolean;
  /** Page language, set on <html lang>. Defaults to English. */
  lang?: string;
  /** The same page in every language, as <link rel="alternate" hreflang>. */
  alternates?: readonly { lang: string; path: string }[];
}

const noAlternates: PageMeta["alternates"] = [];

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/**
 * Per-page <title>, description, canonical and social tags. index.html holds the
 * home-page defaults that crawlers without JavaScript see.
 */
export function usePageMeta({
  title,
  description,
  noindex = false,
  lang = "en",
  alternates = noAlternates,
}: PageMeta) {
  const { pathname } = useLocation();

  useEffect(() => {
    const url = `${SITE_URL}${pathname}`;
    document.documentElement.lang = lang;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const robots = document.head.querySelector('meta[name="robots"]');
    if (noindex && !robots) setMeta("name", "robots", "noindex");
    if (!noindex) robots?.remove();

    for (const el of document.head.querySelectorAll('link[rel="alternate"][hreflang]')) el.remove();
    for (const alt of alternates ?? []) {
      const link = document.createElement("link");
      link.rel = "alternate";
      link.hreflang = alt.lang;
      link.href = `${SITE_URL}${alt.path}`;
      document.head.appendChild(link);
    }
  }, [title, description, noindex, lang, alternates, pathname]);
}
