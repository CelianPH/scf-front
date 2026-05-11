import Reveal from "./Reveal";
import { Icon } from "./Icon";
import { ArrowLink } from "./ui/ArrowLink";
import DistributionMap from "./DistributionMapLoader";
import type { AboutMissionsBlock } from "@/types/strapi";

interface AboutMissionsProps {
  data: AboutMissionsBlock;
}

export default function AboutMissions({ data }: AboutMissionsProps) {
  const { signature, autres } = data;

  return (
    <section id="missions" aria-labelledby="missions-titre" className="bg-bg-alt">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          {data.label ? (
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {data.label}
            </span>
          ) : null}
          <h2
            id="missions-titre"
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

        <Reveal className="mt-10 md:mt-14">
          <article className="relative grid items-stretch gap-8 overflow-hidden rounded-2xl bg-surface shadow-sm ring-1 ring-border md:grid-cols-[5fr_6fr] md:gap-0">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary-50 md:aspect-auto md:h-full md:min-h-[420px]">
              <DistributionMap />
              {signature.badge ? (
                <span className="pointer-events-none absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-white shadow-md ring-1 ring-white/20">
                  {signature.badge}
                </span>
              ) : null}
            </div>

            <div className="flex flex-col justify-center p-6 md:p-10 lg:p-12">
              <span className="inline-flex w-fit items-center gap-2 rounded-md bg-primary-50 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                {signature.labelIconName ? (
                  <Icon
                    name={signature.labelIconName}
                    className="h-3.5 w-3.5"
                    aria-hidden="true"
                  />
                ) : null}
                {signature.label}
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold text-text md:text-3xl lg:text-4xl">
                {signature.titre}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
                {signature.description}
              </p>

              {signature.infos.length > 0 ? (
                <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {signature.infos.map((info) => (
                    <li
                      key={info.id}
                      className="flex items-start gap-2.5 text-sm text-text-secondary md:text-base"
                    >
                      <Icon
                        name={info.iconName}
                        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span>
                        <strong className="font-semibold text-text">
                          {info.titre}
                        </strong>
                        {info.valeur ? (
                          <>
                            <br />
                            {info.valeur}
                          </>
                        ) : null}
                        {info.detail ? (
                          <>
                            <br />
                            <span className="text-text-muted">{info.detail}</span>
                          </>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {signature.emailContact ? (
                <p className="mt-5 text-sm text-text-muted md:text-base">
                  Première visite : un mot à{" "}
                  <a
                    href={`mailto:${signature.emailContact}`}
                    className="rounded-sm font-semibold text-primary underline-offset-2 transition-colors duration-200 ease-out hover:text-primary-dark hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none"
                  >
                    {signature.emailContact}
                  </a>
                  .
                </p>
              ) : null}
            </div>
          </article>
        </Reveal>

        {autres.length > 0 ? (
          <ul className="mt-10 grid grid-cols-1 gap-6 md:mt-12 md:grid-cols-2">
            {autres.map((mission, i) => (
              <Reveal as="li" key={mission.id} delay={i * 80}>
                <article className="group flex h-full flex-col rounded-lg border border-border bg-surface p-6 shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 motion-reduce:hover:translate-y-0 md:p-8">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-primary-50 text-primary transition-colors duration-200 ease-out group-hover:bg-primary group-hover:text-white motion-reduce:transition-none">
                    <Icon
                      name={mission.iconName}
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-text md:text-2xl">
                    {mission.titre}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary md:text-base">
                    {mission.description}
                  </p>
                  {mission.cta ? (
                    <ArrowLink
                      href={mission.cta.href}
                      external={mission.cta.external}
                      className="mt-5"
                    >
                      {mission.cta.label}
                    </ArrowLink>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
