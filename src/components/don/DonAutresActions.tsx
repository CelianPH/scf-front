import Reveal from "@/components/layout/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ArrowLink } from "@/components/ui/ArrowLink";
import type { DonAutresActions as DonAutresActionsData } from "@/types/strapi";

interface DonAutresActionsProps {
  data: DonAutresActionsData;
}

export default function DonAutresActions({ data }: DonAutresActionsProps) {
  return (
    <section
      aria-labelledby="don-autres-titre"
      className="bg-bg"
    >
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            <Icon name="Sparkles" className="h-3.5 w-3.5" aria-hidden="true" />
            Sans donner
          </span>
          <h2
            id="don-autres-titre"
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

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.actions.map((a, i) => (
            <Reveal as="li" key={a.id} delay={i * 110}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-7 shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/15 motion-reduce:hover:translate-y-0">
                <span
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gradient-to-br from-primary-50 to-secondary-50 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-primary transition duration-300 group-hover:rotate-6 group-hover:bg-primary group-hover:text-white">
                  <Icon name={a.iconName} className="h-7 w-7" aria-hidden="true" />
                </span>
                <h3 className="relative mt-6 font-display text-2xl font-bold text-text">
                  {a.titre}
                </h3>
                <p className="relative mt-3 text-sm leading-relaxed text-text-secondary md:text-base">
                  {a.description}
                </p>
                <ArrowLink
                  href={a.cta.href}
                  external={a.cta.external}
                  inGroup
                  className="relative mt-6"
                >
                  {a.cta.label}
                </ArrowLink>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
