const ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "music.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
]);

/** Path prefixes whose next segment is the video ID: /embed/ID, /shorts/ID, /live/ID, /v/ID */
const ID_PATH_PREFIXES = new Set(["embed", "shorts", "live", "v"]);

export interface YouTubeVideo {
  id: string;
  /** Start offset in seconds, from ?t= or ?start= (e.g. "90", "1m30s"). */
  start?: number;
}

/**
 * Extracts the video ID from any common YouTube URL: watch, youtu.be, embed,
 * youtube-nocookie, shorts, live. Returns null for anything else; never throws.
 */
export function parseYouTubeUrl(input: string | undefined | null): YouTubeVideo | null {
  if (typeof input !== "string") return null;
  const raw = input.trim();
  if (raw === "") return null;

  let url: URL;
  try {
    url = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;

  const host = url.hostname.toLowerCase();
  const segments = url.pathname.split("/").filter(Boolean);
  let id: string | null | undefined = null;

  if (host === "youtu.be") {
    id = segments[0];
  } else if (YOUTUBE_HOSTS.has(host)) {
    if (segments[0] === "watch") id = url.searchParams.get("v");
    else if (segments[0] && ID_PATH_PREFIXES.has(segments[0])) id = segments[1];
  }

  if (!id || !ID_PATTERN.test(id)) return null;

  const start = parseStart(url.searchParams.get("t") ?? url.searchParams.get("start"));
  return start === undefined ? { id } : { id, start };
}

export function parseYouTubeId(input: string | undefined | null): string | null {
  return parseYouTubeUrl(input)?.id ?? null;
}

/** "90" | "90s" | "1m30s" | "1h2m3s" → seconds. */
function parseStart(value: string | null): number | undefined {
  if (!value) return undefined;
  if (/^\d+$/.test(value)) return Number(value) || undefined;
  const match = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.exec(value);
  if (!match || match[0] === "") return undefined;
  const [, h = "0", m = "0", s = "0"] = match;
  const total = Number(h) * 3600 + Number(m) * 60 + Number(s);
  return total > 0 ? total : undefined;
}

export function youTubeEmbedUrl({ id, start }: YouTubeVideo, autoplay = false): string {
  const params = new URLSearchParams({ rel: "0", modestbranding: "1" });
  if (autoplay) params.set("autoplay", "1");
  if (start) params.set("start", String(start));
  return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
}

export function youTubeThumbnailUrl(id: string): string {
  // hqdefault.jpg (480×360) exists for every public video; webp/maxres variants don't.
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
