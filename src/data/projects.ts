import type { Project } from "./types.ts";

/**
 * All project content. Pages render from this list, so adding a project
 * means adding one object. Unknown copy uses todo("…") from ../lib/todo.ts.
 * Lines marked DRAFT were written as placeholders: rewrite them in your words.
 */
export const projects: readonly Project[] = [
  {
    slug: "oneplace",
    title: "OnePlace",
    tagline: "A multi-tenant SaaS where creators monetize paid private communities.",
    status: "complete",
    featured: true,
    order: 1,
    summary:
      "A Skool-inspired platform where creators run paid, private communities with memberships, courses, events and analytics.",
    // DRAFT
    problem:
      "Creators who want to run a paid community usually stitch several tools together: one for payments, one for discussions, another for courses. Members get a fragmented experience, and creators spend their time managing tools instead of their community.",
    solution:
      "A multi-tenant platform built around one core loop: a creator creates a community, a user pays, access is granted, members engage, and the creator earns. Payments, access control, content and analytics live in one product, so each step of the loop feeds the next.",
    // DRAFT: wording is mine, adjust as you like.
    role: "Full stack development across the whole product: the PostgreSQL schema and Prisma models, the Express API with JWT authentication, and every React screen.",
    features: [
      "Authentication with JWTs in httpOnly cookies",
      "Discover page with search across communities",
      "Community creation and management with multiple pricing models (free, monthly)",
      "Memberships and subscriptions",
      "Community feed with posts, comments and search",
      "Classroom with free and paid courses, sections, and video resume",
      "Calendar with community events in the viewer’s timezone",
      "Leaderboards with member points",
      "Creator analytics: members, revenue and growth over 6 months",
      "Creator settings and admin dashboard",
    ],
    // TODO: confirm this matches OnePlace exactly (copied from your overall stack).
    stack: [
      { group: "Frontend", items: ["React", "Vite", "TypeScript", "Tailwind CSS"] },
      { group: "Backend", items: ["Node.js", "Express", "TypeScript", "JWT auth"] },
      { group: "Database", items: ["PostgreSQL", "Prisma"] },
    ],
    // DRAFT: all four reasons below, replace with your real reasoning.
    decisions: [
      {
        title: "Why PostgreSQL",
        why: "The data is deeply relational: users, communities, memberships, subscriptions, courses and lessons all reference each other. PostgreSQL gives me foreign keys, constraints and transactions, so a payment and the access it grants are written together or not at all.",
      },
      {
        title: "Why Prisma",
        why: "One schema file generates a fully typed client, so database changes surface as TypeScript errors instead of runtime bugs. Migrations are versioned next to the code, so every schema change is reviewable and repeatable.",
      },
      {
        title: "Why httpOnly cookies for auth tokens",
        why: "Keeping the JWT in an httpOnly cookie means client-side JavaScript can never read it, so an XSS bug can’t leak the session. With the Secure and SameSite flags set, it’s a safer default than storing tokens in localStorage.",
      },
      {
        title: "How multi-tenancy works",
        why: "All communities share one database, and every tenant-owned row carries its community ID. Membership checks run in middleware on each request, which keeps the schema simple while making sure members only ever see communities they belong to.",
      },
    ],
    screenshots: [
      {
        src: "/projects/oneplace/discover.webp",
        alt: "Discover communities page with a search bar and ranked community cards",
        width: 1600,
        height: 694,
        caption: "Discover: browse and search communities",
      },
      {
        src: "/projects/oneplace/community-feed.webp",
        alt: "Community feed with member posts, a New post button and a points leaderboard sidebar",
        width: 1498,
        height: 817,
        caption: "Community feed and leaderboard",
      },
      {
        src: "/projects/oneplace/classroom.webp",
        alt: "Classroom page listing a free course and a paid course with cover images",
        width: 1525,
        height: 817,
        caption: "Classroom with free and paid courses",
      },
      {
        src: "/projects/oneplace/manage-courses.webp",
        alt: "Course management list showing open and buy-now courses, draft status and section counts",
        width: 1533,
        height: 693,
        caption: "Creator course management",
      },
      {
        src: "/projects/oneplace/calendar.webp",
        alt: "Monthly community calendar with events, shown in the viewer’s timezone",
        width: 1483,
        height: 823,
        caption: "Community calendar",
      },
      {
        src: "/projects/oneplace/analytics.webp",
        alt: "Creator analytics with member and revenue totals and six-month bar charts",
        width: 1600,
        height: 687,
        caption: "Creator analytics",
      },
      {
        src: "/projects/oneplace/community-about.webp",
        alt: "Community About page with cover banner, stats, membership tier and leaderboard",
        width: 1600,
        height: 802,
        caption: "Community About page",
      },
    ],
    links: { live: "https://oneplace-c1b.pages.dev/communities" },
    videoUrl: "https://www.youtube.com/watch?v=sqYFIiLvnCE",
    diagram: "oneplace-core-loop",
  },
  {
    slug: "loupe",
    title: "Loupe",
    tagline:
      "A free website health check that explains problems in plain language for small business owners.",
    status: "in-progress",
    featured: true,
    order: 2,
    summary:
      "Audits a website’s homepage and turns the results into a graded report a non-technical owner can act on, in English, French or Arabic.",
    problem:
      "Small business owners hear that their website is “slow” or “bad for SEO”, but most audit tools are written for developers and show unexplained scores and terms like “LCP”. Owners can’t tell which problems matter or what to ask a developer to fix, and freelancers end up translating those reports for their clients.",
    solution:
      "The user enters a URL. The server runs Google PageSpeed Insights and its own HTML checks in parallel, streams progress to the browser, then scores the results, ranks them by impact and effort, and saves them under a private link. Each issue explains what is wrong, why it matters for the business and how to fix it, in the viewer’s language, with the three fixes to do first at the top.",
    role: "Solo, end to end: 43 audit checks written as pure functions, SSRF-safe fetching, the streaming audit API, scoring, Redis storage, a knowledge base in three languages, the full Next.js frontend with right-to-left Arabic, and deployment on Vercel.",
    features: [
      "Homepage audit across speed, SEO, accessibility and technical health, plus robots.txt and sitemap.xml",
      "Live progress streamed from the server while the audit runs",
      "Letter grade (A to F), overall score and a score per area",
      "“Fix these first” card with the 3 highest-impact, lowest-effort fixes",
      "Issue cards with what’s wrong, why it matters and how to fix it, plus collapsible developer details",
      "Platform detection (WordPress, Wix, Shopify, Squarespace, Webflow) with platform-specific fix steps",
      "“Send to my developer”: a copyable technical to-do message",
      "Optional local business checks: business schema, tap-to-call phone, address, opening hours, map",
      "Shareable report links that expire after 30 days",
      "Re-scan and compare: score changes plus fixed, new and still-open issues",
      "English, French and Arabic, with a full right-to-left layout",
      "A guide page for each of the 42 checks, linked from the report",
    ],
    stack: [
      {
        group: "Frontend",
        items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "shadcn/ui", "next-intl"],
      },
      {
        group: "Backend",
        items: ["Next.js route handlers", "Zod", "Cheerio", "PageSpeed Insights API"],
      },
      { group: "Database", items: ["Upstash Redis"] },
      { group: "Infra", items: ["Vercel", "Upstash Ratelimit"] },
      { group: "Tooling", items: ["Vitest", "ESLint"] },
    ],
    cardStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Zod",
      "Redis",
      "PageSpeed Insights",
      "Vitest",
    ],
    decisions: [
      {
        title: "How the server fetches untrusted URLs safely",
        why: "Fetching a URL a user types in is a classic server-side request forgery risk. Every address the hostname resolves to is checked against private, reserved and disguised IPv4 and IPv6 ranges, and the connection is pinned to the checked IP to block DNS rebinding. Redirects are followed by hand (at most 5, each re-checked), with a 10-second timeout and a 2 MB size cap.",
      },
      {
        title: "Why checks are pure functions",
        why: "Each check takes a page snapshot and returns a list of issues, with no network or storage access. All I/O lives in the audit orchestrator, so every check is tested with small HTML fixtures and could move to a background worker unchanged.",
      },
      {
        title: "Why reports store no text",
        why: "A saved report holds only issue IDs, evidence and scores. The wording is joined at render time from a knowledge base per language, so one report can be read in English, French or Arabic without re-running the audit. Tests check that every check has text in every language and that jargon never appears in the plain-language fields.",
      },
      {
        title: "Why Redis instead of a SQL database",
        why: "Reports are expiring snapshots, not user data, so a key-value store with TTLs is enough. Storage sits behind a small get/set interface: only one file knows about Upstash, and tests run against an in-memory store.",
      },
      {
        title: "How partial failures are handled",
        why: "PageSpeed Insights and the HTML checks run in parallel. If one fails, the report still comes back with what succeeded, marked as partial: missing categories score as null and the overall score re-weights the rest.",
      },
    ],
    screenshots: [
      {
        src: "/projects/loupe/landing.webp",
        alt: "Loupe landing page asking “Is your website helping or hurting your business?” with a URL field and an “I serve local customers” option",
        width: 1600,
        height: 692,
        caption: "Landing page: one URL, one click",
      },
      {
        src: "/projects/loupe/report-overview.webp",
        alt: "Example report for a bakery site with grade B, an overall score of 86, four score rings and a “Fix these first” list",
        width: 1600,
        height: 695,
        caption: "Report overview with the three fixes to do first",
      },
      {
        src: "/projects/loupe/report-grade.webp",
        alt: "Report header showing grade A and a score of 99, with Copy link, Re-scan and a Technical view switch",
        width: 1600,
        height: 693,
        caption: "Report header: share, re-scan or switch to the technical view",
      },
    ],
    links: { live: "https://loupe-ashen.vercel.app/en", repo: "https://github.com/Bileljb/Loupe" },
  },
];
