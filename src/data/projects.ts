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
    problem:
      "A creator who wants to run a paid community usually ends up combining separate tools: one to take payments, one for discussions, another to host courses. Members have to jump between apps and log in several times, and the creator spends more time keeping the tools in sync than looking after the community.",
    solution:
      "A multi-tenant platform built around one core loop: a creator creates a community, a user pays, access is granted, members engage, and the creator earns. Payments, access control, content and analytics live in one product, so each step of the loop feeds the next.",
    role: "Built with a partner, full stack: the PostgreSQL schema and Prisma models, the Express API with JWT authentication in httpOnly cookies, the course system with video resume, creator analytics, the platform admin dashboard, and the React screens on top.",
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
    stack: [
      { group: "Frontend", items: ["React", "Vite", "Tailwind CSS"] },
      { group: "Backend", items: ["Node.js", "Express", "JWT auth"] },
      { group: "Database", items: ["PostgreSQL", "Prisma"] },
    ],
    decisions: [
      {
        title: "Why PostgreSQL",
        why: "Almost everything in OnePlace points at something else: users, communities, memberships, subscriptions, courses and lessons. A relational database fits that shape, and foreign keys plus transactions mean a payment and the access it unlocks are saved together or not at all.",
      },
      {
        title: "Why Prisma",
        why: "The whole data model lives in one schema file, and Prisma generates the query client from it, so the code and the database never drift apart. Migrations sit in the repo next to the code, which made schema changes easy to review between the two of us.",
      },
      {
        title: "Why httpOnly cookies for auth tokens",
        why: "A JWT in an httpOnly cookie can’t be read by JavaScript on the page, so a cross-site scripting bug can’t steal a session. With the Secure and SameSite flags set, that’s a safer default than keeping tokens in localStorage.",
      },
      {
        title: "How multi-tenancy works",
        why: "All communities share one database, and every row a community owns carries its community ID. Middleware checks membership on each request, so the schema stays simple and members only ever see the communities they belong to.",
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
    status: "complete",
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
  {
    slug: "tamreenlab",
    title: "TamreenLab",
    tagline:
      "An Arabic-first Excel practice site where learners type real formulas into an in-browser spreadsheet.",
    status: "complete",
    featured: true,
    order: 3,
    summary:
      "An interactive Excel course for Arabic speakers, also in English and French. Learners solve short steps in a spreadsheet in the browser, get instant feedback on each answer, and earn points the server checks.",
    problem:
      "Arabic speakers learning Excel, mostly students and junior office workers, have few places to practise by doing. Practice sites are English-first, aren’t built for right-to-left reading, and stumble on Arabic keyboard input such as Arabic digits and the “؛” separator. Video courses show formulas but never let the learner type one and see where it went wrong.",
    solution:
      "Each lesson is a series of short steps (select a range, enter a formula, answer a question, press a shortcut) played in a spreadsheet grid in the browser. A formula engine shared by the browser and the server checks every answer instantly, explains the specific mistake, and re-runs the formula on altered data to catch hard-coded results. The server re-checks each answer before awarding points, and missed steps come back on a spaced review schedule.",
    role: "Solo, end to end: product plan, formula engine, spreadsheet grid UI, the Next.js site in three languages, Express API, PostgreSQL schema, 27 lessons, tests, CI, and a security, accessibility and load-testing pass.",
    features: [
      "Practise in a real spreadsheet grid: select cells and ranges by mouse or keyboard, with a name box and formula bar",
      "27 lessons and 166 steps across 7 tracks, from basics to lookups and keyboard shortcuts",
      "Specific feedback for each wrong answer: wrong cell, missing function, syntax error, #REF!, #NAME?, #N/A and more",
      "Detects answers that type the result instead of calculating it",
      "Arabic-first right-to-left interface with English and French versions; formulas always stay left to right",
      "Accepts Arabic keyboard input: Arabic-Indic digits and “؛” or “،” as separators",
      "“Explain my mistake”: a short AI explanation of a wrong formula that never gives away the answer",
      "Keyboard shortcut drills for Windows and Mac that work on Arabic layouts, with a multiple-choice version on phones",
      "Points, levels, a daily goal, streaks and a daily leaderboard",
      "“Review mistakes” mode that brings missed steps back after 1, 3 and 7 days",
      "Works without an account, merging browser progress into an account on sign-up",
      "15 Excel function reference pages and shareable result cards",
    ],
    stack: [
      {
        group: "Frontend",
        items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "next-intl"],
      },
      {
        group: "Backend",
        items: ["Node.js", "Express 5", "Zod", "jose (JWT)", "argon2id", "pino", "Groq API"],
      },
      { group: "Database", items: ["PostgreSQL 17", "Prisma 7"] },
      { group: "Infra", items: ["GitHub Actions", "Docker Compose"] },
      {
        group: "Tooling",
        items: ["pnpm workspaces", "Turborepo", "Vitest", "Playwright", "axe-core", "Lighthouse"],
      },
    ],
    cardStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Tailwind CSS",
      "Playwright",
    ],
    decisions: [
      {
        title: "Why I wrote my own formula engine",
        why: "Every answer is checked three times: in the browser for instant feedback, on the server before points are given, and again on changed data to catch learners who type the result instead of a formula. I compared a small engine of my own with HyperFormula, the popular open-source option. Mine passed all 22 of my Excel test cases (HyperFormula passed 20), is about 60 times smaller, and avoids HyperFormula’s GPL-or-paid licence. It now supports 31 functions and has 435 tests.",
      },
      {
        title: "Why the server decides the points",
        why: "The browser shows feedback instantly, but it never decides the score. The server loads the step from the database and checks the answer again with the same engine. Each award is saved with a unique key, so the same step can’t pay out twice, even if the request arrives twice at the same moment. Guest progress merged into a new account is capped at 3,000 points.",
      },
      {
        title: "How accounts stay secure",
        why: "Passwords are hashed with argon2id, and logins use a short-lived token in an httpOnly cookie that JavaScript can’t read. Refresh tokens change on every use and are stored only as hashes; if an old one is reused, every session from that login is signed out. During a security review I found that anyone could fake their IP address to get around the rate limits, so the server now refuses to start in production until it’s told how many proxies sit in front of it.",
      },
      {
        title: "How the AI hint stays cheap and safe",
        why: "The AI only explains a formula the server has already confirmed is wrong, and an explanation is saved and reused when someone makes the same mistake. Usage is limited per learner, per guest and per day, with a monthly spending cap. If the AI is slow, unavailable, or its reply gives away the answer, the learner sees the lesson’s written hint instead. In a live trial, 95% of explanations arrived in under a second.",
      },
      {
        title: "How I tested speed, accessibility and backups",
        why: "A load test filled the database with 20,000 users and 400,000 rows, then sent requests from 32 clients at once. Changing one database index made the leaderboard faster and raised throughput from 450 to 610 requests per second, with no errors. Accessibility checks run on desktop and mobile in light and dark mode, and I practised restoring a backup to confirm nothing was lost. In total the project has 934 automated tests.",
      },
    ],
    screenshots: [
      {
        src: "/projects/tamreenlab/home-ar.webp",
        alt: "Arabic home page with the headline “Learn Excel by practice” and a small interactive sheet whose formula bar shows =SUM(B2:B4), with 27 lessons, 166 steps and 15 functions listed below",
        width: 1600,
        height: 1000,
        caption: "Arabic-first home page with a sheet you can try",
      },
      {
        src: "/projects/tamreenlab/lesson-player.webp",
        alt: "Arabic lesson step with the formula =B2+B3+B4+B5+B6 in the formula bar, the total 420 in cell B7 and green feedback awarding 525 points",
        width: 1600,
        height: 1311,
        caption: "Solving a step in the spreadsheet",
      },
      {
        src: "/projects/tamreenlab/ai-explanation.webp",
        alt: "Wrong formula =B2+B3+B4+B6 with red feedback, and below it an AI explanation in Arabic pointing out that cell B5 was left out, with Helpful and Not helpful buttons",
        width: 1600,
        height: 1635,
        caption: "Explaining a wrong formula",
      },
      {
        src: "/projects/tamreenlab/shortcut-drill.webp",
        alt: "Shortcut step asking for the edit-cell shortcut, with a Windows and Mac switch and an F2 keycap captured as the answer",
        width: 1600,
        height: 1002,
        caption: "Keyboard shortcut drills",
      },
      {
        src: "/projects/tamreenlab/lesson-complete.webp",
        alt: "Lesson completion card with three stars and tiles for 6 of 6 correct steps, 6 first-try answers and 3,150 points, with Next lesson and Share buttons",
        width: 1600,
        height: 704,
        caption: "Finishing a lesson",
      },
      {
        src: "/projects/tamreenlab/lesson-en.webp",
        alt: "English SUMIF lesson laid out left to right, with an explanation of the function above the first practice step",
        width: 1600,
        height: 1000,
        caption: "Also in English and French",
      },
      {
        src: "/projects/tamreenlab/function-vlookup.webp",
        alt: "Arabic VLOOKUP reference page with a description, the syntax in a copyable code block and numbered argument cards",
        width: 1600,
        height: 1000,
        caption: "Function reference pages",
      },
    ],
    links: {
      live: "https://tamreen-lab.vercel.app/en",
      repo: "https://github.com/Bileljb/TamreenLab",
    },
  },
];
