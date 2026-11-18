import { todo } from "../lib/todo.ts";
import { heroShots, projectShots } from "./services-media.ts";
import type { ServicesCopy } from "./services.ts";

/**
 * French copy for /fr/services. Same shape as the English copy in services.ts.
 * Uses "vous" and a no-break space before ? : ! » (French typography).
 */
export const fr: ServicesCopy = {
  meta: {
    title: "Sites web pour petites entreprises · Bilel Jabrane",
    description:
      "Des sites web rapides et modernes pour les petites entreprises : sites d’une page, réparations rapides, vitesse et visibilité sur Google, mise en ligne. Recevez une analyse gratuite de votre site.",
  },
  languageLabel: "Langue",

  hero: {
    eyebrow: "Sites web pour petites entreprises",
    headline: "Des sites web qui vous apportent plus de clients.",
    sub: "Je crée des sites rapides et modernes pour les petites entreprises. Envoyez-moi votre lien et je vous montre, gratuitement, ce qui vous fait perdre des clients.",
    trust: [
      "Analyse gratuite de votre site",
      "Un devis clair avant de commencer",
      "Moitié au début, moitié à la fin",
    ],
    primaryCta: "Analyse gratuite de mon site",
    secondaryCta: "Voir les services",
    shots: {
      ...heroShots,
      alt: "Trois sites que j’ai créés : un rapport d’analyse de site sur un ordinateur portable, un fil de communauté sur une tablette et un site d’apprentissage en arabe sur un téléphone",
    },
  },

  servicesSection: {
    label: "Services",
    title: "Choisissez ce qu’il faut à votre entreprise",
    intro: "Dites-moi ce dont vous avez besoin. Vous recevez un devis clair avant tout travail.",
    items: [
      {
        id: "quick-fix",
        icon: "wrench",
        name: "Réparation rapide",
        title: "Votre site en panne, de nouveau en marche",
        forWho: "Une page, un formulaire ou une mise en ligne qui bloque.",
        includes: [
          "Problème trouvé et réparé",
          "Vérifié sur téléphone et ordinateur",
          "Une courte note sur la réparation",
        ],
      },
      {
        id: "landing-page",
        icon: "page",
        name: "Site d’une page",
        title: "Un site qui transforme les visiteurs en clients",
        forWho: "Pour une nouvelle entreprise, un produit ou une offre.",
        includes: [
          "Impeccable sur tous les téléphones",
          "Boutons pour appeler, écrire ou réserver",
          "Prêt pour Google",
        ],
      },
      {
        id: "speed-seo",
        icon: "speed",
        name: "Vitesse et Google",
        title: "Des pages plus rapides, plus faciles à trouver sur Google",
        forWho: "À partir de l’analyse gratuite de votre site.",
        includes: [
          "Chargement plus rapide sur téléphone",
          "Meilleurs résultats sur Google",
          "Comparaison avant / après",
        ],
      },
      {
        id: "launch",
        icon: "globe",
        name: "Installation et mise en ligne",
        title: "En ligne, sécurisé et à votre propre adresse",
        forWho: "Votre site est prêt, mais pas encore en ligne.",
        includes: [
          "Votre propre adresse (nom de domaine)",
          "Le cadenas du navigateur (SSL)",
          "Un hébergement qui vous garde en ligne",
        ],
      },
      {
        id: "custom",
        icon: "puzzle",
        name: "Fonction sur mesure",
        title: "Un outil pensé pour votre façon de travailler",
        forWho: "Réservation en ligne, espace client, bon de commande…",
        includes: [
          "On en parle d’abord",
          "Un prix fixe avant de commencer",
          "Des nouvelles à chaque étape",
        ],
      },
    ],
    unsure: {
      title: "Vous ne savez pas ce qu’il vous faut ?",
      body: "Commencez par une analyse gratuite de votre site. Je vous dirai quoi corriger en premier.",
      cta: "Analyse gratuite de mon site",
    },
  },

  projectsSection: {
    label: "Mes réalisations",
    title: "Les projets que j’ai créés",
    intro: "Mes propres projets, pas des commandes de clients. Votre site recevra le même soin.",
    forYouLabel: "Pour votre entreprise",
    linkLabel: "Détails techniques (en anglais)",
    liveLabel: "Voir le site",
    items: [
      {
        slug: "oneplace",
        name: "OnePlace",
        credit: "Créé avec un associé",
        summary:
          "Une plateforme d’adhésion où les membres paient, s’inscrivent, suivent des cours et échangent entre eux, au même endroit.",
        forYou: "Vendez des abonnements ou des cours sans jongler entre cinq applications.",
        shots: {
          ...projectShots.oneplace,
          alt: "Fil de la communauté OnePlace avec des publications de membres, le nombre de membres et un classement par points, sur un ordinateur portable, une tablette et un téléphone",
        },
      },
      {
        slug: "loupe",
        name: "Loupe",
        credit: "Créé seul",
        summary:
          "Un outil gratuit qui note n’importe quel site et explique chaque problème simplement, en anglais, en français ou en arabe.",
        forYou: "Le même regard que pour l’analyse gratuite de votre site, sans jargon.",
        shots: {
          ...projectShots.loupe,
          alt: "Exemple de rapport Loupe pour le site d’une boulangerie, avec la note B et un score global de 86 sur 100, sur un ordinateur portable, une tablette et un téléphone",
        },
      },
      {
        slug: "tamreenlab",
        name: "TamreenLab",
        credit: "Créé seul",
        summary:
          "Un site pour s’entraîner sur Excel en arabe, en anglais et en français, avec une correction immédiate de chaque réponse.",
        forYou: "Accueillez chaque client dans sa langue, arabe compris.",
        shots: {
          ...projectShots.tamreenlab,
          alt: "Page d’accueil de TamreenLab en arabe, intitulée « Apprendre Excel par la pratique », avec un petit tableau d’exercice qui additionne une colonne, sur un ordinateur portable, une tablette et un téléphone",
        },
      },
    ],
  },

  howItWorks: {
    label: "Comment ça marche",
    title: "Trois étapes simples",
    steps: [
      { title: "Écrivez-moi", body: "Dites-moi ce dont vous avez besoin. Un lien aide." },
      {
        title: "Recevez un devis clair",
        body: "Prix et date par écrit. 50 % pour commencer.",
      },
      { title: "Recevez votre site", body: "Demandez des modifications, puis réglez le reste." },
    ],
  },

  faq: {
    label: "Questions",
    title: "Bon à savoir",
    items: [
      {
        q: "Dois-je tout payer à l’avance ?",
        a: "Non. 50 % pour commencer, 50 % quand le résultat vous plaît.",
      },
      {
        q: "Et si je veux des modifications ?",
        a: "Deux séries de modifications sont incluses. Toute nouvelle demande reçoit d’abord son propre devis.",
      },
      {
        q: "Comment puis-je payer ?",
        a: todo("Write in French the payment methods you accept (same as the English answer)"),
      },
      {
        q: "Combien de temps ça prend ?",
        a: "Une réparation rapide prend 1 à 2 jours, un site d’une page 3 à 5 jours. Votre devis indique toujours une date.",
      },
      {
        q: "Dans quelles langues travaillez-vous ?",
        a: todo(
          "Write in French the languages you speak with clients and build websites in (same as the English answer)",
        ),
      },
    ],
  },

  contact: {
    title: "Prêt à tirer plus de votre site ?",
    body: "Envoyez-moi votre lien. Vous recevrez une analyse gratuite ou un devis clair.",
    primaryCta: "M’écrire par e-mail",
    emailSubject: "Analyse gratuite de mon site",
    emailBody:
      "Bonjour Bilel,\n\nMon entreprise : \nMon site (si j’en ai un) : \nCe dont j’ai besoin : \n",
    linkedinCta: "LinkedIn",
    whatsappCta: "WhatsApp",
    orWriteTo: "Ou écrivez à",
  },

  stickyCta: "Analyse gratuite de mon site",
};
