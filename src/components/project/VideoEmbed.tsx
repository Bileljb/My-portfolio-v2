import { useState } from "react";
import { parseYouTubeUrl, youTubeEmbedUrl, youTubeThumbnailUrl } from "../../lib/youtube.ts";

interface VideoEmbedProps {
  url: string | undefined;
  title: string;
}

/**
 * Click-to-load YouTube embed. Shows a lazy thumbnail first and only loads the
 * youtube-nocookie iframe on click, so the page stays fast until the visitor
 * asks for the video. Missing or invalid URLs render a friendly fallback.
 */
export default function VideoEmbed({ url, title }: VideoEmbedProps) {
  const video = parseYouTubeUrl(url);
  const [playing, setPlaying] = useState(false);
  // jpg exists for every public video; if even that fails, show a styled poster instead.
  const [thumb, setThumb] = useState<"jpg" | "none">("jpg");

  if (!video) {
    if (url && import.meta.env.DEV) console.warn(`[VideoEmbed] Not a valid YouTube URL: "${url}"`);
    return <ComingSoon />;
  }

  return (
    <div className="border-fg relative aspect-video overflow-hidden border bg-black">
      {playing ? (
        <iframe
          src={youTubeEmbedUrl(video, true)}
          title={`${title} demo video`}
          className="absolute inset-0 size-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 size-full"
          aria-label={`Play ${title} demo video`}
        >
          {thumb === "jpg" ? (
            <img
              src={youTubeThumbnailUrl(video.id)}
              // YouTube serves a 120px grey placeholder (with a 404) for missing thumbnails.
              onLoad={(e) => e.currentTarget.naturalWidth <= 120 && setThumb("none")}
              onError={() => setThumb("none")}
              alt=""
              loading="lazy"
              decoding="async"
              width={480}
              height={360}
              className="size-full object-cover opacity-90 transition-opacity group-hover:opacity-100 motion-reduce:transition-none"
            />
          ) : (
            <span
              aria-hidden="true"
              className="bg-surface absolute inset-0 grid place-items-end p-5 text-left"
            >
              <span>
                <span className="text-accent-text block font-mono text-xs tracking-widest uppercase">
                  Demo video
                </span>
                <span className="font-display text-fg mt-1 block text-2xl font-semibold sm:text-3xl">
                  {title}
                </span>
              </span>
            </span>
          )}
          <span
            aria-hidden="true"
            className="bg-accent-fill text-on-accent absolute top-1/2 left-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center shadow-[4px_4px_0_0_#000] transition-transform group-hover:scale-105 motion-reduce:transition-none sm:size-20"
          >
            <svg viewBox="0 0 24 24" className="ml-1 size-7 sm:size-8" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}

function ComingSoon() {
  return (
    <div className="border-rule bg-surface grid aspect-video place-items-center border border-dashed p-6 text-center">
      <div>
        <svg
          viewBox="0 0 24 24"
          className="text-accent mx-auto size-10"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <rect x="2" y="5" width="15" height="14" rx="1" />
          <path d="m17 10 5-3v10l-5-3" />
        </svg>
        <p className="font-display mt-4 text-xl font-semibold">Demo video coming soon</p>
        <p className="text-muted mt-2 text-sm">
          A walkthrough will appear here. In the meantime, feel free to reach out for a live demo.
        </p>
      </div>
    </div>
  );
}
