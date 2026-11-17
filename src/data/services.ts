import { todo } from "../lib/todo.ts";
import type { Text } from "./types.ts";

/**
 * All copy for the /services page (written for business owners, not recruiters).
 * Edit text, prices and delivery times here; the page renders from this file.
 * Unknown facts use todo("…"): a visible badge in dev, hidden in production.
 */

export interface Service {
  id: string;
  /** Outcome-focused, in the reader's words. */
  title: string;
  forWho: string;
  includes: readonly string[];
  delivery: string;
  /** Number only; shown as "from $X". */
  priceFrom: number;
  /** Show "Custom quote" next to the price. */
  quote?: boolean;
  cta: string;
}

export interface Shot {
  /** Path under /public. */
  src: string;
  width: number;
  height: number;
}

/** The same page captured at laptop (1440 px), tablet (820 px) and phone (390 px) width. */
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
  problem: Text;
  built: Text;
  forYou: Text;
  shots: DeviceShots;
}

export const services = {
  currency: "$",

  meta: {
    title: "Websites for small businesses · Bilel Jabrane",
    description:
      "Fast, modern websites for small businesses: landing pages, quick fixes, speed and Google visibility, and launch help. Get a free check of your current site.",
  },

  hero: {
    eyebrow: "Web design and development for small businesses",
    headline:
      "I build fast, modern websites for small businesses, and I’ll show you for free what’s wrong with yours.",
    sub: "Send me your website link. Within a day or two you’ll get a short, plain-language list of what’s slowing it down or keeping customers away, and what to fix first. No cost, no obligation.",
    primaryCta: "Get a free site check",
    secondaryCta: "See what I offer",
  },

  servicesSection: {
    label: "Services",
    title: "Pick what your business needs",
    intro:
      "Clear prices, clear delivery times. Every price is a starting point: I confirm the exact amount in writing before any work starts.",
    deliveryLabel: "Ready in",
    priceLabel: "Price",
    quoteLabel: "Custom quote",
    fromLabel: "from",
    items: [
      {
        id: "quick-fix",
        title: "Get your broken website working again",
        forWho:
          "For you if a page looks wrong on phones, a contact form stopped sending, or your site won’t go online.",
        includes: [
          "I find what’s broken and fix it",
          "I check it on phone, tablet and computer",
          "A short note explaining what went wrong",
        ],
        delivery: "1 to 2 days",
        priceFrom: 20,
        cta: "Fix my website",
      },
      {
        id: "landing-page",
        title: "A one-page website that turns visitors into customers",
        forWho:
          "For you if you have no website yet, or you need one page for a product, a service or a promotion.",
        includes: [
          "A clean design that looks good on every phone",
          "Your offer, photos and prices, written clearly",
          "Buttons to call you, message you or book",
          "Set up so Google can find it",
        ],
        delivery: "3 to 5 days",
        priceFrom: 80,
        cta: "Start my website",
      },
      {
        id: "speed-seo",
        title: "A faster website that more people find on Google",
        forWho:
          "For you if your site feels slow, or customers can’t find you when they search for what you sell.",
        includes: [
          "Starts with the free site check, so you know what you’re paying for",
          "Pages that load faster, especially on phones",
          "Clear page titles and descriptions for Google search results",
          "A before-and-after check so you can see what changed",
        ],
        delivery: "2 to 4 days",
        priceFrom: 50,
        cta: "Speed up my website",
      },
      {
        id: "launch",
        title: "Your website online, safe and at your own address",
        forWho:
          "For you if your website is ready but not online yet, or you want your own address like yourbusiness.com.",
        includes: [
          "Help choosing and connecting your web address (domain)",
          "The padlock in the browser bar (SSL), so visitors know your site is safe",
          "Hosting set up: the service that keeps your site online",
          "A quick guide so you stay in control of your accounts",
        ],
        delivery: "1 to 2 days",
        priceFrom: 30,
        cta: "Put my website online",
      },
      {
        id: "custom",
        title: "A custom tool built around how your business works",
        forWho:
          "For you if you need something a template can’t do: online booking, a customer area, an order form or a small internal tool.",
        includes: [
          "We talk first, so I understand how you work today",
          "A clear plan and a fixed quote before I start",
          "Regular updates you can try as it takes shape",
        ],
        delivery: "Depends on the project, agreed in the quote",
        priceFrom: 150,
        quote: true,
        cta: "Tell me what you need",
      },
    ] satisfies Service[],
  },

  projectsSection: {
    label: "Projects I’ve built",
    title: "A few things I’ve built",
    intro:
      "These are my own projects, not client work. They show the kind of quality you can expect for your business.",
    problemLabel: "The problem",
    builtLabel: "What I built",
    forYouLabel: "What it means for you",
    linkLabel: "Technical details",
    liveLabel: "Visit the site",
    items: [
      {
        slug: "oneplace",
        name: "OnePlace",
        credit: "Built with a partner",
        problem:
          "People who sell courses or paid memberships often juggle one tool for payments, another for lessons and another for their community.",
        built:
          "One website where members pay, get access straight away, take courses, join events and talk to each other. The owner sees members and earnings on one screen.",
        forYou:
          "If you sell memberships, classes or courses, your customers can pay and start in one place, and you stop copying data between apps.",
        shots: {
          laptop: { src: "/projects/oneplace/device-laptop.webp", width: 1440, height: 900 },
          tablet: { src: "/projects/oneplace/device-tablet.webp", width: 600, height: 863 },
          phone: { src: "/projects/oneplace/device-phone.webp", width: 390, height: 844 },
          alt: "OnePlace page for an English-learning community with a welcome video, a $20 a month membership and a Join button, shown on a laptop, a tablet and a phone",
        },
      },
      {
        slug: "loupe",
        name: "Loupe",
        credit: "Built on my own",
        problem:
          "Most website check-up tools are written for developers, so business owners can’t tell which problems actually matter.",
        built:
          "A free tool that checks a website and gives it a grade, then explains each problem in plain English, French or Arabic, with the three fixes to do first.",
        forYou:
          "This is how I look at websites: what costs you customers, explained without jargon. Your free site check builds on the same approach.",
        shots: {
          laptop: { src: "/projects/loupe/device-laptop.webp", width: 1440, height: 900 },
          tablet: { src: "/projects/loupe/device-tablet.webp", width: 600, height: 863 },
          phone: { src: "/projects/loupe/device-phone.webp", width: 390, height: 844 },
          alt: "Loupe example report for a bakery website with a B grade and an overall score of 86 out of 100, shown on a laptop, a tablet and a phone",
        },
      },
      {
        slug: "tamreenlab",
        name: "TamreenLab",
        credit: "Built on my own",
        problem:
          "Arabic speakers who want to learn Excel find few places to practise, and most of them are English-only.",
        built:
          "A practice website in Arabic, English and French. Learners type real formulas, get instant feedback on each mistake and earn points as they go.",
        forYou:
          "If your customers speak Arabic, French or English, your website can welcome each of them in their own language, with right-to-left Arabic done properly.",
        shots: {
          laptop: { src: "/projects/tamreenlab/device-laptop.webp", width: 1440, height: 900 },
          tablet: { src: "/projects/tamreenlab/device-tablet.webp", width: 600, height: 863 },
          phone: { src: "/projects/tamreenlab/device-phone.webp", width: 390, height: 844 },
          alt: "TamreenLab Arabic home page titled “Learn Excel by practice”, with a small practice spreadsheet adding up a column, shown on a laptop, a tablet and a phone",
        },
      },
    ] satisfies ShowcaseProject[],
  },

  howItWorks: {
    label: "How it works",
    title: "Simple from first message to launch",
    steps: [
      {
        title: "You message me",
        body: "Tell me about your business and what you need, in a few lines. A link to your current website helps if you have one.",
      },
      {
        title: "I send you a clear quote",
        body: "You get the price, what’s included and the delivery date in writing. To start, you pay a 50% deposit.",
      },
      {
        title: "I deliver, then you pay the rest",
        body: "You review the finished work and ask for changes. Once you’re happy, you pay the remaining 50% and it’s all yours.",
      },
    ],
  },

  faq: {
    label: "Questions",
    title: "Common questions",
    items: [
      {
        q: "Do I pay everything upfront?",
        a: "No. You pay 50% to start and the other 50% when the work is done and you’re happy with it.",
      },
      {
        q: "What if I want changes?",
        // Placeholder policy: change the number of rounds if you prefer.
        a: "Two rounds of changes are included in every price. Anything new beyond the original plan gets a separate quote first, so there are no surprises.",
      },
      {
        q: "How can I pay?",
        a: todo("List the payment methods you accept (e.g. bank transfer, PayPal, Wise, D17)"),
      },
      {
        q: "How long does it take?",
        a: "Small fixes usually take 1 to 2 days, a one-page website 3 to 5 days. Your quote always includes a delivery date.",
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
    label: "Contact",
    title: "Let’s see what your website could do better",
    body: "Send me your website link, or a few lines about your business if you don’t have a site yet. I’ll reply with a free check or a clear quote, usually within a day.",
    primaryCta: "Email me",
    /** Prefilled subject and body for the mailto: link. */
    emailSubject: "Free site check",
    emailBody: "Hi Bilel,\n\nMy business: \nMy website (if I have one): \nWhat I need: \n",
    linkedinCta: "LinkedIn",
    whatsappCta: "WhatsApp",
    /** Shown before the plain email address, for apps where the button can't open email. */
    orWriteTo: "Or write to",
    whatsapp: todo("Add a WhatsApp number (wa.me link) if you want a WhatsApp button"),
  },
} as const;
