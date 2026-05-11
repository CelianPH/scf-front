import Reveal from "./Reveal";
import type { AboutValeursBlock } from "@/types/strapi";

interface AboutValeursProps {
  data: AboutValeursBlock;
}

export default function AboutValeurs({ data }: AboutValeursProps) {
  return (
    <section aria-labelledby="valeurs-titre" className="bg-bg-alt">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          {data.label ? (
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {data.label}
            </span>
          ) : null}
          <h2
            id="valeurs-titre"
            className="mt-2 font-display text-3xl font-bold text-text md:text-4xl lg:text-5xl"
          >
            {data.titre}
          </h2>
        </Reveal>

        <ol className="mx-auto mt-12 max-w-4xl md:mt-16">
          {data.valeurs.map((valeur, i) => {
            const number = String(i + 1).padStart(2, "0");
            const isReversed = i % 2 === 1;
            return (
              <Reveal as="li" key={valeur.id} delay={i * 80}>
                <article
                  className={`group relative flex flex-col gap-4 border-t border-border/70 py-8 md:gap-10 md:py-12 md:flex-row md:items-center ${
                    isReversed ? "md:flex-row-reverse" : ""
                  } ${i === data.valeurs.length - 1 ? "border-b" : ""}`}
                >
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-display text-6xl font-bold leading-none text-primary/20 transition-colors duration-500 ease-out group-hover:text-primary motion-reduce:transition-none md:text-8xl md:[font-feature-settings:'tnum']"
                  >
                    {number}
                  </span>
                  <div
                    className={`flex-1 ${
                      isReversed ? "md:text-right" : ""
                    }`}
                  >
                    <h3 className="font-display text-2xl font-bold text-text md:text-3xl lg:text-4xl">
                      {valeur.titre}
                    </h3>
                    <p
                      className={`mt-3 max-w-xl text-base leading-relaxed text-text-secondary md:text-lg ${
                        isReversed ? "md:ml-auto" : ""
                      }`}
                    >
                      {valeur.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
