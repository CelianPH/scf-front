import Reveal from "./Reveal";
import { Icon } from "./Icon";
import { CtaButton } from "@/components/ui/CtaButton";
import type { DonCampagnesBlock } from "@/types/strapi";

interface DonCampagnesProps {
  data: DonCampagnesBlock;
}

function progressionOf(c: {
  collecteEUR: number | null;
  objectifEUR: number;
  progressionPct: number | null;
}) {
  if (c.progressionPct != null)
    return Math.min(100, Math.max(0, c.progressionPct));
  if (!c.objectifEUR) return 0;
  return Math.min(
    100,
    Math.max(0, Math.round(((c.collecteEUR ?? 0) / c.objectifEUR) * 100))
  );
}

function eur(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function DonCampagnes({ data }: DonCampagnesProps) {
  const actives = data.campagnes.filter((c) => c.actif);
  if (actives.length === 0) return null;

  return (
    <section
      aria-labelledby="don-campagnes-titre"
      className="bg-bg-alt"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            <Icon name="Sparkles" className="h-3.5 w-3.5" aria-hidden="true" />
            Projets en cours
          </span>
          <h2
            id="don-campagnes-titre"
            className="mt-4 font-display text-3xl font-bold text-text md:text-5xl"
          >
            {data.titre}
          </h2>
          {data.intro ? (
            <p className="mx-auto mt-4 max-w-xl text-base text-text-secondary md:text-lg">
              {data.intro}
            </p>
          ) : null}
        </Reveal>

        <ul
          className={`mx-auto mt-12 grid gap-7 ${
            actives.length === 1
              ? "max-w-3xl grid-cols-1"
              : "grid-cols-1 lg:grid-cols-2"
          }`}
        >
          {actives.map((c, i) => {
            const progression = progressionOf(c);
            const collecte = c.collecteEUR ?? Math.round((c.objectifEUR * progression) / 100);
            const restant = Math.max(0, c.objectifEUR - collecte);
            return (
              <Reveal as="li" key={c.id} delay={i * 120}>
                <article className="group relative overflow-hidden rounded-3xl bg-surface shadow-xl shadow-primary/5 ring-1 ring-border">
                  <div className="relative h-44 overflow-hidden bg-gradient-to-br from-secondary via-primary to-primary-vif md:h-52">
                    <svg
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full text-white/15"
                      viewBox="0 0 400 200"
                      preserveAspectRatio="none"
                    >
                      <circle cx="80" cy="60" r="40" fill="currentColor" />
                      <circle cx="220" cy="140" r="60" fill="currentColor" />
                      <circle cx="340" cy="50" r="30" fill="currentColor" />
                    </svg>
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
                    <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm backdrop-blur">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-60 motion-reduce:hidden" />
                        <span className="relative h-2 w-2 rounded-full bg-primary" />
                      </span>
                      Campagne active
                    </div>
                    <div className="absolute bottom-5 left-6 right-6">
                      <h3 className="font-display text-2xl font-bold leading-tight text-white drop-shadow md:text-3xl">
                        {c.titre}
                      </h3>
                    </div>
                  </div>

                  <div className="p-7 md:p-8">
                    {c.description ? (
                      <p className="text-sm text-text-secondary md:text-base">
                        {c.description}
                      </p>
                    ) : null}

                    <div className="mt-6">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-3xl font-bold text-text md:text-4xl">
                          {progression}%
                        </span>
                        <span className="text-sm font-medium text-text-secondary">
                          {eur(collecte)} <span className="text-text-muted">/ {eur(c.objectifEUR)}</span>
                        </span>
                      </div>
                      <div
                        className="relative mt-3 h-3 w-full overflow-hidden rounded-full bg-bg-alt ring-1 ring-border"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={progression}
                        aria-label={`Progression de la collecte ${c.titre}`}
                      >
                        <div
                          className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-secondary via-primary to-primary-vif transition-[width] duration-700 ease-out"
                          style={{ width: `${progression}%` }}
                        >
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.4)_50%,transparent_60%)] motion-reduce:hidden"
                            style={{
                              animation: "shimmer 2.4s linear infinite",
                              backgroundSize: "200% 100%",
                            }}
                          />
                        </div>
                      </div>
                      {restant > 0 ? (
                        <p className="mt-3 text-xs text-text-secondary md:text-sm">
                          Il manque encore{" "}
                          <span className="font-bold text-primary">
                            {eur(restant)}
                          </span>{" "}
                          pour atteindre l'objectif.
                        </p>
                      ) : null}
                    </div>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      <CtaButton cta={c.ctaContribuer} />
                      <CtaButton cta={c.ctaDetails} />
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>

      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
    </section>
  );
}
