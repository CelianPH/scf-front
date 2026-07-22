import Reveal from "@/components/layout/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import type { HomeDistributionBandeau } from "@/types/strapi";

interface DistributionBandeauProps {
  data: HomeDistributionBandeau;
}

export default function DistributionBandeau({ data }: DistributionBandeauProps) {
  return (
    <Section
      aria-labelledby="distribution-titre"
      bg="secondary-50"
      size="compact"
    >
        <Reveal className="mx-auto max-w-3xl text-center">
          {data.label ? (
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary md:text-sm">
              {data.label}
            </span>
          ) : null}
          <h2
            id="distribution-titre"
            className="mt-2 font-display text-3xl font-bold text-text md:text-4xl"
          >
            {data.titre}
          </h2>
          {data.description ? (
            <p className="mt-2 text-sm leading-relaxed text-text-secondary md:text-base">
              {data.description}
            </p>
          ) : null}
        </Reveal>

        <ul className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-3">
          {data.infos.map((info, i) => (
            <Reveal as="li" key={info.id} delay={i * 80}>
              <div className="flex h-full items-start gap-4 rounded-lg border border-secondary/15 bg-surface p-5 shadow-sm md:p-6">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-secondary/15 text-secondary">
                  <Icon name={info.iconName} className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                    {info.titre}
                  </p>
                  <p className="mt-1 break-words font-display text-sm font-bold text-text sm:text-base">
                    {info.valeur}
                  </p>
                  {info.detail ? (
                    <p className="mt-1 text-xs text-text-muted md:text-sm">
                      {info.detail}
                    </p>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
    </Section>
  );
}
