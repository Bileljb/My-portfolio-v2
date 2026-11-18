import type { ReactNode } from "react";
import type { ServiceIcon as ArtName } from "../../data/services.ts";

/**
 * Small illustration at the top of each service card. Drawn with the theme
 * tokens, so it follows light and dark mode.
 */

const c = {
  bg: "var(--color-bg)",
  surface: "var(--color-surface)",
  fg: "var(--color-fg)",
  muted: "var(--color-muted)",
  rule: "var(--color-rule)",
  accent: "var(--color-accent)",
  onAccent: "var(--color-on-accent)",
};

/** Browser window frame with three dots; content goes in the body. */
function Browser({
  x,
  y,
  w,
  h,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  children?: ReactNode;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={c.bg} stroke={c.rule} strokeWidth={2} />
      <path d={`M${x} ${y + 22}h${w}`} stroke={c.rule} strokeWidth={2} />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={x + 14 + i * 11} cy={y + 11} r={3.2} fill={c.rule} />
      ))}
      {children}
    </g>
  );
}

const line = (x: number, y: number, w: number, color = c.rule, h = 7) => (
  <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={color} />
);

const art: Record<ArtName, ReactNode> = {
  // A broken page with a crack, and a wrench fixing it
  wrench: (
    <>
      <Browser x={40} y={26} w={200} h={128}>
        {line(58, 64, 90, c.muted)}
        {line(58, 80, 130)}
        {line(58, 94, 110)}
        <rect
          x={58}
          y={112}
          width={60}
          height={22}
          rx={11}
          fill="none"
          stroke={c.rule}
          strokeWidth={2}
          strokeDasharray="5 4"
        />
        <path
          d="M168 48l-12 20 14 6-10 22 12 6-8 20"
          fill="none"
          stroke={c.accent}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Browser>
      <g transform="translate(236 66) rotate(45)">
        <rect x={-7} y={0} width={14} height={78} rx={7} fill={c.fg} />
        <circle cx={0} cy={0} r={20} fill={c.fg} />
        <rect x={-7} y={-24} width={14} height={18} rx={2} fill={c.surface} />
      </g>
      <circle cx={262} cy={134} r={17} fill={c.accent} />
      <path
        d="M254 134l6 6 11 -12"
        fill="none"
        stroke={c.onAccent}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),

  // A phone showing a one-page site with a big "book" button being tapped
  page: (
    <>
      <Browser x={24} y={34} w={150} h={112}>
        <rect x={36} y={68} width={126} height={34} rx={6} fill={c.surface} />
        {line(44, 76, 70, c.muted, 6)}
        {line(44, 88, 50, c.rule, 6)}
        <rect x={36} y={112} width={58} height={22} rx={6} fill={c.surface} />
        <rect x={104} y={112} width={58} height={22} rx={6} fill={c.surface} />
      </Browser>
      <rect x={186} y={16} width={88} height={150} rx={16} fill={c.fg} />
      <rect x={192} y={22} width={76} height={138} rx={11} fill={c.bg} />
      <rect x={218} y={28} width={24} height={5} rx={2.5} fill={c.rule} />
      <rect x={200} y={44} width={60} height={34} rx={6} fill={c.surface} />
      {line(206, 52, 40, c.muted, 6)}
      {line(206, 64, 28, c.rule, 6)}
      {line(200, 88, 52)}
      {line(200, 100, 38)}
      <rect x={200} y={118} width={60} height={22} rx={11} fill={c.accent} />
      {line(214, 126, 32, c.onAccent, 6)}
      <circle cx={252} cy={138} r={14} fill={c.accent} opacity={0.25} />
      <path
        d="M248 132v18l5 -5 4 9 4 -2 -4 -9h7Z"
        fill={c.fg}
        stroke={c.bg}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </>
  ),

  // A speed gauge in the fast zone, next to search results with yours on top
  speed: (
    <>
      <path
        d="M40 132a62 62 0 0 1 124 0"
        fill="none"
        stroke={c.rule}
        strokeWidth={14}
        strokeLinecap="round"
      />
      <path
        d="M134 78a62 62 0 0 1 30 54"
        fill="none"
        stroke={c.accent}
        strokeWidth={14}
        strokeLinecap="round"
      />
      <path d="M102 132l40 -36" stroke={c.fg} strokeWidth={5} strokeLinecap="round" />
      <circle cx={102} cy={132} r={9} fill={c.fg} />
      {line(80, 152, 44, c.muted)}

      <rect
        x={184}
        y={28}
        width={112}
        height={22}
        rx={11}
        fill={c.bg}
        stroke={c.rule}
        strokeWidth={2}
      />
      <circle cx={198} cy={39} r={4.5} fill="none" stroke={c.muted} strokeWidth={2} />
      <path d="M201.5 42.5l3.5 3.5" stroke={c.muted} strokeWidth={2} strokeLinecap="round" />
      {line(212, 36, 56)}

      <rect
        x={184}
        y={62}
        width={112}
        height={34}
        rx={8}
        fill={c.bg}
        stroke={c.accent}
        strokeWidth={2.5}
      />
      {line(194, 70, 62, c.accent)}
      {line(194, 82, 86, c.muted, 6)}
      <path
        d="M282 86v-14m-6 6l6 -6 6 6"
        fill="none"
        stroke={c.accent}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {[106, 142].map((y) => (
        <g key={y}>
          <rect
            x={184}
            y={y}
            width={112}
            height={28}
            rx={8}
            fill={c.bg}
            stroke={c.rule}
            strokeWidth={2}
          />
          {line(194, y + 7, 50, c.rule)}
          {line(194, y + 17, 76, c.rule, 5)}
        </g>
      ))}
    </>
  ),

  // An address bar with a padlock, over a globe and a server
  globe: (
    <>
      <rect
        x={30}
        y={22}
        width={260}
        height={34}
        rx={17}
        fill={c.bg}
        stroke={c.rule}
        strokeWidth={2}
      />
      <rect x={46} y={32} width={14} height={11} rx={2.5} fill={c.accent} />
      <path d="M49 32v-3a4 4 0 0 1 8 0v3" fill="none" stroke={c.accent} strokeWidth={2.5} />
      {line(70, 35, 110, c.fg)}
      {line(188, 35, 40, c.rule)}

      <g fill="none" stroke={c.fg} strokeWidth={2.5}>
        <circle cx={110} cy={118} r={40} fill={c.bg} />
        <ellipse cx={110} cy={118} rx={17} ry={40} />
        <path d="M70 118h80M76 98h68M76 138h68" />
      </g>
      <path
        d="M150 118h28"
        stroke={c.accent}
        strokeWidth={2.5}
        strokeDasharray="5 5"
        strokeLinecap="round"
      />

      {[78, 108, 138].map((y, i) => (
        <g key={y}>
          <rect
            x={186}
            y={y}
            width={92}
            height={24}
            rx={6}
            fill={c.bg}
            stroke={c.rule}
            strokeWidth={2}
          />
          <circle cx={200} cy={y + 12} r={4} fill={i === 1 ? c.accent : c.rule} />
          {line(212, y + 9, 50, c.rule, 6)}
        </g>
      ))}
    </>
  ),

  // A booking calendar with a chosen slot, and a puzzle piece fitting in
  puzzle: (
    <>
      <Browser x={30} y={20} w={190} h={140}>
        {line(44, 52, 70, c.muted)}
        {Array.from({ length: 12 }, (_, i) => {
          const col = i % 4;
          const row = Math.floor(i / 4);
          const picked = i === 6;
          return (
            <rect
              key={i}
              x={44 + col * 42}
              y={70 + row * 26}
              width={34}
              height={18}
              rx={5}
              fill={picked ? c.accent : c.surface}
              stroke={picked ? c.accent : c.rule}
              strokeWidth={1.5}
            />
          );
        })}
      </Browser>
      <g transform="translate(214 70) rotate(12)">
        <path
          d="M0 0h18v-7a8 8 0 1 1 16 0v7h18v18h-7a8 8 0 1 0 0 16h7v18H0V33h7a8 8 0 1 0 0 -16H0Z"
          fill={c.accent}
          stroke={c.bg}
          strokeWidth={3}
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M232 152c10 -6 22 -6 34 -18"
        fill="none"
        stroke={c.muted}
        strokeWidth={2}
        strokeDasharray="4 5"
        strokeLinecap="round"
      />
    </>
  ),
};

export default function ServiceArt({ name }: { name: ArtName }) {
  return (
    <svg
      viewBox="0 0 320 180"
      className="block h-40 w-full sm:h-44"
      aria-hidden="true"
      focusable="false"
    >
      {art[name]}
    </svg>
  );
}
