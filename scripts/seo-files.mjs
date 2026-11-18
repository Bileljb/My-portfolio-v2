// Writes dist/sitemap.xml and dist/robots.txt after `vite build`, plus a copy of
// index.html for each project route, each /services language and 404.html, so GitHub Pages serves
// the app on direct visits and refreshes.
// Site URL comes from VITE_SITE_URL (.env); project slugs from src/data/projects.ts;
// each /services title and description from src/data/services*.ts.
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
// The services page in each language: copy file, path, and <html lang>.
const servicesPages = [
  { lang: "en", file: "services.ts", path: "/services" },
  { lang: "fr", file: "services.fr.ts", path: "/fr/services" },
  { lang: "ar", file: "services.ar.ts", path: "/ar/services" },
];
const paths = ["/", ...servicesPages.map((p) => p.path), ...slugs.map((s) => `/projects/${s}`)];
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

// Each services page gets its own title, description, language and social tags in the
// static HTML, because link previews (WhatsApp, Instagram, LinkedIn) don't run JavaScript.
const attr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
// Replacement functions, so "$" in the copy is never read as a replacement pattern.
const setContent = (html, key, value) => {
  const re = new RegExp(`(<meta\\s+(?:name|property)="${key}"\\s+content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`index.html has no <meta> for ${key}`);
  return html.replace(re, (_, open, close) => open + attr(value) + close);
};
const hreflangLinks = servicesPages
  .map((p) => `    <link rel="alternate" hreflang="${p.lang}" href="${base}${p.path}" />`)
  .join("\n");

for (const page of servicesPages) {
  const src = readFileSync(join(root, "src", "data", page.file), "utf8");
  const meta = /meta:\s*\{\s*title:\s*"([^"]+)",\s*description:\s*"([^"]+)"/.exec(src);
  if (!meta) throw new Error(`Could not read meta.title/description from src/data/${page.file}`);
  const [, title, description] = meta;
  const url = `${base}${page.path}`;

  let html = indexHtml
    .replace(/<html lang="[^"]*"/, () => `<html lang="${page.lang}"`)
    .replace(/<title>[^<]*<\/title>/, () => `<title>${attr(title)}</title>`)
    .replace("</head>", () => `${hreflangLinks}\n  </head>`);
  for (const key of ["description", "og:description", "twitter:description"])
    html = setContent(html, key, description);
  for (const key of ["og:title", "twitter:title"]) html = setContent(html, key, title);
  html = setContent(html, "og:url", url).replace(
    /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
    (_, open, close) => `${open}${url}${close}`,
  );

  const dir = join(root, "dist", ...page.path.split("/").filter(Boolean));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html);
  console.log(`✓ ${page.path.slice(1)}/index.html written with its own meta tags`);
}
