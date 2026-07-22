import Image from "next/image";
import { Heart, Quote } from "lucide-react";
import Reveal from "@/components/layout/Reveal";
import { getStrapiMedia } from "@/lib/strapi";
import type { AboutTemoignagesBlock } from "@/types/strapi";

interface AboutTemoignagesProps {
  data: AboutTemoignagesBlock;
}

export default function AboutTemoignages({ data }: AboutTemoignagesProps) {
  return (
    <section aria-labelledby="temoignages-titre" className="bg-bg">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          {data.label ? (
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {data.label}
            </span>
          ) : null}
          <h2
            id="temoignages-titre"
            className="mt-2 font-display text-3xl font-bold text-text md:text-4xl lg:text-5xl"
          >
            {data.titre}
          </h2>
          {data.description ? (
            <p className="mt-2 text-base text-text-secondary md:mt-3 md:text-lg">
              {data.description}
            </p>
          ) : null}
        </Reveal>

        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-10 lg:grid-cols-4">
          {data.items.map((t, i) => {
            const photoUrl = getStrapiMedia(t.photo.url) ?? "";
            return (
              <Reveal as="li" key={t.id} delay={i * 90}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border transition duration-200 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/15 motion-reduce:hover:translate-y-0">
                  <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[4/5]">
                    <Image
                      src={photoUrl}
                      alt={t.photo.alternativeText ?? `Portrait de ${t.nom}`}
                      fill
                      sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition duration-500 ease-out group-hover:scale-105 motion-reduce:group-hover:scale-100"
                    />
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-primary shadow-sm backdrop-blur-sm">
                      <Heart className="h-3 w-3" aria-hidden="true" />
                      {t.statut}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-xl font-bold text-text">
                      {t.nom}
                    </h3>
                    <Quote
                      className="mt-3 h-5 w-5 text-primary/25"
                      aria-hidden="true"
                    />
                    <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                      {t.histoire}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
