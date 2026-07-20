import Image from "next/image";
import Reveal from "@/components/layout/Reveal";
import { Icon } from "@/components/ui/Icon";
import { CtaButton } from "@/components/ui/CtaButton";
import { RichText } from "@/components/ui/RichText";
import { getStrapiMedia } from "@/lib/strapi";
import type { AboutFelinsOmbre as AboutFelinsOmbreData } from "@/types/strapi";

interface AboutFelinsOmbreProps {
  data: AboutFelinsOmbreData;
}

export default function AboutFelinsOmbre({ data }: AboutFelinsOmbreProps) {
  const remaining = Math.max(0, data.goal - data.collected);
  const progress =
    data.goal > 0 ? Math.round((data.collected / data.goal) * 100) : 0;

  const imageUrl = getStrapiMedia(data.image.url) ?? "/images/felins-ombre.jpg";
  const imageAlt = data.imageAlt ?? data.image.alternativeText ?? "";

  return (
    <section
      id="felins-ombre"
      aria-labelledby="felins-titre"
      className="relative overflow-hidden bg-bg"
    >
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid items-stretch gap-10 lg:grid-cols-[5fr_6fr] lg:gap-14">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-secondary-50 lg:aspect-auto lg:h-full">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(min-width:1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-dark/60 via-dark/10 to-transparent"
              />
              {data.locationBadge ? (
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm backdrop-blur-sm">
                  {data.locationIconName ? (
                    <Icon
                      name={data.locationIconName}
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                  ) : null}
                  {data.locationBadge}
                </div>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={120} className="flex flex-col justify-center">
            {data.badge ? (
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary md:text-sm">
                {data.badge}
              </span>
            ) : null}
            <h2
              id="felins-titre"
              className="mt-4 font-display text-3xl font-bold leading-tight text-text md:text-4xl lg:text-5xl"
            >
              {data.titre}
            </h2>
            <RichText
              html={data.paragraphes}
              className="text-base leading-relaxed text-text-secondary md:text-lg [&_p]:mt-5 [&_p:not(:first-of-type)]:mt-3 [&_a]:rounded-sm [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors [&_a]:duration-200 [&_a]:ease-out [&_a:hover]:text-primary-dark [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-primary [&_strong]:font-semibold [&_strong]:text-text [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5"
            />

            {data.goal > 0 ? (
              <figure
                aria-label={`Avancement de la collecte : ${progress}%`}
                className="mt-7 rounded-xl border border-border bg-surface p-5 shadow-sm md:p-6"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-display text-2xl font-bold text-primary md:text-3xl">
                    {progress}%
                  </span>
                  <span className="text-sm text-text-muted md:text-base">
                    de l&apos;objectif global atteint
                  </span>
                </div>
                <div
                  className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-primary-50"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-secondary to-primary"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <figcaption className="mt-3 text-sm text-text-secondary">
                  <strong className="font-semibold text-text">
                    {data.collected.toLocaleString("fr-FR")} €
                  </strong>{" "}
                  déjà collectés en phase 1.{" "}
                  <strong className="font-semibold text-text">
                    {remaining.toLocaleString("fr-FR")} €
                  </strong>{" "}
                  restent à réunir pour finir l&apos;enclos extérieur.
                </figcaption>
              </figure>
            ) : null}

            {data.ctaHelloAsso ? (
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <CtaButton cta={data.ctaHelloAsso} />
              </div>
            ) : null}
            {data.gofundmeNote ? (
              <p className="mt-3 text-xs text-text-muted">{data.gofundmeNote}</p>
            ) : null}

            {data.fiscalNote ? (
              <p className="mt-4 text-xs text-text-muted">{data.fiscalNote}</p>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
