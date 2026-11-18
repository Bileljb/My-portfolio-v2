import "@fontsource-variable/noto-kufi-arabic";
import "@fontsource-variable/noto-sans-arabic";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { Link } from "react-router";
import DeviceMockup from "../components/services/DeviceMockup.tsx";
import ServiceArt from "../components/services/ServiceArt.tsx";
import { CheckIcon, LinkedInIcon, MailIcon } from "../components/ui/icons.tsx";
import TodoText from "../components/ui/TodoText.tsx";
import { profile } from "../data/profile.ts";
import { whatsapp as whatsappLink } from "../data/services-media.ts";
import {
  languageInfo,
  languages,
  services,
  type Lang,
  type Language,
  type Service,
  type ServicesCopy,
  type ShowcaseProject,
} from "../data/services.ts";
import { usePageMeta } from "../hooks/usePageMeta.ts";
import { getProject } from "../lib/projects.ts";
import { isRenderable, textOrNull } from "../lib/todo.ts";

/**
 * Page for small-business owners (not recruiters), in English (/services), French
 * (/fr/services) and Arabic (/ar/services, right to left). All copy comes from
 * src/data/services.ts and its .fr/.ar siblings.
 */

interface PageContext {
  t: ServicesCopy;
  language: Language;
  /** Points forward in the reading direction. */
  arrow: string;
}

const Ctx = createContext<PageContext | null>(null);

function usePage(): PageContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePage must be used inside the Services page");
  return ctx;
}

const email = textOrNull(profile.email);

function mailto(subject: string, body = ""): string {
  if (!email) return profile.links.linkedin;
  const params = `subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;
  return `mailto:${email}?${params}`;
}

const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full text-center sm:whitespace-nowrap border-2 px-7 py-3 text-base font-semibold transition-[transform,box-shadow,background-color,color] motion-reduce:transition-none";
const buttonStyles = {
  primary: `${buttonBase} bg-accent-fill text-on-accent border-accent-fill shadow-[0_8px_24px_-8px_var(--color-accent)] hover:-translate-y-0.5`,
  secondary: `${buttonBase} border-fg text-fg hover:bg-fg hover:text-bg`,
};

export default function Services({ lang = "en" }: { lang?: Lang }) {
  const t = services[lang];
  const language = languageInfo[lang];
  usePageMeta({ ...t.meta, lang, alternates: languages });

  return (
    <Ctx.Provider value={{ t, language, arrow: language.dir === "rtl" ? "←" : "→" }}>
      <div lang={lang} dir={language.dir} className="mx-auto max-w-6xl px-4 sm:px-6">
        <Hero />
        <ServicesList />
        <Projects />
        <HowItWorks />
        <Faq />
        <FinalCta />
      </div>
      <StickyCta />
    </Ctx.Provider>
  );
}

/** Links to the same page in the other languages. */
function LanguageSwitcher() {
  const { t, language } = usePage();
  return (
    <nav aria-label={t.languageLabel}>
      <ul className="flex flex-wrap gap-2">
        {languages.map((l) => {
          const current = l.lang === language.lang;
          return (
            <li key={l.lang}>
              <Link
                to={l.path}
                lang={l.lang}
                hrefLang={l.lang}
                aria-current={current ? "page" : undefined}
                className={`inline-flex min-h-10 items-center rounded-full border px-4 text-sm font-medium transition-colors motion-reduce:transition-none ${
                  current
                    ? "border-fg bg-fg text-bg"
                    : "border-rule text-muted hover:border-fg hover:text-fg"
                }`}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Hero() {
  const { t, arrow } = usePage();
  const { hero } = t;
  return (
    <section
      id="services-hero"
      aria-labelledby="services-hero-heading"
      className="grid items-center gap-12 pt-10 pb-16 sm:pt-16 sm:pb-20 lg:grid-cols-[1fr_1.15fr] lg:gap-12"
    >
      <div>
        <LanguageSwitcher />
        <p className="text-accent-text mt-8 text-sm font-semibold tracking-wider uppercase">
          {hero.eyebrow}
        </p>
        <h1
          id="services-hero-heading"
          className="mt-4 text-4xl leading-[1.05] font-semibold sm:text-5xl xl:text-6xl"
        >
          {hero.headline}
        </h1>
        <p className="text-muted mt-6 max-w-lg text-lg leading-relaxed sm:text-xl">{hero.sub}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#contact" className={buttonStyles.primary}>
            {hero.primaryCta} {arrow}
          </a>
          <a href="#services" className={buttonStyles.secondary}>
            {hero.secondaryCta}
          </a>
        </div>
        <ul className="text-muted mt-8 flex flex-wrap gap-x-6 gap-y-2">
          {hero.trust.map((point) => (
            <li key={point} className="flex items-center gap-2 text-base">
              <CheckIcon width={16} height={16} className="text-accent-text" />
              {point}
            </li>
          ))}
        </ul>
      </div>
      <div className="rise" style={{ "--i": 2 } as CSSProperties}>
        <DeviceMockup shots={hero.shots} />
      </div>
    </section>
  );
}

interface BlockProps {
  id: string;
  label: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

/** Section heading: small label, big title, optional one-line intro. */
function Block({ id, label, title, intro, children }: BlockProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="py-16 sm:py-24">
      <div className="max-w-2xl">
        <p className="text-accent-text text-sm font-semibold tracking-wider uppercase">{label}</p>
        <h2 id={`${id}-heading`} className="mt-3 text-3xl font-semibold sm:text-5xl">
          {title}
        </h2>
        {intro && <p className="text-muted mt-4 text-lg sm:text-xl">{intro}</p>}
      </div>
      <div className="reveal mt-10 sm:mt-14">{children}</div>
    </section>
  );
}

/** Three cards on the first row, two wider ones on the second. */
const cardSpans = [
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
];

function ServicesList() {
  const { t, arrow } = usePage();
  const s = t.servicesSection;
  const u = s.unsure;
  return (
    <Block id="services" label={s.label} title={s.title} intro={s.intro}>
      <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {s.items.map((item, i) => (
          <li key={item.id} className={cardSpans[i]}>
            <ServiceCard service={item} />
          </li>
        ))}
      </ul>
      <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg">
          <span className="font-semibold">{u.title}</span>{" "}
          <span className="text-muted">{u.body}</span>
        </p>
        <a href="#contact" className={`${buttonStyles.secondary} shrink-0`}>
          {u.cta} {arrow}
        </a>
      </div>
    </Block>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="bg-surface flex h-full flex-col rounded-3xl p-6 shadow-[0_1px_3px_rgb(27_36_48/0.08),0_8px_24px_-12px_rgb(27_36_48/0.12)] sm:p-7 dark:shadow-none">
      <ServiceArt name={service.icon} />
      <p className="text-accent-text mt-6 text-base font-semibold">{service.name}</p>
      <h3 className="mt-1 text-2xl leading-snug font-semibold">{service.title}</h3>
      <p className="text-muted mt-2 text-base">{service.forWho}</p>
      <ul className="mt-5 space-y-2">
        {service.includes.map((point) => (
          <li key={point} className="flex gap-2.5 text-base">
            <CheckIcon width={18} height={18} className="text-accent-text mt-0.5 shrink-0" />
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}

function Projects() {
  const s = usePage().t.projectsSection;
  return (
    <Block id="projects" label={s.label} title={s.title} intro={s.intro}>
      <ul className="space-y-16 sm:space-y-24">
        {s.items.map((item, i) => (
          <li key={item.slug}>
            <ShowcaseRow project={item} flip={i % 2 === 1} />
          </li>
        ))}
      </ul>
    </Block>
  );
}

function ShowcaseRow({ project, flip }: { project: ShowcaseProject; flip: boolean }) {
  const caseStudy = getProject(project.slug);
  const live = caseStudy?.links.live;
  const s = usePage().t.projectsSection;

  return (
    <article className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
      <div className={flip ? "lg:order-2" : undefined}>
        <DeviceMockup shots={project.shots} />
      </div>
      <div>
        <h3 className="text-3xl font-semibold sm:text-4xl">{project.name}</h3>
        <p className="text-muted mt-1 text-base">{project.credit}</p>
        <TodoText value={project.summary} as="p" className="mt-5 text-lg leading-relaxed" />
        {isRenderable(project.forYou) && (
          <p className="border-accent mt-5 border-s-2 ps-4 text-lg">
            <span className="text-accent-text font-semibold">{s.forYouLabel}: </span>
            <TodoText value={project.forYou} />
          </p>
        )}
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1">
          {live && (
            <a
              href={live}
              rel="noopener"
              className="text-fg hover:text-accent-text inline-flex min-h-11 items-center text-base font-semibold underline underline-offset-4"
            >
              {s.liveLabel} <span className="sr-only">: {project.name}</span>
              <span aria-hidden="true">&nbsp;↗</span>
            </a>
          )}
          {caseStudy && (
            <Link
              to={`/projects/${project.slug}`}
              className="text-muted hover:text-fg inline-flex min-h-11 items-center text-base underline underline-offset-4"
            >
              {s.linkLabel} <span className="sr-only">: {project.name}</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

function HowItWorks() {
  const s = usePage().t.howItWorks;
  return (
    <Block id="how-it-works" label={s.label} title={s.title}>
      <ol className="grid gap-8 md:grid-cols-3 md:gap-10">
        {s.steps.map((step, i) => (
          <li key={step.title} className="border-rule border-t-2 pt-6">
            <span
              aria-hidden="true"
              className="text-accent-text font-display text-5xl font-semibold"
            >
              {i + 1}
            </span>
            <h3 className="mt-3 text-2xl font-semibold">{step.title}</h3>
            <p className="text-muted mt-2 text-lg">{step.body}</p>
          </li>
        ))}
      </ol>
    </Block>
  );
}

function Faq() {
  const s = usePage().t.faq;
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[1fr_2fr] lg:gap-16"
    >
      <div>
        <p className="text-accent-text text-sm font-semibold tracking-wider uppercase">{s.label}</p>
        <h2 id="faq-heading" className="mt-3 text-3xl font-semibold sm:text-5xl">
          {s.title}
        </h2>
      </div>
      <ul className="reveal border-rule border-t">
        {s.items
          .filter((item) => isRenderable(item.a))
          .map((item) => (
            <li key={item.q} className="border-rule border-b">
              <details className="group">
                <summary className="hover:text-accent-text flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold transition-colors motion-reduce:transition-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="text-accent-text shrink-0 text-3xl leading-none font-light transition-transform group-open:rotate-45 motion-reduce:transition-none"
                  >
                    +
                  </span>
                </summary>
                <div className="text-muted pb-6 text-lg leading-relaxed">
                  <TodoText value={item.a} />
                </div>
              </details>
            </li>
          ))}
      </ul>
    </section>
  );
}

function FinalCta() {
  const c = usePage().t.contact;
  const whatsapp = textOrNull(whatsappLink);
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-rule border-t py-20 text-center sm:py-28"
    >
      <h2 id="contact-heading" className="mx-auto max-w-3xl text-4xl font-semibold sm:text-6xl">
        {c.title}
      </h2>
      <p className="text-muted mx-auto mt-5 max-w-xl text-lg sm:text-xl">{c.body}</p>

      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
        <a href={mailto(c.emailSubject, c.emailBody)} className={buttonStyles.primary}>
          <MailIcon />
          {c.primaryCta}
        </a>
        {whatsapp && (
          <a href={whatsapp} rel="noopener" className={buttonStyles.secondary}>
            {c.whatsappCta}
          </a>
        )}
        <a href={profile.links.linkedin} rel="me noopener" className={buttonStyles.secondary}>
          <LinkedInIcon />
          {c.linkedinCta}
        </a>
      </div>
      {email && (
        <p className="text-muted mt-6 text-base [overflow-wrap:anywhere]">
          {c.orWriteTo}{" "}
          <a
            href={`mailto:${email}`}
            className="text-fg font-semibold underline underline-offset-4"
          >
            {email}
          </a>
        </p>
      )}
      {!whatsapp && (
        <div className="mx-auto mt-4 w-fit max-w-full">
          <TodoText value={whatsappLink} />
        </div>
      )}
    </section>
  );
}

/**
 * Phones only: a "free site check" button pinned to the bottom of the screen once
 * the hero has scrolled away, hidden again when the contact section is on screen.
 */
function StickyCta() {
  const { t, language, arrow } = usePage();
  const [heroVisible, setHeroVisible] = useState(true);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("services-hero");
    const contact = document.getElementById("contact");
    if (!hero || !contact) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === hero) setHeroVisible(entry.isIntersecting);
        if (entry.target === contact) setContactVisible(entry.isIntersecting);
      }
    });
    observer.observe(hero);
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  if (heroVisible || contactVisible) return null;
  return (
    <div
      lang={language.lang}
      dir={language.dir}
      className="border-rule bg-bg/95 fixed inset-x-0 bottom-0 z-30 border-t px-4 py-3 backdrop-blur sm:hidden"
    >
      <a href="#contact" className={`${buttonStyles.primary} w-full`}>
        {t.stickyCta} {arrow}
      </a>
    </div>
  );
}
