import Reveal from "./Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import type { AboutCtaFinal } from "@/types/strapi";

interface AboutCtaProps {
  data: AboutCtaFinal;
}

export default function AboutCta({ data }: AboutCtaProps) {
  return (
    <section aria-labelledby="about-cta-titre" className="bg-dark">
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(194,24,91,0.25),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(123,31,162,0.3),transparent_55%)]"
        />
        <Reveal className="relative mx-auto max-w-7xl px-5 py-14 text-center md:px-8 md:py-20">
          {data.labelKicker ? (
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-accent">
              {data.labelKicker}
            </span>
          ) : null}
          <h2
            id="about-cta-titre"
            className="mx-auto mt-3 max-w-2xl font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
          >
            {data.titre}
          </h2>
          {data.description ? (
            <p className="mx-auto mt-4 max-w-xl text-base text-white/75 md:text-lg">
              {data.description}
            </p>
          ) : null}
          {data.ctaPrimary || data.ctaSecondary ? (
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <CtaButton cta={data.ctaPrimary} />
              <CtaButton cta={data.ctaSecondary} />
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
