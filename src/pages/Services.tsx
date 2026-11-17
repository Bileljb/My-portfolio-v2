import type { ReactNode } from "react";
import { Link } from "react-router";
import DeviceMockup from "../components/services/DeviceMockup.tsx";
import { CheckIcon, LinkedInIcon, MailIcon } from "../components/ui/icons.tsx";
import TodoText from "../components/ui/TodoText.tsx";
import { profile } from "../data/profile.ts";
import { services, type Service, type ShowcaseProject } from "../data/services.ts";
import { usePageMeta } from "../hooks/usePageMeta.ts";
import { getProject } from "../lib/projects.ts";
import { isRenderable, textOrNull } from "../lib/todo.ts";

/**
 * Page for small-business owners (not recruiters). All copy, prices and delivery
 * times come from src/data/services.ts.
 */

const email = textOrNull(profile.email);

function mailto(subject: string, body = ""): string {
  if (!email) return profile.links.linkedin;
  const params = `subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ""}`;
  return `mailto:${email}?${params}`;
}

const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 px-6 py-3 text-base font-semibold transition-[transform,box-shadow,background-color,color] motion-reduce:transition-none";
const buttonStyles = {
  primary: `${buttonBase} bg-accent-fill text-on-accent border-accent-fill shadow-[4px_4px_0_0_var(--color-fg)] hover:translate-x-px hover:translate-y-px hover:shadow-[3px_3px_0_0_var(--color-fg)]`,
  secondary: `${buttonBase} border-fg text-fg hover:bg-fg hover:text-bg`,
};

export default function Services() {
  usePageMeta(services.meta);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <Hero />
      <ServicesList />
      <Projects />
      <HowItWorks />
      <Faq />
      <FinalCta />
    </div>
  );
}

function Hero() {
  const { hero } = services;
  return (
    <section aria-labelledby="services-hero-heading" className="pt-12 pb-20 sm:pt-24 sm:pb-28">
      <p className="text-accent-text text-base font-semibold sm:text-lg">{hero.eyebrow}</p>
      <h1
        id="services-hero-heading"
        className="mt-5 max-w-4xl text-4xl leading-[1.08] font-semibold sm:text-6xl"
      >
        {hero.headline}
      </h1>
      <p className="text-muted mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">{hero.sub}</p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <a href="#contact" className={buttonStyles.primary}>
          {hero.primaryCta} →
        </a>
        <a href="#services" className={buttonStyles.secondary}>
          {hero.secondaryCta}
        </a>
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

/** Plain, roomy section: small label, big heading, optional intro. */
function Block({ id, label, title, intro, children }: BlockProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="border-rule border-t py-20 sm:py-28"
    >
      <p className="text-accent-text text-sm font-semibold tracking-wider uppercase">{label}</p>
      <h2 id={`${id}-heading`} className="mt-3 max-w-3xl text-3xl font-semibold sm:text-5xl">
        {title}
      </h2>
      {intro && (
        <p className="text-muted mt-5 max-w-2xl text-lg leading-relaxed sm:text-xl">{intro}</p>
      )}
      <div className="reveal mt-12 sm:mt-16">{children}</div>
    </section>
  );
}

function ServicesList() {
  const s = services.servicesSection;
  return (
    <Block id="services" label={s.label} title={s.title} intro={s.intro}>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {s.items.map((item) => (
          <li key={item.id}>
            <ServiceCard service={item} />
          </li>
        ))}
      </ul>
    </Block>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const s = services.servicesSection;
  return (
    <article className="border-rule bg-surface flex h-full flex-col rounded-2xl border p-6 sm:p-8">
      <h3 className="text-2xl leading-snug font-semibold">{service.title}</h3>
      <p className="text-muted mt-3 text-base leading-relaxed sm:text-lg">{service.forWho}</p>

      <ul className="mt-6 mb-8 space-y-3">
        {service.includes.map((point) => (
          <li key={point} className="flex gap-3 text-base leading-relaxed">
            <CheckIcon className="text-accent-text mt-0.5 shrink-0" />
            {point}
          </li>
        ))}
      </ul>

      <div className="border-rule mt-auto border-t pt-6">
        <dl className="mt-2 grid grid-cols-[1fr_auto] items-end gap-4">
          <div>
            <dt className="text-muted text-sm">{s.deliveryLabel}</dt>
            <dd className="font-medium">{service.delivery}</dd>
          </div>
          <div className="text-right">
            <dt className="text-muted text-sm">{service.quote ? s.quoteLabel : s.priceLabel}</dt>
            <dd>
              <span className="text-muted text-base">{s.fromLabel} </span>
              <span className="font-display text-3xl font-semibold">
                {services.currency}
                {service.priceFrom}
              </span>
            </dd>
          </div>
        </dl>
        <a
          href={mailto(service.title)}
          className={`${buttonStyles.secondary} mt-6 w-full`}
          aria-label={`${service.cta}: email me about “${service.title}”`}
        >
          {service.cta}
        </a>
      </div>
    </article>
  );
}

function Projects() {
  const s = services.projectsSection;
  return (
    <Block id="projects" label={s.label} title={s.title} intro={s.intro}>
      <ul className="space-y-24 sm:space-y-32">
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
  const s = services.projectsSection;
  const parts = [
    [s.problemLabel, project.problem],
    [s.builtLabel, project.built],
    [s.forYouLabel, project.forYou],
  ] as const;

  return (
    <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={flip ? "lg:order-2" : undefined}>
        <DeviceMockup shots={project.shots} />
      </div>
      <div>
        <h3 className="text-3xl font-semibold sm:text-4xl">{project.name}</h3>
        <p className="text-muted mt-2 text-base">{project.credit}</p>
        <dl className="mt-8 space-y-6">
          {parts.map(([label, text]) =>
            isRenderable(text) ? (
              <div key={label}>
                <dt className="text-accent-text text-sm font-semibold tracking-wider uppercase">
                  {label}
                </dt>
                <dd className="mt-2 text-lg leading-relaxed">
                  <TodoText value={text} />
                </dd>
              </div>
            ) : null,
          )}
        </dl>
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
          {caseStudy && (
            <Link
              to={`/projects/${project.slug}`}
              className="text-accent-text hover:text-fg inline-flex min-h-11 items-center text-base font-semibold underline underline-offset-4"
            >
              {s.linkLabel} <span className="sr-only">about {project.name}</span>
              <span aria-hidden="true">&nbsp;→</span>
            </Link>
          )}
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
        </div>
      </div>
    </article>
  );
}

function HowItWorks() {
  const s = services.howItWorks;
  return (
    <Block id="how-it-works" label={s.label} title={s.title}>
      <ol className="grid gap-6 md:grid-cols-3">
        {s.steps.map((step, i) => (
          <li key={step.title} className="border-rule bg-surface rounded-2xl border p-6 sm:p-8">
            <span
              aria-hidden="true"
              className="bg-accent-fill text-on-accent font-display grid size-12 place-items-center rounded-full text-xl font-semibold"
            >
              {i + 1}
            </span>
            <h3 className="mt-6 text-2xl font-semibold">{step.title}</h3>
            <p className="text-muted mt-3 text-lg leading-relaxed">{step.body}</p>
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
      <ul className="border-rule max-w-3xl border-t">
        {s.items
          .filter((item) => isRenderable(item.a))
          .map((item) => (
            <li key={item.q} className="border-rule border-b">
              <details className="group">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold sm:text-xl [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span
                    aria-hidden="true"
                    className="text-accent-text font-display text-2xl leading-none transition-transform group-open:rotate-45 motion-reduce:transition-none"
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
    </Block>
  );
}

function FinalCta() {
  const c = services.contact;
  const whatsapp = textOrNull(c.whatsapp);
  return (
    <section id="contact" aria-labelledby="contact-heading" className="pt-8 pb-4">
      <div className="border-fg bg-surface rounded-3xl border-2 px-6 py-14 sm:px-14 sm:py-20">
        <p className="text-accent-text text-sm font-semibold tracking-wider uppercase">{c.label}</p>
        <h2 id="contact-heading" className="mt-3 max-w-3xl text-3xl font-semibold sm:text-5xl">
          {c.title}
        </h2>
        <p className="text-muted mt-5 max-w-2xl text-lg leading-relaxed sm:text-xl">{c.body}</p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
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
            <a href={`mailto:${email}`} className="text-fg underline underline-offset-4">
              {email}
            </a>
          </p>
        )}
        {!whatsapp && (
          <div className="mt-4">
            <TodoText value={c.whatsapp} />
          </div>
        )}
      </div>
    </section>
  );
}
