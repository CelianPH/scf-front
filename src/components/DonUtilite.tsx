import Reveal from "./Reveal";
import { Icon } from "./Icon";
import type { DonUtiliteBlock } from "@/types/strapi";

interface DonUtiliteProps {
  data: DonUtiliteBlock;
}

/**
 * Bento asymétrique : 1ʳᵉ carte large (col-span-2 sur lg, row-span-2),
 * les suivantes empilées sur la 2e colonne. Tient toujours en grille 1-col
 * sur mobile et 3-col uniforme entre md et lg.
 */
export default function DonUtilite({ data }: DonUtiliteProps) {
  return (
    <section
      aria-labelledby="don-utilite-titre"
      className="relative bg-bg"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-bg-alt to-transparent"
      />
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Icon name="HandHeart" className="h-3.5 w-3.5" aria-hidden="true" />
            Transparence
          </span>
          <h2
            id="don-utilite-titre"
            className="mt-4 font-display text-3xl font-bold text-text md:text-5xl"
          >
            {data.titre}
          </h2>
          {data.note ? (
            <p className="mx-auto mt-4 max-w-xl text-sm text-text-secondary md:text-base">
              {data.note}
            </p>
          ) : null}
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:grid-rows-2">
          {data.items.map((item, i) => {
            const isFeatured = i === 0;
            return (
              <Reveal
                as="li"
                key={item.id}
                delay={i * 110}
                className={
                  isFeatured
                    ? "md:col-span-2 lg:col-span-2 lg:row-span-2"
                    : ""
                }
              >
                <article
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl ring-1 ring-border transition duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 motion-reduce:hover:translate-y-0 ${
                    isFeatured
                      ? "bg-gradient-to-br from-primary via-primary-vif to-secondary text-white p-8 md:p-10"
                      : "bg-surface text-text p-7"
                  }`}
                >
                  {isFeatured ? (
                    <svg
                      aria-hidden="true"
                      className="absolute -right-12 -top-12 h-64 w-64 text-white/10"
                      viewBox="0 0 200 200"
                      fill="currentColor"
                    >
                      <path d="M65 25c-13 0-24 11-24 24s11 24 24 24 24-11 24-24-11-24-24-24Zm70 0c-13 0-24 11-24 24s11 24 24 24 24-11 24-24-11-24-24-24ZM30 95c-12 0-22 10-22 22s10 22 22 22 22-10 22-22-10-22-22-22Zm140 0c-12 0-22 10-22 22s10 22 22 22 22-10 22-22-10-22-22-22ZM100 105c-22 0-50 26-50 52 0 18 14 28 31 28 8 0 13-3 19-3s11 3 19 3c17 0 31-10 31-28 0-26-28-52-50-52Z" />
                    </svg>
                  ) : null}

                  <span
                    className={`relative inline-flex h-14 w-14 items-center justify-center rounded-xl transition group-hover:scale-110 ${
                      isFeatured
                        ? "bg-white/15 text-white backdrop-blur-sm"
                        : "bg-primary-50 text-primary"
                    }`}
                  >
                    <Icon name={item.iconName} className="h-7 w-7" aria-hidden="true" />
                  </span>

                  <h3
                    className={`mt-6 font-display font-bold ${
                      isFeatured ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
                    }`}
                  >
                    {item.titre}
                  </h3>
                  <p
                    className={`mt-3 leading-relaxed ${
                      isFeatured
                        ? "text-base text-white/90 md:text-lg"
                        : "text-sm text-text-secondary md:text-base"
                    }`}
                  >
                    {item.description}
                  </p>
                  {item.sousTexte ? (
                    <p
                      className={`mt-3 text-sm italic ${
                        isFeatured ? "text-white/75" : "text-text-muted"
                      }`}
                    >
                      {item.sousTexte}
                    </p>
                  ) : null}

                  {isFeatured ? (
                    <div className="mt-auto pt-8">
                      <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-white/90">
                        <span className="h-px w-8 bg-white/60" />
                        Priorité de l'asso
                      </span>
                    </div>
                  ) : null}
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
