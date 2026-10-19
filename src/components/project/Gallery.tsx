import { useEffect, useRef, useState } from "react";
import type { Screenshot } from "../../data/types.ts";

/** Lazy-loaded screenshot grid; click opens a keyboard-navigable lightbox (native <dialog>). */
export default function Gallery({ shots, title }: { shots: readonly Screenshot[]; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const current = open === null ? undefined : shots[open];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open !== null && !dialog.open) dialog.showModal();
    if (open === null && dialog.open) dialog.close();
  }, [open]);

  const step = (delta: number) =>
    setOpen((i) => (i === null ? i : (i + delta + shots.length) % shots.length));

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2">
        {shots.map((shot, i) => (
          <li key={shot.src} className={shots.length % 2 === 1 && i === 0 ? "sm:col-span-2" : ""}>
            <figure>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="border-fg bg-surface block w-full overflow-hidden border"
                aria-label={`Enlarge: ${shot.alt}`}
              >
                <img
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  loading="lazy"
                  decoding="async"
                  className="h-auto w-full transition-transform duration-300 hover:scale-[1.02] motion-reduce:transition-none"
                />
              </button>
              {shot.caption && (
                <figcaption className="text-muted mt-2 font-mono text-xs">
                  <span className="text-accent-text">FIG. {String(i + 1).padStart(2, "0")}</span>{" "}
                  {shot.caption}
                </figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>

      {/* A modal <dialog> is interactive (focus-trapped, Esc closes natively); the handlers
          add backdrop-click-to-close and arrow-key paging on top. */}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <dialog
        ref={dialogRef}
        aria-label={`${title} screenshots`}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="bg-bg text-fg m-auto max-h-[95dvh] w-[min(1200px,95vw)] max-w-none p-0 backdrop:bg-black/80"
      >
        {current && (
          <figure className="p-3 sm:p-4">
            <img
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              className="mx-auto max-h-[78dvh] w-auto object-contain"
            />
            <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <span className="text-muted">
                {(open ?? 0) + 1} / {shots.length}
                {current.caption ? ` · ${current.caption}` : ""}
              </span>
              <span className="flex gap-2">
                {shots.length > 1 && (
                  <>
                    <DialogButton onClick={() => step(-1)} label="Previous screenshot">
                      ←
                    </DialogButton>
                    <DialogButton onClick={() => step(1)} label="Next screenshot">
                      →
                    </DialogButton>
                  </>
                )}
                <DialogButton onClick={() => setOpen(null)} label="Close">
                  ✕
                </DialogButton>
              </span>
            </figcaption>
          </figure>
        )}
      </dialog>
    </>
  );
}

function DialogButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="border-rule hover:border-fg grid size-10 place-items-center border"
    >
      <span aria-hidden="true">{children}</span>
    </button>
  );
}
