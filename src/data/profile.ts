import type { Profile } from "./types.ts";

export const profile: Profile = {
  name: "Bilel Jabrane",
  role: "Full Stack Developer",
  location: "Tunis, Tunisia",
  timezone: "UTC+1 (CET), no daylight saving",
  openToRemote: true,
  // DRAFT: hero headline, rewrite in your own words.
  headline:
    "I build full stack web apps end to end, from PostgreSQL schemas and Express APIs to React interfaces.",
  // DRAFT: About paragraphs, rewrite in your own words.
  bio: [
    "I’m a full stack developer based in Tunis, Tunisia. I work in TypeScript across the whole stack: React and Tailwind CSS on the front end, Node.js and Express on the back end, and PostgreSQL with Prisma for data.",
    "I enjoy products with real business logic: payments, permissions, multi-tenant data. My most complete project, OnePlace, is a community platform covering everything from authentication and payments to courses and creator analytics.",
    "I’m looking for a remote role on a team that ships often, reviews code carefully, and lets developers own features from the database to the UI.",
  ],
  email: "bileljabrane6@gmail.com",
  links: {
    github: "https://github.com/Bileljb/",
    linkedin: "https://www.linkedin.com/in/bilel-jabrane-a9989b218/",
  },
  skills: [
    { group: "Frontend", items: ["React", "Vite", "TypeScript", "Tailwind CSS"] },
    { group: "Backend", items: ["Node.js", "Express", "TypeScript", "JWT auth"] },
    { group: "Database", items: ["PostgreSQL", "Prisma"] },
  ],
};
