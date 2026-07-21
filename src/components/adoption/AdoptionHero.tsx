import Image from "next/image";
import { Sparkles } from "lucide-react";
import { CtaButton } from "@/components/ui/CtaButton";
import { cn } from "@/lib/cn";
import { getStrapiMedia } from "@/lib/strapi";
import type { AdoptionHeroData, AdoptionMatchingCta } from "@/types/strapi";

interface AdoptionHeroProps {
  hero: AdoptionHeroData;
  matchingCta: AdoptionMatchingCta | null;
}

export default function AdoptionHero({
  hero,
  matchingCta,
}: AdoptionHeroProps) {
  const imageUrl = (hero.image && getStrapiMedia(hero.image.url)) || "/images/adoption-hero.jpg";
  const imageAlt = hero.image?.alternativeText ?? "Chats à l'adoption — Sans Croquettes Fixes";

  return (
    <section
      aria-labelledby="adoption-hero-titre"
      className="relative isolate overflow-hidden"
    >
      <div className="relative flex w-full flex-col justify-end min-h-[58svh] md:min-h-[62svh] lg:h-[70svh] lg:min-h-[600px] lg:justify-center">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Overlay chaud avec touche magenta — distinct du noir neutre de l'Accueil */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-dark/55 via-dark/45 to-primary/35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark/70"
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-28 md:px-8 md:pb-16 md:pt-32">
          <div className="grid items-end gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center lg:gap-12">
            <div>
              <h1
                id="adoption-hero-titre"
                className="font-display text-4xl font-bold leading-[1.05] text-white md:text-6xl lg:text-7xl"
              >
                {hero.titreDebut}{" "}
                <span className="text-secondary-lighter">
                  {hero.titreHighlight}
                </span>
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:mt-6 md:text-lg">
                {hero.sousTitre}
              </p>
            </div>

            {matchingCta ? (
              <article className="relative mt-8 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-secondary via-primary to-primary-vif p-7 text-white shadow-2xl shadow-secondary/30 md:mt-0 md:p-8">
                <svg
                  aria-hidden="true"
                  className="absolute -right-6 -top-6 h-40 w-40 text-white/10"
                  viewBox="0 0 200 200"
                  fill="currentColor"
                >
                  <path d="M65 25c-13 0-24 11-24 24s11 24 24 24 24-11 24-24-11-24-24-24Zm70 0c-13 0-24 11-24 24s11 24 24 24 24-11 24-24-11-24-24-24ZM30 95c-12 0-22 10-22 22s10 22 22 22 22-10 22-22-10-22-22-22Zm140 0c-12 0-22 10-22 22s10 22 22 22 22-10 22-22-10-22-22-22Z" />
                </svg>
                {matchingCta.badge ? (
                  <span className="relative inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                    {matchingCta.badge}
                  </span>
                ) : null}
                <h2
                  className={cn(
                    "relative font-display text-2xl font-bold leading-tight md:text-3xl",
                    matchingCta.badge && "mt-4",
                  )}
                >
                  {matchingCta.titre}
                </h2>
                <p className="relative mt-2 text-sm leading-relaxed text-white/85 md:text-base">
                  {matchingCta.description}
                </p>
                <div className="relative mt-5">
                  <CtaButton cta={matchingCta.cta} variant="white" />
                </div>
              </article>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
