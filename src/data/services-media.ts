import { todo } from "../lib/todo.ts";
import type { DeviceShots, Shot } from "./services.ts";

/**
 * Pictures and links for the /services page, shared by every language.
 * The words (including image descriptions) live in services.ts, services.fr.ts
 * and services.ar.ts.
 */

const shot = (src: string, width: number, height: number): Shot => ({ src, width, height });

type Shots = Omit<DeviceShots, "alt">;

export const heroShots: Shots = {
  laptop: shot("/projects/loupe/device-laptop.webp", 1440, 900),
  tablet: shot("/projects/oneplace/device-tablet.webp", 600, 863),
  phone: shot("/projects/tamreenlab/device-phone.webp", 390, 844),
};

export const projectShots = {
  oneplace: {
    laptop: shot("/projects/oneplace/community-feed.webp", 1498, 817),
    tablet: shot("/projects/oneplace/device-tablet.webp", 600, 863),
    phone: shot("/projects/oneplace/device-phone.webp", 390, 844),
  },
  loupe: {
    laptop: shot("/projects/loupe/device-laptop.webp", 1440, 900),
    tablet: shot("/projects/loupe/device-tablet.webp", 600, 863),
    phone: shot("/projects/loupe/device-phone.webp", 390, 844),
  },
  tamreenlab: {
    laptop: shot("/projects/tamreenlab/device-laptop.webp", 1440, 900),
    tablet: shot("/projects/tamreenlab/device-tablet.webp", 600, 863),
    phone: shot("/projects/tamreenlab/device-phone.webp", 390, 844),
  },
} satisfies Record<string, Shots>;

export const whatsapp = todo(
  "Add a WhatsApp link (https://wa.me/<number>) for a WhatsApp button: clients from Instagram and WhatsApp often prefer to message there",
);
