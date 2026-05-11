import Image from "next/image";
import Reveal from "./Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { RichText } from "@/components/ui/RichText";
import { getStrapiMedia } from "@/lib/strapi";
import type { HomeQuiSommesNous } from "@/types/strapi";

interface QuiSommesNousProps {
  data: HomeQuiSommesNous;
}

export default function QuiSommesNous({ data }: QuiSommesNousProps) {
  const imageUrl = data.image
    ? getStrapiMedia(data.image.url) ?? "/images/equipe.jpg"
    : "/images/equipe.jpg";
  const imageAlt =
    data.imageAlt ??
    data.image?.alternativeText ??
    "Bénévole de Sans Croquettes Fixes prenant soin d'un chat";

  const renderQuote = () => {
    if (!data.quote) return null;
    const highlight = data.quoteHighlight?.trim();
    if (highlight && data.quote.includes(highlight)) {
      const [before, ...rest] = data.quote.split(highlight);
      const after = rest.join(highlight);
      return (
        <>
          {before}
          <span className="relative inline-block whitespace-nowrap">
            <span
              aria-hidden="true"
              className="absolute inset-x-[-0.15em] bottom-[0.1em] top-[0.45em] -z-0 -skew-x-3 rounded-[2px] bg-primary/25"
            />
            <span className="relative z-10">{highlight}</span>
          </span>
          {after}
        </>
      );
    }
    return data.quote;
  };

  return (
    <section aria-labelledby="qui-titre" className="bg-bg">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
          <Reveal className="relative order-2 md:order-1">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-secondary-50 md:aspect-square">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(min-width:768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute -right-3 -top-3 hidden h-24 w-24 rounded-xl bg-primary/10 md:block lg:-right-6 lg:-top-6 lg:h-32 lg:w-32"
            />
          </Reveal>

          <Reveal delay={150} className="order-1 md:order-2">
            {data.label ? (
              <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                {data.label}
              </span>
            ) : null}
            <h2
              id="qui-titre"
              className="mt-2 font-display text-3xl font-bold text-text md:text-4xl lg:text-5xl"
            >
              {data.titre}
            </h2>
            <RichText
              html={data.paragraphes}
              className="text-base leading-relaxed text-text-secondary md:text-lg [&_p]:mt-5 [&_p:not(:first-of-type)]:mt-4 [&_a]:text-primary [&_a]:underline [&_strong]:font-semibold [&_strong]:text-text [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5"
            />

            {data.quote ? (
              <figure className="relative mx-auto mt-10 max-w-xl px-4 text-center md:mt-12 md:px-8">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-1 -top-6 select-none font-display text-7xl leading-none text-primary md:-left-2 md:-top-10 md:text-8xl"
                >
                  ❝
                </span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-2 -right-1 select-none font-display text-7xl leading-none text-primary md:-bottom-4 md:-right-2 md:text-8xl"
                >
                  ❞
                </span>

                <blockquote className="relative pt-6 font-display text-2xl italic leading-snug text-text md:pt-8 md:text-[2rem] md:leading-[1.25]">
                  {renderQuote()}
                </blockquote>

                <div
                  aria-hidden="true"
                  className="mt-7 flex justify-center text-primary md:mt-8"
                >
                  <svg
                    width="160"
                    height="20"
                    viewBox="0 0 160 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10 L52 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    <circle cx="55" cy="10" r="1.6" fill="currentColor" />
                    <path
                      d="M60 10 Q68 2 76 10 Q84 18 92 10"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <circle cx="97" cy="10" r="1.6" fill="currentColor" />
                    <path d="M100 10 L158 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                </div>

                {data.label ? (
                  <figcaption className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-primary md:text-xs">
                    {data.label}
                  </figcaption>
                ) : null}
              </figure>
            ) : null}

            {data.tags && data.tags.length > 0 ? (
              <ul className="mt-7 flex flex-wrap gap-2">
                {data.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text-secondary"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}

            {data.cta ? <CtaButton cta={data.cta} className="mt-7" /> : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
