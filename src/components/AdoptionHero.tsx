import Reveal from "./Reveal";
import { Sparkles, PawPrint } from "lucide-react";
import { CtaButton } from "@/components/ui/CtaButton";
import type {
  AdoptionHeroData,
  AdoptionMatchingCta,
} from "@/types/strapi";

interface AdoptionHeroProps {
  count: number;
  hero: AdoptionHeroData;
  matchingCta: AdoptionMatchingCta | null;
}

export default function AdoptionHero({
  count,
  hero,
  matchingCta,
}: AdoptionHeroProps) {
  return (
    <section
      aria-labelledby="adoption-hero-titre"
      className="relative isolate overflow-hidden bg-bg"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(194,24,91,0.16),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(123,31,162,0.14),transparent_60%)]"
      />
      <svg
        aria-hidden="true"
        className="absolute -right-24 -top-20 -z-10 hidden h-[480px] w-[480px] text-primary-50 opacity-70 md:block"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M65 25c-13 0-24 11-24 24s11 24 24 24 24-11 24-24-11-24-24-24Zm70 0c-13 0-24 11-24 24s11 24 24 24 24-11 24-24-11-24-24-24ZM30 95c-12 0-22 10-22 22s10 22 22 22 22-10 22-22-10-22-22-22Zm140 0c-12 0-22 10-22 22s10 22 22 22 22-10 22-22-10-22-22-22ZM100 105c-22 0-50 26-50 52 0 18 14 28 31 28 8 0 13-3 19-3s11 3 19 3c17 0 31-10 31-28 0-26-28-52-50-52Z" />
      </svg>

      <div className="mx-auto max-w-7xl px-5 pb-12 pt-24 md:px-8 md:pb-16 md:pt-32">
        <div className="grid items-end gap-10 md:mt-2 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur-sm md:text-sm">
              <PawPrint className="h-3.5 w-3.5" aria-hidden="true" />
              {count} chat{count > 1 ? "s" : ""} disponible
              {count > 1 ? "s" : ""}
            </span>
            <h1
              id="adoption-hero-titre"
              className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-tight text-text md:text-6xl lg:text-7xl"
            >
              {hero.titreDebut}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                  {hero.titreHighlight}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 right-0 -z-0 h-3 -skew-x-6 rounded-sm bg-primary-50/80"
                />
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary md:text-xl">
              {hero.sousTitre}
            </p>
          </Reveal>

          {matchingCta ? (
            <Reveal delay={150}>
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-secondary/30 via-primary-accent/20 to-primary/30 blur-2xl"
                />
                <article className="group relative block overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-secondary via-primary to-primary-vif p-7 text-white shadow-2xl shadow-secondary/20 md:p-8">
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
                  <h2 className="relative mt-4 font-display text-2xl font-bold leading-tight md:text-3xl">
                    {matchingCta.titre}
                  </h2>
                  <p className="relative mt-2 text-sm leading-relaxed text-white/85 md:text-base">
                    {matchingCta.description}
                  </p>
                  <div className="relative mt-5">
                    <CtaButton cta={matchingCta.cta} />
                  </div>
                </article>
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
