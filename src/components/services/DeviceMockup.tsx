import type { DeviceShots, Shot } from "../../data/services.ts";
import { assetUrl } from "../../lib/assetUrl.ts";

/** Frames use the foreground token in light mode and the rule token in dark mode. */
const frame = "bg-fg dark:bg-rule shadow-lg";

/**
 * The same page on a laptop, a tablet and a phone. Sizes are percentages of the
 * container, so the group scales down as one picture on small screens.
 */
export default function DeviceMockup({ shots }: { shots: DeviceShots }) {
  return (
    <div role="img" aria-label={shots.alt} className="relative aspect-[100/64] w-full">
      {/* Laptop: screen plus a thin base */}
      <div className="absolute top-0 right-0 w-[80%]">
        <div className={`${frame} rounded-t-lg p-[1.6%]`}>
          <Screen shot={shots.laptop} className="aspect-[16/10] rounded-sm" />
        </div>
        <div className={`${frame} mx-[-5%] h-2 rounded-b-lg sm:h-3`} />
      </div>

      {/* Tablet */}
      <div
        className={`${frame} absolute bottom-0 left-0 w-[27%] rounded-xl p-[1.4%] sm:rounded-2xl`}
      >
        <Screen shot={shots.tablet} className="aspect-[600/863] rounded-md" />
      </div>

      {/* Phone */}
      <div
        className={`${frame} absolute right-[6%] bottom-0 w-[15%] rounded-xl p-[1%] sm:rounded-2xl`}
      >
        <Screen shot={shots.phone} className="aspect-[390/844] rounded-[0.6rem]" />
      </div>
    </div>
  );
}

function Screen({ shot, className }: { shot: Shot; className: string }) {
  return (
    <div className={`bg-surface overflow-hidden ${className}`}>
      <img
        src={assetUrl(shot.src)}
        alt=""
        width={shot.width}
        height={shot.height}
        loading="lazy"
        decoding="async"
        className="size-full object-cover object-top"
      />
    </div>
  );
}
