import About from "../components/home/About.tsx";
import Contact from "../components/home/Contact.tsx";
import Hero from "../components/home/Hero.tsx";
import Skills from "../components/home/Skills.tsx";
import Work from "../components/home/Work.tsx";
import { profile } from "../data/profile.ts";
import { usePageMeta } from "../hooks/usePageMeta.ts";

export default function Home() {
  usePageMeta({
    title: `${profile.name} · ${profile.role}`,
    description: `${profile.name} is a ${profile.role.toLowerCase()} from ${profile.location}, building with React, Node, TypeScript and PostgreSQL.${profile.openToRemote ? " Open to remote work." : ""}`,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <Hero />
      <Work />
      <Skills />
      <About />
      <Contact />
    </div>
  );
}
