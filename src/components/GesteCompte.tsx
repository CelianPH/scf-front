import Link from "next/link";
import { Heart, HandHeart, Home, ArrowRight, type LucideIcon } from "lucide-react";
import Reveal from "./Reveal";

type Action = {
  titre: string;
  description: string;
  href: string;
  cta: string;
  icon: LucideIcon;
};

const actions: Action[] = [
  {
    titre: "Faire un don",
    description:
      "Soutenez nos actions financièrement : croquettes, soins vétérinaires, stérilisations.",
    href: "/don",
    cta: "Je donne",
    icon: Heart,
  },
  {
    titre: "Devenir bénévole",
    description:
      "Rejoignez notre équipe de passionnés pour le terrain, le transport ou la communication.",
    href: "/benevolat",
    cta: "Je m'engage",
    icon: HandHeart,
  },
  {
    titre: "Famille d'accueil",
    description:
      "Accueillez un chat le temps qu'il trouve sa famille. Frais vétérinaires pris en charge, formation et accompagnement assurés.",
    href: "https://forms.gle/kYtMxivHMq5L98ym8",
    cta: "Remplir le formulaire",
    icon: Home,
  },
];

export default function GesteCompte() {
  return (
    <section aria-labelledby="geste-titre" className="bg-bg-alt">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            id="geste-titre"
            className="font-display text-3xl font-bold text-text md:text-4xl lg:text-5xl"
          >
            Chaque geste compte
          </h2>
          <p className="mt-3 text-base text-text-secondary md:mt-4 md:text-lg">
            Plusieurs façons de nous aider, à votre rythme et selon vos moyens.
          </p>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-3">
          {actions.map(({ titre, description, href, cta, icon: Icon }, i) => {
            const isExternal = href.startsWith("http");
            const linkClass =
              "mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition group-hover:gap-2.5 hover:text-primary-dark";
            return (
              <Reveal as="li" key={titre} delay={i * 100}>
                <article className="group flex h-full flex-col rounded-lg border border-border bg-surface p-6 shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 md:p-8">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary-50 text-primary transition group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-text md:text-2xl">
                    {titre}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary md:text-base">
                    {description}
                  </p>
                  {isExternal ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      {cta}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link href={href} className={linkClass}>
                      {cta}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  )}
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
