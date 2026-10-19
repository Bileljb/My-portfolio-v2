/**
 * Placeholder for content that's required but not written yet.
 * Create with `todo("what's missing")` from `src/lib/todo.ts`.
 * Shown as a visible badge in development, hidden in production.
 */
export interface Todo {
  readonly __todo: string;
}

/** Copy that may still be a placeholder. */
export type Text = string | Todo;

export interface SkillGroup {
  group: string;
  items: readonly string[];
}

export interface Profile {
  name: string;
  role: string;
  location: string;
  /** Shown to remote employers, e.g. "UTC+1 (CET)". */
  timezone: string;
  openToRemote: boolean;
  /** One or two sentences under the name in the hero. */
  headline: Text;
  /** Short About section, one entry per paragraph. */
  bio: readonly Text[];
  email: Text;
  links: {
    github: string;
    linkedin: string;
    /** Path under /public, e.g. "/cv.pdf". Omit to hide the link. */
    cv?: string;
  };
  /** Path under /public. Omit to hide the photo. */
  photo?: { src: string; alt: string };
  skills: readonly SkillGroup[];
}

export type ProjectStatus = "complete" | "in-progress";

export type StackGroup = "Frontend" | "Backend" | "Database" | "Infra" | "Tooling";

export interface Screenshot {
  /** Path under /public, e.g. "/projects/oneplace/dashboard.webp". */
  src: string;
  /** Describe what the screenshot shows, not "screenshot of…". */
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

export interface Decision {
  /** e.g. "Why PostgreSQL" */
  title: string;
  why: Text;
}

export interface TeamMember {
  name: string;
  url?: string;
}

export type ProjectDiagram = "oneplace-core-loop";

export interface Project {
  /** URL segment: /projects/<slug>. Lowercase, hyphenated, unique. */
  slug: string;
  title: string;
  tagline: Text;
  status: ProjectStatus;
  /** Featured projects appear in the Work section; others can fill the "Currently building" slot. */
  featured: boolean;
  /** Sort order for lists and previous/next navigation (ascending). */
  order: number;
  summary: Text;
  problem: Text;
  solution: Text;
  role: Text;
  /** Collaborators to credit. Omit to hide. */
  team?: readonly TeamMember[];
  features: readonly Text[];
  /** Empty array hides the section. */
  stack: readonly { group: StackGroup; items: readonly string[] }[];
  /** Short list for the home page card. Omit to show every stack item. */
  cardStack?: readonly string[];
  /** Empty array hides the section. */
  decisions: readonly Decision[];
  /** Empty array hides the gallery. */
  screenshots: readonly Screenshot[];
  links: { live?: string; repo?: string };
  /** Any YouTube URL (watch, youtu.be, embed, shorts). Omit to show "Demo video coming soon". */
  videoUrl?: string;
  diagram?: ProjectDiagram;
}
