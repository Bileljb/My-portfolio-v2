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
  {
    slug: "rackmind",
    title: "RackMind",
    tagline:
      "Server monitoring for small ops teams that turns abnormal readings into one incident per server, with an AI-suggested cause and next steps.",
    status: "complete",
    featured: true,
    order: 4,
    summary:
      "RackMind watches servers and notices when one starts overheating, filling up or goes silent. It opens a single incident, asks an AI model for the likely cause and what to check next, and lets the team acknowledge, assign and resolve it together. The AI only suggests; people make every decision. To try the live demo, sign in as engineer.test@rackmind.local or operator.test@rackmind.local (password “To12345678”).",
    problem:
      "When a server misbehaves, the on-call engineer usually gets a threshold alert from a tool like Nagios or Zabbix: it says that something crossed a line, not why. One fault often fires a string of near-identical alerts, and working out the cause means comparing charts across the server, its rack neighbours and past incidents by hand. Tools that explain the cause exist, but they’re paid products like Datadog, which is too expensive for a small team or a homelab.",
    solution:
      "Every 5 seconds, each server sends its readings to the API, which saves them and hands the checking to a background worker so nothing waits. The worker compares the last 30 seconds with fixed safety limits and with that server’s own normal from a few minutes earlier. If something is wrong, it opens one incident, and the database refuses a second one for the same server. The worker then boils about 1,800 raw readings, the rack neighbours and similar past incidents down to a short summary, asks an AI model for the likely cause, and checks the answer before anyone sees it. Every change appears live in open browsers.",
    role: "Solo project. I designed and built all of it (FastAPI backend, worker and detector, AI integration, Next.js dashboard, Linux agent, simulator, CI and deployment), using Claude Code as a pair programmer.",
    features: [
      "Monitor real Linux servers with a one-file Python agent that sends CPU usage, memory, disk, network and (when there’s a sensor) temperature every 5 seconds",
      "Switch to Simulation mode to explore a simulated data center of 4 racks × 5 servers, which replays a scripted scenario whose first incident opens in about a minute",
      "See every server at a glance on a rack grid coloured by temperature (or CPU usage), refreshed every 5 seconds",
      "Open any server to get one chart per metric, with a time range of up to 24 hours",
      "Get exactly one incident per misbehaving server, opened automatically when a reading crosses a safety limit or rises far above that server’s own recent normal",
      "Get a critical “not reporting” incident when a real server goes 60 seconds without sending",
      "Take incidents from open to acknowledged to resolved, with assignment, comments, a full audit history and a “back to normal” hint. Nothing closes on its own",
      "Read an AI diagnosis on each new incident (probable cause, confidence, up to 5 recommended steps and the evidence for them), then rate it or ask again",
      "Watch new incidents, status changes and diagnoses appear in every open browser without refreshing, with a “New incident” toast",
      "Sign in as an operator, engineer or admin, each with its own permissions; admins create users, change roles and deactivate accounts",
      "Inject 4 kinds of fault on a schedule (CPU spike, overheating rack, filling disk, memory leak) to demo the whole pipeline end to end",
    ],
    stack: [
      {
        group: "Frontend",
        items: [
          "Next.js 16 (App Router)",
          "React 19",
          "TypeScript 5",
          "Tailwind CSS 4",
          "SWR 2",
          "Recharts 3",
        ],
      },
      {
        group: "Backend",
        items: [
          "Python 3.12",
          "FastAPI (async)",
          "Pydantic 2",
          "ARQ (Redis job queue)",
          "Server-Sent Events",
          "PyJWT + Argon2",
          "Groq API (gpt-oss-120b, structured outputs)",
        ],
      },
      {
        group: "Database",
        items: ["PostgreSQL 17", "SQLAlchemy 2 (async)", "Alembic", "Redis (queue + pub/sub)"],
      },
      {
        group: "Infra",
        items: ["Docker Compose", "Caddy", "Vercel", "Render", "Neon", "GitHub Actions"],
      },
      {
        group: "Tooling",
        items: ["pytest + httpx", "ruff", "mypy (strict)", "ESLint 9", "Prettier 3", "Claude Code"],
      },
    ],
    cardStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Redis",
      "Docker",
    ],
    decisions: [
      {
        title: "Why simple rules instead of machine learning",
        why: "A trained model would need labelled history I didn’t have, and its alerts would be hard to explain. Instead, two simple rules decide: fixed safety limits (CPU usage at 98% or more is critical), and a check of whether the last 30 seconds are far above that same server’s normal. “Normal” is taken from 30 to 5 minutes earlier, so a slow rise can’t quietly become its own baseline. Only rises count, so a recovering server never raises an alert, and every alert reads like “CPU usage: 99.0 is above the critical limit 98”. The trade-off: a problem that lasts long enough slowly starts to look normal.",
      },
      {
        title: "How I stopped duplicate incidents",
        why: "If two checks run at the same moment, both can see no open incident and both create one. So the database enforces the rule itself: it allows only one active incident per server, and when a second check tries to open one, its findings are added to the existing incident instead. New findings can raise an incident’s severity but never lower it. The trade-off: a fault that hits a whole rack still opens one incident per server (five for an overheating rack), because nothing groups them yet.",
      },
      {
        title: "How I kept the AI from showing nonsense or acting on its own",
        why: "The AI must answer in a fixed format, and the backend checks every answer again before saving it. Tests feed it 7 kinds of bad answer, such as broken JSON, a confidence above 100% or a metric that doesn’t exist; each is saved as a failure and never shown. If the AI is slow or unavailable, the incident works the same and an engineer can ask again. The AI can’t touch any server, risky steps are marked “Needs approval”, and incident titles and comments are treated as data, not instructions, so a comment can’t take over the prompt. On the live demo, a full diagnosis took under 3 seconds. The trade-off: few models support this strict format, so the model is a setting.",
      },
      {
        title: "Why Server-Sent Events instead of WebSockets",
        why: "Live updates only go one way, from server to browser, so I didn’t need the two-way channel WebSockets give. Server-Sent Events work over plain HTTP, send the login cookie automatically and reconnect on their own. Each browser tab keeps one connection open and reloads only the incident that changed. Because a connection can stay open for hours, it checks the login once and then hands its database connection back. The cost is one open connection per tab.",
      },
      {
        title: "How I fit the backend into a free host",
        why: "Render’s free plan runs web servers but not background workers, and RackMind needs three processes: the API, the worker and the simulator. So one container runs all three, restarting the worker or simulator within 5 seconds if either crashes. The database is on Neon and the dashboard on Vercel, which forwards API calls so the browser only ever talks to one address. Redis is set never to drop data, so queued jobs aren’t lost. The trade-off: after 15 minutes without visitors the backend sleeps, and the first visit waits about a minute. The self-hosted Docker setup doesn’t have that problem.",
      },
    ],
    screenshots: [
      {
        src: "/projects/rackmind/rack-grid.webp",
        alt: "Four racks of five servers each, every server listed with its CPU temperature; three servers in rack R04 are tinted amber with warning icons at about 61 °C, and a “New incident: High disk usage on r01-srv03” notification sits in the bottom corner",
        width: 1600,
        height: 1000,
        caption: "Rack R04 overheating in Simulation mode, while a new incident arrives live",
      },
      {
        src: "/projects/rackmind/incident-diagnosis.webp",
        alt: "Critical incident “High CPU usage on r02-srv03” with an AI diagnosis: a runaway process as the probable cause at 68% confidence, five next steps with two marked “Needs approval”, and evidence showing CPU usage rising from a 30.8% baseline to 99% while rack neighbours stayed between 17.6% and 25.2%",
        width: 1600,
        height: 1369,
        caption: "AI diagnosis with its evidence; risky steps need approval",
      },
      {
        src: "/projects/rackmind/incidents.webp",
        alt: "List of eight open incidents: five warnings for high CPU temperature on r04-srv01 to r04-srv05, one each for high memory on r03-srv02 and high disk on r01-srv03, and a critical CPU usage incident on r02-srv03 marked “Back to normal”",
        width: 1600,
        height: 1000,
        caption: "Eight incidents opened automatically, one per affected server",
      },
      {
        src: "/projects/rackmind/server-detail.webp",
        alt: "Six line charts for server r02-srv03 over the last hour (CPU temperature, power draw, CPU usage, memory, disk and network), with CPU usage jumping to 100% between 08:40 and 08:43 and temperature rising with it",
        width: 1600,
        height: 1050,
        caption: "One chart per metric, from 15 minutes up to 24 hours",
      },
      {
        src: "/projects/rackmind/user-admin.webp",
        alt: "Admin user table with five accounts, each with a role dropdown (operator, engineer or admin) and a deactivate button, above a form to create a user with a temporary password",
        width: 1600,
        height: 1000,
        caption: "Three roles, enforced by the API on every endpoint",
      },
    ],
    links: {
      live: "https://rack-mind.vercel.app",
      repo: "https://github.com/Bileljb/RackMind",
    },
  },
];
