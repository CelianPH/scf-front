import Reveal from "@/components/layout/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ArrowLink } from "@/components/ui/ArrowLink";
import type { DonAutresActions as DonAutresActionsData } from "@/types/strapi";

interface DonAutresActionsProps {
  data: DonAutresActionsData;
}

export default function DonAutresActions({ data }: DonAutresActionsProps) {
  return (
    <section aria-labelledby="don-autres-titre" className="bg-bg-alt">
      <div className="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Sans donner
          </span>
          <h2
            id="don-autres-titre"
            className="mt-2 font-display text-3xl font-bold text-text md:text-4xl lg:text-5xl"
          >
            {data.titre}
          </h2>
          {data.intro ? (
            <p className="mx-auto mt-4 max-w-xl text-base text-text-secondary md:text-lg">
              {data.intro}
            </p>
          ) : null}
        </Reveal>

        <ul className="mt-10 divide-y divide-border md:mt-12" aria-label={data.titre}>
          {data.actions.map((a, i) => (
            <Reveal as="li" key={a.id} delay={i * 90}>
              <div className="flex items-start gap-6 py-6 md:gap-10 md:py-8">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary-50 text-secondary">
                  <Icon name={a.iconName} className="h-7 w-7" aria-hidden="true" />
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-2xl font-bold text-text">{a.titre}</h3>
                  <p className="mt-2 max-w-2xl text-base leading-relaxed text-text-secondary">
                    {a.description}
                  </p>
                  <ArrowLink
                    href={a.cta.href}
                    external={a.cta.external}
                    tone="secondary"
                    className="mt-4"
                  >
                    {a.cta.label}
                  </ArrowLink>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
