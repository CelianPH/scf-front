import Reveal from "./Reveal";
import { Icon } from "./Icon";
import { CtaButton } from "@/components/ui/CtaButton";
import type { DonHero as DonHeroData } from "@/types/strapi";

interface DonHeroProps {
  data: DonHeroData;
}

const TRUST_BADGES = [
  { iconName: "PawPrint" as const, label: "100 % bénévole" },
  { iconName: "ShieldCheck" as const, label: "Loi 1901 · intérêt général" },
  { iconName: "Receipt" as const, label: "66 % déductible" },
];

export default function DonHero({ data }: DonHeroProps) {
  return (
    <section
      aria-labelledby="don-hero-titre"
      className="relative isolate overflow-hidden bg-bg"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(194,24,91,0.18),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(123,31,162,0.16),transparent_60%)]"
      />
      <svg
        aria-hidden="true"
        className="absolute -right-32 top-12 -z-10 hidden h-[520px] w-[520px] text-primary-50 opacity-60 md:block"
        viewBox="0 0 200 200"
        fill="currentColor"
      >
        <path d="M65 25c-13 0-24 11-24 24s11 24 24 24 24-11 24-24-11-24-24-24Zm70 0c-13 0-24 11-24 24s11 24 24 24 24-11 24-24-11-24-24-24ZM30 95c-12 0-22 10-22 22s10 22 22 22 22-10 22-22-10-22-22-22Zm140 0c-12 0-22 10-22 22s10 22 22 22 22-10 22-22-10-22-22-22ZM100 105c-22 0-50 26-50 52 0 18 14 28 31 28 8 0 13-3 19-3s11 3 19 3c17 0 31-10 31-28 0-26-28-52-50-52Z" />
      </svg>

      <div className="mx-auto max-w-7xl px-5 pb-16 pt-24 md:px-8 md:pb-24 md:pt-32">
        <Reveal>
          <nav
            aria-label="Fil d'Ariane"
            className="text-xs font-medium text-text-secondary md:text-sm"
          >
            <a href="/" className="transition-colors hover:text-primary">
              Accueil
            </a>
            <span aria-hidden="true" className="mx-2 text-text-muted">
              /
            </span>
            <span className="text-text">Faire un don</span>
          </nav>
        </Reveal>

        <div className="mt-8 grid items-end gap-10 md:mt-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur-sm md:text-sm">
              <Icon name="Heart" className="h-3.5 w-3.5" aria-hidden="true" />
              Soutenir l'association
            </span>
            <h1
              id="don-hero-titre"
              className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-tight text-text md:text-6xl lg:text-7xl"
            >
              {data.titre.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                  {data.titre.split(" ").slice(-1)}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 right-0 -z-0 h-3 -skew-x-6 rounded-sm bg-primary-50/80"
                />
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary md:text-xl">
              {data.sousTitre}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2 md:gap-3">
              {TRUST_BADGES.map((b) => (
                <li
                  key={b.label}
                  className="inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-xs font-medium text-text shadow-sm ring-1 ring-border md:text-sm"
                >
                  <Icon
                    name={b.iconName}
                    className="h-4 w-4 text-primary"
                    aria-hidden="true"
                  />
                  {b.label}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CtaButton cta={data.ctaPrimary} />
              <CtaButton cta={data.ctaSecondary} />
            </div>

            {data.mention ? (
              <p className="mt-5 text-xs text-text-muted md:text-sm">
                {data.mention}
              </p>
            ) : null}
          </Reveal>

          <Reveal delay={150} className="hidden lg:block">
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-2 rounded-[2.5rem] bg-gradient-to-br from-primary/30 via-primary-accent/20 to-secondary/30 blur-2xl"
              />
              <article className="relative overflow-hidden rounded-[2rem] bg-surface p-8 shadow-2xl shadow-primary/10 ring-1 ring-border">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Impact concret
                </span>
                <p className="mt-3 font-display text-4xl font-bold leading-tight text-text">
                  20 €
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  = une semaine de nourriture et de soins de base pour un chat
                  pris en charge.
                </p>
                <div className="my-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
                      <Icon name="Stethoscope" className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="font-semibold text-text">50 €</span>{" "}
                      financent une stérilisation
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
                      <Icon name="Package" className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="font-semibold text-text">100 €</span>{" "}
                      couvrent un trappage + soins post-op
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
                      <Icon name="HandHeart" className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="font-semibold text-text">10 €/mois</span>{" "}
                      nourrissent 5 chats chaque semaine
                    </span>
                  </li>
                </ul>
                <a
                  href="#widget-don"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-[gap] duration-200 hover:gap-2.5"
                >
                  Choisir mon montant
                  <Icon name="ArrowRight" className="h-4 w-4" aria-hidden="true" />
                </a>
              </article>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
