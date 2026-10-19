/**
 * Prefixes a root-relative path under /public with the deploy base path, so
 * "/projects/x.webp" also works when the site is served from a sub-path
 * (e.g. GitHub Pages at /<repo>/). Other URLs are returned unchanged.
 */
export function assetUrl(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  return import.meta.env.BASE_URL.replace(/\/$/, "") + path;
}
