import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router";
import DeviceMockup from "../components/services/DeviceMockup.tsx";
import ServiceIcon from "../components/services/ServiceIcon.tsx";
import { CheckIcon, LinkedInIcon, MailIcon } from "../components/ui/icons.tsx";
import TodoText from "../components/ui/TodoText.tsx";
import { profile } from "../data/profile.ts";
import { services, type Service, type ShowcaseProject } from "../data/services.ts";
import { usePageMeta } from "../hooks/usePageMeta.ts";
import { getProject } from "../lib/projects.ts";
import { isRenderable, textOrNull } from "../lib/todo.ts";

/**
 * Page for small-business owners (not recruiters). All copy and delivery
 * times come from src/data/services.ts.
 */

const email = textOrNull(profile.email);

function mailto(subject: string, body = ""): string {
  if (!email) return profile.links.linkedin;
  const params = `subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;
  return `mailto:${email}?${params}`;
}

const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 px-7 py-3 text-base font-semibold transition-[transform,box-shadow,background-color,color] motion-reduce:transition-none";
const buttonStyles = {
  primary: `${buttonBase} bg-accent-fill text-on-accent border-accent-fill shadow-[0_8px_24px_-8px_var(--color-accent)] hover:-translate-y-0.5`,
  secondary: `${buttonBase} border-fg text-fg hover:bg-fg hover:text-bg`,
};

export default function Services() {
  usePageMeta(services.meta);

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Hero />
        <ServicesList />
        <Projects />
        <HowItWorks />
        <Faq />
        <FinalCta />
      </div>
      <StickyCta />
    </>
  );
}

function Hero() {
  const { hero } = services;
  return (
    <section
      id="services-hero"
      aria-labelledby="services-hero-heading"
      className="grid items-center gap-14 pt-10 pb-20 sm:pt-20 sm:pb-28 lg:grid-cols-2 lg:gap-14"
    >
      <div>
        <p className="border-rule bg-surface inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium">
          <span className="bg-accent size-2 rounded-full" aria-hidden="true" />
          {hero.eyebrow}
        </p>
        <h1
          id="services-hero-heading"
          className="mt-6 text-4xl leading-[1.08] font-semibold sm:text-5xl xl:text-[3.5rem]"
        >
          {hero.headline}
        </h1>
        <p className="text-muted mt-6 max-w-xl text-lg leading-relaxed sm:text-xl">{hero.sub}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#contact" className={buttonStyles.primary}>
            {hero.primaryCta} →
          </a>
          <a href="#services" className={buttonStyles.secondary}>
            {hero.secondaryCta}
          </a>
        </div>
        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          {hero.trust.map((point) => (
            <li key={point} className="flex items-center gap-2 text-base font-medium">
              <span className="bg-accent-fill text-on-accent grid size-6 place-items-center rounded-full">
                <CheckIcon width={14} height={14} />
              </span>
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

/** Roomy, centred section heading: small label, big title, one-line intro. */
function Block({ id, label, title, intro, children }: BlockProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="py-20 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-accent-text text-sm font-semibold tracking-wider uppercase">{label}</p>
        <h2 id={`${id}-heading`} className="mt-3 text-3xl font-semibold sm:text-5xl">
          {title}
        </h2>
        {intro && <p className="text-muted mt-4 text-lg sm:text-xl">{intro}</p>}
      </div>
      <div className="reveal mt-12 sm:mt-16">{children}</div>
    </section>
  );
}

function ServicesList() {
  const s = services.servicesSection;
  return (
    <Block id="services" label={s.label} title={s.title} intro={s.intro}>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {s.items.map((item) => (
          <li key={item.id}>
            <ServiceCard service={item} />
          </li>
        ))}
        <li>
          <UnsureCard />
        </li>
      </ul>
    </Block>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const s = services.servicesSection;
  return (
    <article className="border-rule bg-surface hover:border-fg flex h-full flex-col rounded-3xl border p-7 transition-colors motion-reduce:transition-none">
      <div className="flex items-center gap-3">
        <span className="bg-bg text-accent-text grid size-12 place-items-center rounded-2xl">
          <ServiceIcon name={service.icon} />
        </span>
        <p className="text-muted text-sm font-semibold tracking-wider uppercase">{service.name}</p>
      </div>

      <h3 className="mt-6 text-2xl leading-snug font-semibold">{service.title}</h3>
      <p className="text-muted mt-2 text-base">{service.forWho}</p>

      <ul className="border-rule mt-6 space-y-2.5 border-t pt-6">
        {service.includes.map((point) => (
          <li key={point} className="flex gap-2.5 text-base">
            <CheckIcon width={18} height={18} className="text-accent-text mt-0.5 shrink-0" />
            {point}
          </li>
        ))}
      </ul>

      <p className="text-muted mt-auto mb-5 flex items-center gap-2 pt-8 text-sm">
        <span className="bg-accent size-2 rounded-full" aria-hidden="true" />
        {s.deliveryLabel} <span className="text-fg font-semibold">{service.delivery}</span>
      </p>

      <a
        href={mailto(service.title)}
        className={`${buttonStyles.secondary} w-full`}
        aria-label={`${service.cta}: email me about “${service.title}”`}
      >
        {service.cta}
      </a>
    </article>
  );
}

/** Filled card for visitors who aren't sure yet: points them to the free check. */
function UnsureCard() {
  const u = services.servicesSection.unsure;
  return (
    <article className="bg-accent-fill text-on-accent flex h-full flex-col justify-center rounded-3xl p-8">
      <h3 className="text-3xl leading-tight font-semibold">{u.title}</h3>
      <p className="mt-3 text-lg">{u.body}</p>
      <a
        href="#contact"
        className={`${buttonBase} bg-bg text-fg border-bg mt-8 hover:-translate-y-0.5`}
      >
        {u.cta} →
      </a>
    </article>
  );
}

function Projects() {
  const s = services.projectsSection;
  return (
    <Block id="projects" label={s.label} title={s.title} intro={s.intro}>
      <ul className="space-y-8">
        {s.items.map((item, i) => (
          <li key={item.slug}>
            <ShowcaseCard project={item} flip={i % 2 === 1} />
          </li>
        ))}
      </ul>
    </Block>
  );
}

function ShowcaseCard({ project, flip }: { project: ShowcaseProject; flip: boolean }) {
  const caseStudy = getProject(project.slug);
  const live = caseStudy?.links.live;
  const s = services.projectsSection;

  return (
    <article className="border-rule bg-surface grid items-center gap-8 overflow-hidden rounded-3xl border p-6 sm:p-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
      <div className={flip ? "lg:order-2" : undefined}>
        <DeviceMockup shots={project.shots} />
      </div>
      <div>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h3 className="text-3xl font-semibold sm:text-4xl">{project.name}</h3>
          <span className="border-rule text-muted rounded-full border px-3 py-0.5 text-sm">
            {project.credit}
          </span>
        </div>
        <TodoText value={project.summary} as="p" className="mt-4 text-lg leading-relaxed" />
        {isRenderable(project.forYou) && (
          <div className="bg-bg mt-6 rounded-2xl p-5">
            <p className="text-accent-text text-sm font-semibold tracking-wider uppercase">
              {s.forYouLabel}
            </p>
            <p className="mt-1 text-lg font-medium">
              <TodoText value={project.forYou} />
            </p>
          </div>
        )}
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
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
              {s.linkLabel} <span className="sr-only">about {project.name}</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

function HowItWorks() {
  const s = services.howItWorks;
  return (
    <Block id="how-it-works" label={s.label} title={s.title}>
      <ol className="relative grid gap-10 md:grid-cols-3 md:gap-6">
        {/* Dotted line joining the step numbers on wide screens */}
        <span
          aria-hidden="true"
          className="border-rule absolute top-7 right-[16%] left-[16%] hidden border-t-2 border-dashed md:block"
        />
        {s.steps.map((step, i) => (
          <li key={step.title} className="relative text-center">
            <span
              aria-hidden="true"
              className="bg-accent-fill text-on-accent font-display ring-bg mx-auto grid size-14 place-items-center rounded-full text-2xl font-semibold ring-8"
            >
              {i + 1}
            </span>
            <h3 className="mt-5 text-2xl font-semibold">{step.title}</h3>
            <p className="text-muted mx-auto mt-2 max-w-xs text-lg">{step.body}</p>
          </li>
        ))}
      </ol>
    </Block>
  );
}

function Faq() {
  const s = services.faq;
  return (
    <Block id="faq" label={s.label} title={s.title}>
      <ul className="mx-auto max-w-3xl space-y-3">
        {s.items
          .filter((item) => isRenderable(item.a))
          .map((item) => (
            <li key={item.q}>
              <details className="group border-rule bg-surface rounded-2xl border px-6">
                <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="bg-bg text-accent-text grid size-9 shrink-0 place-items-center rounded-full text-2xl leading-none transition-transform group-open:rotate-45 motion-reduce:transition-none"
                  >
                    +
                  </span>
                </summary>
                <div className="text-muted pb-5 text-lg leading-relaxed">
                  <TodoText value={item.a} />
                </div>
              </details>
            </li>
          ))}
      </ul>
    </Block>
  );
}

function FinalCta() {
  const c = services.contact;
  const whatsapp = textOrNull(c.whatsapp);
  const onAccentButton = `${buttonBase} border-on-accent text-on-accent hover:bg-on-accent hover:text-accent-fill`;
  return (
    <section id="contact" aria-labelledby="contact-heading" className="pt-4 pb-4">
      <div className="bg-accent-fill text-on-accent rounded-[2rem] px-6 py-16 text-center sm:px-14 sm:py-24">
        <h2 id="contact-heading" className="mx-auto max-w-3xl text-3xl font-semibold sm:text-5xl">
          {c.title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg sm:text-xl">{c.body}</p>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={mailto(c.emailSubject, c.emailBody)}
            className={`${buttonBase} bg-bg text-fg border-bg hover:-translate-y-0.5`}
          >
            <MailIcon />
            {c.primaryCta}
          </a>
          {whatsapp && (
            <a href={whatsapp} rel="noopener" className={onAccentButton}>
              {c.whatsappCta}
            </a>
          )}
          <a href={profile.links.linkedin} rel="me noopener" className={onAccentButton}>
            <LinkedInIcon />
            {c.linkedinCta}
          </a>
        </div>
        {email && (
          <p className="mt-6 text-base [overflow-wrap:anywhere]">
            {c.orWriteTo}{" "}
            <a href={`mailto:${email}`} className="font-semibold underline underline-offset-4">
              {email}
            </a>
          </p>
        )}
        {!whatsapp && (
          <div className="bg-bg mx-auto mt-4 w-fit max-w-full rounded-lg">
            <TodoText value={c.whatsapp} />
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Phones only: a "free site check" button pinned to the bottom of the screen once
 * the hero has scrolled away, hidden again when the contact section is on screen.
 */
function StickyCta() {
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
    <div className="border-rule bg-bg/95 fixed inset-x-0 bottom-0 z-30 border-t px-4 py-3 backdrop-blur sm:hidden">
      <a href="#contact" className={`${buttonStyles.primary} w-full`}>
        {services.stickyCta} →
      </a>
    </div>
  );
}
