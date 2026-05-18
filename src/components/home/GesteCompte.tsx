import Reveal from "@/components/layout/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ArrowLink } from "@/components/ui/ArrowLink";
import type { HomeGesteCompte } from "@/types/strapi";

interface GesteCompteProps {
  data: HomeGesteCompte;
}

export default function GesteCompte({ data }: GesteCompteProps) {
  return (
    <section aria-labelledby="geste-titre" className="bg-bg-alt">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            id="geste-titre"
            className="font-display text-3xl font-bold text-text md:text-4xl lg:text-5xl"
          >
            {data.titre}
          </h2>
          {data.description ? (
            <p className="mt-2 text-base text-text-secondary md:mt-3 md:text-lg">
              {data.description}
            </p>
          ) : null}
        </Reveal>

        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-10 lg:grid-cols-3">
          {data.actions.map((action, i) => (
            <Reveal as="li" key={action.id} delay={i * 100}>
              <article className="group flex h-full flex-col rounded-lg border border-border bg-surface p-6 shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/15 motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:p-8">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary-50 text-primary transition duration-200 ease-out group-hover:bg-primary group-hover:text-white motion-reduce:transition-none">
                  <Icon name={action.iconName} className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-xl font-bold text-text md:text-2xl">
                  {action.titre}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary md:text-base">
                  {action.description}
                </p>
                <ArrowLink
                  href={action.cta.href}
                  external={action.cta.external}
                  inGroup
                  className="mt-5"
                >
                  {action.cta.label}
                </ArrowLink>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
