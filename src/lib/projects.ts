import { projects } from "../data/projects.ts";
import type { Project } from "../data/types.ts";

const sorted: readonly Project[] = [...projects].sort((a, b) => a.order - b.order);

if (import.meta.env.DEV) {
  const seen = new Set<string>();
  for (const p of sorted) {
    if (seen.has(p.slug)) console.error(`[projects] Duplicate slug "${p.slug}"`);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug))
      console.error(`[projects] Slug "${p.slug}" should be lowercase and hyphenated`);
    seen.add(p.slug);
  }
}

export function allProjects(): readonly Project[] {
  return sorted;
}

export function featuredProjects(): readonly Project[] {
  return sorted.filter((p) => p.featured);
}

/** Candidates for the "Currently building" slot. */
export function inProgressProjects(): readonly Project[] {
  return sorted.filter((p) => p.status === "in-progress" && !p.featured);
}

export function getProject(slug: string | undefined): Project | undefined {
  return slug === undefined ? undefined : sorted.find((p) => p.slug === slug);
}

/** Neighbours by `order`, wrapping around. Null when there's only one project. */
export function getAdjacent(slug: string): { prev: Project; next: Project } | null {
  const i = sorted.findIndex((p) => p.slug === slug);
  const n = sorted.length;
  if (i === -1 || n < 2) return null;
  const prev = sorted[(i - 1 + n) % n];
  const next = sorted[(i + 1) % n];
  return prev && next ? { prev, next } : null;
}
