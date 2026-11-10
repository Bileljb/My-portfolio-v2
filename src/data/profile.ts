import type { Profile } from "./types.ts";

export const profile: Profile = {
  name: "Bilel Jabrane",
  role: "Full Stack Developer",
  location: "Tunis, Tunisia",
  timezone: "UTC+1 (CET), no daylight saving",
  openToRemote: true,
  headline:
    "I design and build complete web products, from the database schema and API to the interface people use.",
  bio: [
    "I’m a full stack developer based in Tunis, Tunisia. On the front end I work with React, Next.js and Tailwind CSS. On the back end I use Node.js and Express, or FastAPI when a project calls for Python, with PostgreSQL or MongoDB for data.",
    "I like products with real business logic: payments, permissions, multi-tenant data. I built OnePlace with a partner, a community platform that covers everything from authentication and paid memberships to courses and creator analytics. On my own I shipped Loupe, a website audit tool, and TamreenLab, an Arabic-first Excel practice site.",
    "I hold a Bachelor’s degree in Information Technology from ISET Tataouine, graduated with highest honours (Très Bien avec Félicitations du Jury), and before that interned as a full stack developer at Prologic Tunisie.",
    "I’m looking for a remote role on a team that ships often, reviews code carefully, and lets developers own features from the database to the UI.",
  ],
  email: "bileljabrane6@gmail.com",
  links: {
    github: "https://github.com/Bileljb/",
    linkedin: "https://www.linkedin.com/in/bilel-jabrane-a9989b218/",
    cv: "/Bilel_Jabrane_CV.pdf",
  },
  skills: [
    {
      group: "Frontend",
      items: ["React", "Next.js", "Angular", "TypeScript", "JavaScript", "Tailwind CSS"],
    },
    { group: "Backend", items: ["Node.js", "Express", "FastAPI", "REST APIs", "JWT auth"] },
    { group: "Database", items: ["PostgreSQL", "Prisma", "MongoDB"] },
    { group: "Tooling", items: ["Git / GitHub", "GitHub Actions", "Postman", "Vercel"] },
  ],
};
