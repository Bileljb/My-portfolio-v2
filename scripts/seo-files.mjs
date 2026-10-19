// Writes dist/sitemap.xml and dist/robots.txt after `vite build`, plus a copy of
// index.html for each project route and as 404.html, so GitHub Pages serves the
// app on direct visits and refreshes of /projects/<slug>.
// Site URL comes from VITE_SITE_URL (.env); project slugs from src/data/projects.ts.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");

function siteUrl() {
  if (process.env.VITE_SITE_URL) return process.env.VITE_SITE_URL;
  for (const file of [".env.production.local", ".env.local", ".env.production", ".env"]) {
    try {
      const match = /^VITE_SITE_URL=(.+)$/m.exec(readFileSync(join(root, file), "utf8"));
      if (match) return match[1].trim();
    } catch {
      // file doesn't exist
    }
  }
  throw new Error("VITE_SITE_URL is not set (see .env)");
}

const base = siteUrl().replace(/\/$/, "");
const projectsSrc = readFileSync(join(root, "src", "data", "projects.ts"), "utf8");
const slugs = [...projectsSrc.matchAll(/^\s*slug:\s*"([a-z0-9-]+)"/gm)].map((m) => m[1]);
const paths = ["/", ...slugs.map((s) => `/projects/${s}`)];
const today = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${base}${p}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`;
const robots = `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;

writeFileSync(join(root, "dist", "sitemap.xml"), sitemap);
writeFileSync(join(root, "dist", "robots.txt"), robots);
console.log(`✓ sitemap.xml (${paths.length} URLs) and robots.txt written for ${base}`);

const indexHtml = readFileSync(join(root, "dist", "index.html"), "utf8");
for (const slug of slugs) {
  const dir = join(root, "dist", "projects", slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), indexHtml);
}
writeFileSync(join(root, "dist", "404.html"), indexHtml);
console.log(`✓ index.html copied to ${slugs.length} project routes and 404.html`);
