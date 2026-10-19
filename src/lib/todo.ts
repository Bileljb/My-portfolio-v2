import type { Text, Todo } from "../data/types.ts";

/** Mark required content that hasn't been written yet. */
export function todo(note: string): Todo {
  return { __todo: note };
}

export function isTodo(value: unknown): value is Todo {
  return typeof value === "object" && value !== null && "__todo" in value;
}

/**
 * Show TODO badges in dev, or in a production build made with VITE_SHOW_TODOS=true
 * (useful for reviewing placeholders on a preview deploy).
 */
export const SHOW_TODOS: boolean =
  import.meta.env.DEV || import.meta.env.VITE_SHOW_TODOS === "true";

/** The real string, or null while the content is still a placeholder. */
export function textOrNull(value: Text | undefined): string | null {
  if (value === undefined || isTodo(value)) return null;
  return value.trim() === "" ? null : value;
}

/** True when there's something to render: real text, or a TODO badge when badges are shown. */
export function isRenderable(value: Text | undefined): boolean {
  if (value === undefined) return false;
  return isTodo(value) ? SHOW_TODOS : value.trim() !== "";
}
