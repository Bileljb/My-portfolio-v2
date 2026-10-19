// Lists remaining content work in src/data:
//   TODO  = missing content: todo("…") calls and // TODO comments (hidden in production)
//   DRAFT = placeholder copy written for you to rewrite: // DRAFT comments (shown in production)
// Informational only: never fails the build.
import { readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const root = join(import.meta.dirname, "..");
const dataDir = join(root, "src", "data");
const callPattern = /todo\(\s*(["'`])([\s\S]*?)\1\s*,?\s*\)/g;
const commentPattern = /\/\/[ \t]*(TODO|DRAFT):?[ \t]*(.*)/g;

const todos = [];
const drafts = [];
for (const file of readdirSync(dataDir).filter((f) => f.endsWith(".ts"))) {
  const path = join(dataDir, file);
  const src = readFileSync(path, "utf8");
  const at = (index) =>
    `${relative(root, path)}:${src.slice(0, index).split("\n").length}`.replaceAll("\\", "/");
  const inComment = (index) => /^\s*(\/\/|\/?\*)/.test(src.slice(src.lastIndexOf("\n", index) + 1));

  for (const m of src.matchAll(callPattern))
    if (!inComment(m.index)) todos.push({ at: at(m.index), note: m[2].replace(/\s+/g, " ") });
  for (const m of src.matchAll(commentPattern)) {
    const nextLine = src.slice(m.index).split("\n")[1]?.trim().split(":")[0] ?? "";
    const entry = { at: at(m.index), note: m[2].trim() || `rewrite "${nextLine}"` };
    (m[1] === "TODO" ? todos : drafts).push(entry);
  }
}

const byLocation = (a, b) => a.at.localeCompare(b.at, undefined, { numeric: true });
const print = (title, list) => {
  if (list.length === 0) return;
  console.log(`\n${title} (${list.length}):`);
  for (const t of list.sort(byLocation)) console.log(`  ${t.at}  ${t.note}`);
};

if (todos.length + drafts.length === 0) {
  console.log("\n✓ No TODOs or drafts left in src/data.\n");
} else {
  print("⚠ TODO: missing content (hidden in production)", todos);
  print("✎ DRAFT: placeholder copy to rewrite in your words (visible in production)", drafts);
  console.log("");
}
