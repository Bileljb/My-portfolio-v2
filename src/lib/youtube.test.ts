import { describe, expect, it } from "vitest";
import { parseYouTubeId, parseYouTubeUrl, youTubeEmbedUrl } from "./youtube.ts";

const ID = "dQw4w9WgXcQ";

describe("parseYouTubeId", () => {
  it.each([
    `https://www.youtube.com/watch?v=${ID}`,
    `https://youtube.com/watch?v=${ID}&list=PL123&index=2`,
    `https://m.youtube.com/watch?v=${ID}`,
    `http://www.youtube.com/watch?feature=share&v=${ID}`,
    `https://youtu.be/${ID}`,
    `https://youtu.be/${ID}?si=abc123`,
    `https://www.youtube.com/embed/${ID}`,
    `https://www.youtube-nocookie.com/embed/${ID}?rel=0`,
    `https://www.youtube.com/shorts/${ID}`,
    `https://www.youtube.com/live/${ID}`,
    `youtube.com/watch?v=${ID}`,
    `  https://youtu.be/${ID}  `,
  ])("accepts %s", (url) => {
    expect(parseYouTubeId(url)).toBe(ID);
  });

  it.each([
    undefined,
    null,
    "",
    "   ",
    "not a url",
    "https://vimeo.com/123456",
    "https://www.youtube.com/",
    "https://www.youtube.com/watch",
    "https://www.youtube.com/watch?v=short",
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ<script>",
    "https://youtu.be/",
    "https://evil.com/watch?v=dQw4w9WgXcQ",
    "https://youtube.com.evil.com/watch?v=dQw4w9WgXcQ",
    "javascript:alert(1)",
    "ftp://youtube.com/watch?v=dQw4w9WgXcQ",
  ])("rejects %s", (url) => {
    expect(parseYouTubeId(url)).toBeNull();
  });
});

describe("start time", () => {
  it.each([
    [`https://youtu.be/${ID}?t=90`, 90],
    [`https://www.youtube.com/watch?v=${ID}&t=1m30s`, 90],
    [`https://www.youtube.com/embed/${ID}?start=42`, 42],
    [`https://youtu.be/${ID}?t=1h0m5s`, 3605],
  ])("%s → %d s", (url, seconds) => {
    expect(parseYouTubeUrl(url)?.start).toBe(seconds);
  });

  it("ignores garbage start values", () => {
    expect(parseYouTubeUrl(`https://youtu.be/${ID}?t=abc`)).toEqual({ id: ID });
  });
});

describe("youTubeEmbedUrl", () => {
  it("uses the privacy-enhanced domain", () => {
    expect(youTubeEmbedUrl({ id: ID }, true)).toBe(
      `https://www.youtube-nocookie.com/embed/${ID}?rel=0&modestbranding=1&autoplay=1`,
    );
  });
});
