import { todo } from "../lib/todo.ts";
import type { Text } from "./types.ts";

/**
 * All copy for the /services page (written for business owners, not recruiters).
 * Edit text and delivery times here; the page renders from this file.
 * Keep it short: one idea per line. Unknown facts use todo("…"): a visible badge
 * in dev, hidden in production.
 */

export type ServiceIcon = "wrench" | "page" | "speed" | "globe" | "puzzle";

export interface Service {
  id: string;
  icon: ServiceIcon;
  /** Short name shown above the title, e.g. "Quick fix". */
  name: string;
  /** Outcome-focused, in the reader's words. */
  title: string;
  /** One short line: who it's for. */
  forWho: string;
  /** 3 short points, a few words each. */
  includes: readonly string[];
  delivery: string;
  cta: string;
}

export interface Shot {
  /** Path under /public. */
  src: string;
  width: number;
  height: number;
}

/** One picture each for a laptop, a tablet and a phone frame. */
export interface DeviceShots {
  laptop: Shot;
  tablet: Shot;
  phone: Shot;
  /** One description for the whole device group. */
  alt: string;
}

export interface ShowcaseProject {
  /** Matches a slug in projects.ts; links to its case study when one exists. */
  slug: string;
  name: string;
  /** Honest credit line, e.g. "Built with a partner". */
  credit: string;
  /** One sentence: what it is and what it does. */
  summary: Text;
  /** One sentence: what this means for the reader's business. */
  forYou: Text;
  shots: DeviceShots;
}

const shot = (src: string, width: number, height: number): Shot => ({ src, width, height });

export const services = {
  meta: {
    title: "Websites for small businesses · Bilel Jabrane",
    description:
      "Fast, modern websites for small businesses: landing pages, quick fixes, speed and Google visibility, and launch help. Get a free check of your current site.",
  },

  hero: {
    eyebrow: "Websites for small businesses",
    headline:
      "I build fast, modern websites for small businesses, and I’ll show you for free what’s wrong with yours.",
    sub: "Send me your link. I’ll show you what’s costing you customers, in plain words.",
    trust: ["Free site check", "A clear quote before I start", "Half upfront, half when done"],
    primaryCta: "Get a free site check",
    secondaryCta: "See services",
    shots: {
      laptop: shot("/projects/loupe/device-laptop.webp", 1440, 900),
      tablet: shot("/projects/oneplace/device-tablet.webp", 600, 863),
      phone: shot("/projects/tamreenlab/device-phone.webp", 390, 844),
      alt: "Three websites I built: a website report on a laptop, a community feed on a tablet and an Arabic learning site on a phone",
    },
  },

  servicesSection: {
    label: "Services",
    title: "Pick what your business needs",
    intro: "Tell me what you need. You get a clear quote before any work starts.",
    deliveryLabel: "Ready in",
    items: [
      {
        id: "quick-fix",
        icon: "wrench",
        name: "Quick fix",
        title: "Your broken website, working again",
        forWho: "A broken page, form or launch problem.",
        includes: [
          "Problem found and fixed",
          "Checked on phone and computer",
          "A short note on the fix",
        ],
        delivery: "1–2 days",
        cta: "Fix my website",
      },
      {
        id: "landing-page",
        icon: "page",
        name: "One-page website",
        title: "A website that turns visitors into customers",
        forWho: "For a new business, product or offer.",
        includes: [
          "Looks great on every phone",
          "Call, message or book buttons",
          "Ready for Google",
        ],
        delivery: "3–5 days",
        cta: "Start my website",
      },
      {
        id: "speed-seo",
        icon: "speed",
        name: "Speed and Google",
        title: "Faster pages, easier to find on Google",
        forWho: "Based on your free site check.",
        includes: [
          "Faster loading on phones",
          "Better Google search results",
          "Before-and-after check",
        ],
        delivery: "2–4 days",
        cta: "Speed up my website",
      },
      {
        id: "launch",
        icon: "globe",
        name: "Setup and launch",
        title: "Online, safe and at your own address",
        forWho: "Your website is ready, but not online yet.",
        includes: [
          "Your own address (domain)",
          "The browser padlock (SSL)",
          "Hosting that keeps you online",
        ],
        delivery: "1–2 days",
        cta: "Put my website online",
      },
      {
        id: "custom",
        icon: "puzzle",
        name: "Custom feature",
        title: "A tool built around how you work",
        forWho: "Online booking, a customer area, an order form…",
        includes: ["We talk first", "Fixed quote before I start", "Updates as it takes shape"],
        delivery: "Agreed in the quote",
        cta: "Tell me what you need",
      },
    ] satisfies Service[],
    /** Highlighted box after the cards, for visitors who aren't sure yet. */
    unsure: {
      title: "Not sure what you need?",
      body: "Start with a free site check. I’ll tell you what to fix first.",
      cta: "Get a free site check",
    },
  },

  projectsSection: {
    label: "My work",
    title: "Projects I’ve built",
    intro: "My own projects, not client work. The same care goes into yours.",
    forYouLabel: "For your business",
    linkLabel: "Technical details",
    liveLabel: "Visit the site",
    items: [
      {
        slug: "oneplace",
        name: "OnePlace",
        credit: "Built with a partner",
        summary:
          "A membership platform where people pay, join, take courses and talk to each other, all in one place.",
        forYou: "Sell memberships or classes without juggling five different apps.",
        shots: {
          laptop: shot("/projects/oneplace/community-feed.webp", 1498, 817),
          tablet: shot("/projects/oneplace/device-tablet.webp", 600, 863),
          phone: shot("/projects/oneplace/device-phone.webp", 390, 844),
          alt: "OnePlace community feed with member posts, a members count and a points leaderboard, shown on a laptop, a tablet and a phone",
        },
      },
      {
        slug: "loupe",
        name: "Loupe",
        credit: "Built on my own",
        summary:
          "A free tool that grades any website and explains each problem in plain English, French or Arabic.",
        forYou: "The same eye I’ll bring to your free site check, without the jargon.",
        shots: {
          laptop: shot("/projects/loupe/device-laptop.webp", 1440, 900),
          tablet: shot("/projects/loupe/device-tablet.webp", 600, 863),
          phone: shot("/projects/loupe/device-phone.webp", 390, 844),
          alt: "Loupe example report for a bakery website with a B grade and an overall score of 86 out of 100, shown on a laptop, a tablet and a phone",
        },
      },
      {
        slug: "tamreenlab",
        name: "TamreenLab",
        credit: "Built on my own",
        summary:
          "An Excel practice site in Arabic, English and French, with instant feedback on every answer.",
        forYou: "Welcome every customer in their own language, Arabic included.",
        shots: {
          laptop: shot("/projects/tamreenlab/device-laptop.webp", 1440, 900),
          tablet: shot("/projects/tamreenlab/device-tablet.webp", 600, 863),
          phone: shot("/projects/tamreenlab/device-phone.webp", 390, 844),
          alt: "TamreenLab Arabic home page titled “Learn Excel by practice”, with a small practice spreadsheet adding up a column, shown on a laptop, a tablet and a phone",
        },
      },
    ] satisfies ShowcaseProject[],
  },

  howItWorks: {
    label: "How it works",
    title: "Three simple steps",
    steps: [
      { title: "Message me", body: "Tell me what you need. A link helps." },
      { title: "Get a clear quote", body: "Price and date in writing. Pay 50% to start." },
      { title: "Get your website", body: "Ask for changes, then pay the rest." },
    ],
  },

  faq: {
    label: "Questions",
    title: "Good to know",
    items: [
      {
        q: "Do I pay everything upfront?",
        a: "No. 50% to start, 50% when you’re happy with the result.",
      },
      {
        q: "What if I want changes?",
        // Placeholder policy: change the number of rounds if you prefer.
        a: "Two rounds of changes are included. Anything new gets its own quote first.",
      },
      {
        q: "How can I pay?",
        a: todo("List the payment methods you accept (e.g. bank transfer, PayPal, Wise, D17)"),
      },
      {
        q: "How long does it take?",
        a: "A quick fix takes 1–2 days, a one-page website 3–5 days. Your quote always has a date.",
      },
      {
        q: "Which languages do you work in?",
        a: todo(
          "Confirm the languages you speak with clients (e.g. Arabic, French, English) and the languages you can build websites in",
        ),
      },
    ],
  },

  contact: {
    title: "Ready to get more from your website?",
    body: "Send me your link. You’ll get a free check or a clear quote.",
    primaryCta: "Email me",
    /** Prefilled subject and body for the mailto: link. */
    emailSubject: "Free site check",
    emailBody: "Hi Bilel,\n\nMy business: \nMy website (if I have one): \nWhat I need: \n",
    linkedinCta: "LinkedIn",
    whatsappCta: "WhatsApp",
    /** Shown before the plain email address, for apps where the button can't open email. */
    orWriteTo: "Or write to",
    whatsapp: todo(
      "Add a WhatsApp link (https://wa.me/<number>) for a WhatsApp button: clients from Instagram and WhatsApp often prefer to message there",
    ),
  },

  /** Button pinned to the bottom of the screen on phones while scrolling. */
  stickyCta: "Get a free site check",
} as const;
