import type { ServiceIcon as IconName } from "../../data/services.ts";

const paths: Record<IconName, string> = {
  // Wrench
  wrench:
    "M14.7 6.3a4 4 0 0 0-5.4 5.2l-5.6 5.6a1.8 1.8 0 0 0 2.5 2.5l5.6-5.6a4 4 0 0 0 5.2-5.4l-2.6 2.6-2.3-.4-.4-2.3 3-2.2Z",
  // Browser window with a block of content
  page: "M3.5 5.5h17v13h-17zM3.5 9h17M7 12.5h6M7 15.5h10",
  // Speedometer
  speed: "M4.5 17a8 8 0 1 1 15 0M12 13l3.5-4.5M12 13a1 1 0 1 0 0 .01",
  // Globe
  globe:
    "M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17ZM3.5 12h17M12 3.5c2.3 2.4 3.4 5.2 3.4 8.5s-1.1 6.1-3.4 8.5c-2.3-2.4-3.4-5.2-3.4-8.5s1.1-6.1 3.4-8.5Z",
  // Puzzle piece
  puzzle:
    "M9 4.5h3.5v2a1.5 1.5 0 1 0 3 0v-2H19v4h-2a1.5 1.5 0 1 0 0 3h2v4h-3.5v-2a1.5 1.5 0 1 0-3 0v2H9v-3.5H7a1.5 1.5 0 1 1 0-3h2Z",
};

export default function ServiceIcon({ name }: { name: IconName }) {
  return (
    <svg
      width={26}
      height={26}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}
