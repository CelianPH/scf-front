import Reveal from "@/components/layout/Reveal";
import { Icon } from "@/components/ui/Icon";
import type { DonUtiliteBlock } from "@/types/strapi";

interface DonUtiliteProps {
  data: DonUtiliteBlock;
}

export default function DonUtilite({ data }: DonUtiliteProps) {
  return (
    <section aria-labelledby="don-utilite-titre" className="bg-bg">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Transparence
          </span>
          <h2
            id="don-utilite-titre"
            className="mt-2 font-display text-3xl font-bold text-text md:text-4xl lg:text-5xl"
          >
            {data.titre}
          </h2>
        </Reveal>

        <ul
          className="mt-10 md:mt-12 grid grid-cols-1 divide-y divide-border-light overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border md:grid-cols-3 md:divide-x md:divide-y-0"
          aria-label={data.titre}
        >
          {data.items.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 80} className="p-6 md:p-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary-50 text-primary">
                <Icon name={item.iconName} className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-text md:text-2xl">
                {item.titre}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary md:text-base">
                {item.description}
              </p>
              {item.sousTexte ? (
                <p className="mt-2 text-sm italic text-text-muted">{item.sousTexte}</p>
              ) : null}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
