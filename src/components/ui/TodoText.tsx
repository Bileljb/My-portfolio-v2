import type { ElementType } from "react";
import type { Text } from "../../data/types.ts";
import { isTodo, SHOW_TODOS } from "../../lib/todo.ts";

export function TodoBadge({ note }: { note: string }) {
  return (
    <span className="border-accent text-accent-text inline-flex max-w-full items-baseline gap-2 border border-dashed px-2 py-1 font-mono text-xs">
      <span className="font-medium">TODO</span>
      <span className="text-muted">{note}</span>
    </span>
  );
}

interface TodoTextProps {
  value: Text | undefined;
  /** Element to wrap real text in. Defaults to a fragment. */
  as?: ElementType;
  className?: string;
}

/** Renders real text, a TODO badge while badges are shown, or nothing. */
export default function TodoText({ value, as: Tag, className }: TodoTextProps) {
  if (value === undefined) return null;
  if (isTodo(value)) return SHOW_TODOS ? <TodoBadge note={value.__todo} /> : null;
  if (value.trim() === "") return null;
  return Tag ? <Tag className={className}>{value}</Tag> : <>{value}</>;
}
