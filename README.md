# Bilel Jabrane · Portfolio

Personal portfolio of Bilel Jabrane, full stack developer from Tunis, Tunisia. Open to remote work.

Static site built with React 19, Vite, TypeScript (strict), Tailwind CSS 4 and React Router. No backend: all content lives in two typed data files.

## Setup

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
```

| Command           | What it does                                                    |
| ----------------- | --------------------------------------------------------------- |
| `npm run dev`     | Dev server with hot reload. TODO placeholders show as badges.   |
| `npm run build`   | Type-check, build to `dist/`, write sitemap/robots, list TODOs. |
| `npm run preview` | Serve the production build at http://localhost:4173.            |
| `npm run lint`    | ESLint (TypeScript, React hooks, accessibility rules).          |
| `npm test`        | Unit tests (YouTube URL parsing).                               |
| `npm run format`  | Prettier.                                                       |
| `npm run todos`   | List missing content (TODO) and placeholder copy (DRAFT).       |

## Where content lives

- `src/data/profile.ts`: name, role, location, headline, bio, email, links, skills.
- `src/data/projects.ts`: every project. Pages render from this list.
- `.env`: `VITE_SITE_URL`, the public URL used for canonical links, Open Graph, sitemap and robots.txt.

### Placeholders

- `todo("what's missing")`: required content that isn't written yet. Shown as an orange badge in dev, **hidden in production**. Preview them in a production build with `VITE_SHOW_TODOS=true npm run build`.
- `// DRAFT` comments: copy written as a starting point. It **is** shown in production, so rewrite it in your own words.
- Optional fields you leave out (screenshots, links, video, team) hide their section automatically.

## How to add a project

1. Open `src/data/projects.ts` and add an object to the `projects` array:

   ```ts
   {
     slug: "my-project",              // URL: /projects/my-project (lowercase, hyphens, unique)
     title: "My Project",
     tagline: "One line that explains it.",
     status: "complete",              // or "in-progress"
     featured: true,                  // true → "Selected work"; false + in-progress → "Currently building"
     order: 3,                        // list order and previous/next navigation
     summary: "Two or three sentences.",
     problem: "What problem it solves.",
     solution: "How it solves it.",
     role: "What you did.",
     features: ["Feature one", "Feature two"],
     stack: [{ group: "Frontend", items: ["React", "TypeScript"] }],
     decisions: [{ title: "Why X", why: "Because…" }],
     screenshots: [],
     links: { live: "https://…", repo: "https://github.com/…" },
     videoUrl: "https://www.youtube.com/watch?v=…",
   },
   ```

2. Add screenshots (optional): put images in `public/projects/my-project/` (WebP, about 1600px wide) and list them:

   ```ts
   screenshots: [
     {
       src: "/projects/my-project/dashboard.webp",
       alt: "Creator dashboard showing revenue and member growth charts",
       width: 1600,
       height: 1000,
       caption: "Creator dashboard", // optional
     },
   ],
   ```

   `width`/`height` are the image's real pixel size (prevents layout shift). Write `alt` as what the image shows.

3. Run `npm run build`. The sitemap picks up the new page automatically.

## How to add a demo video

Set `videoUrl` on the project to any normal YouTube link:

```ts
videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID",
// also fine: https://youtu.be/VIDEO_ID, /embed/VIDEO_ID, /shorts/VIDEO_ID, ?t=90 for a start time
```

- The page shows a thumbnail and only loads the player (from `youtube-nocookie.com`) when someone clicks play.
- No `videoUrl`, or a link that isn't YouTube, shows a "Demo video coming soon" card instead. It never breaks the page.
- In YouTube Studio the video must be **Public** or **Unlisted** (not Private) with **Allow embedding** turned on.

## Deploy

Config for both hosts is included; deep links like `/projects/oneplace` work on refresh on either.

**Vercel** (`vercel.json`): import the GitHub repo at vercel.com/new, framework preset "Vite". Or `npx vercel --prod`.

**Netlify** (`netlify.toml`): import the repo at app.netlify.com, settings are read from the file. Or `npx netlify deploy --prod`.

After the first deploy, set `VITE_SITE_URL` in `.env` (or as an environment variable on the host) to the real URL and redeploy, so social previews and the sitemap point to the right place.

## Project structure

```
public/            favicon, OG image, llms.txt, project screenshots
scripts/           build helpers (sitemap/robots, TODO list) and the OG image source
src/
  data/            profile.ts, projects.ts, types.ts   ← content
  lib/             youtube URL parser, todo helpers, project queries, theme
  hooks/           usePageMeta (per-page title, description, canonical, OG)
  components/      layout/, home/, project/, ui/
  pages/           Home, ProjectPage, NotFound
  styles/          index.css (Tailwind + light/dark design tokens)
```

Design decisions are recorded in `CONTEXT.md`; phase checklist in `TODO.md`.
