import { Icon } from "@/components/ui/Icon";
import Reveal from "@/components/layout/Reveal";
import type { HomeStatsBlock } from "@/types/strapi";

interface StatsSectionProps {
  data: HomeStatsBlock;
}

export default function StatsSection({ data }: StatsSectionProps) {
  const heading = data.ariaLabel ?? "Notre impact en chiffres";

  return (
    <section aria-label={heading} className="bg-bg">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <Reveal
          as="h2"
          className="mb-8 text-center font-display text-2xl font-bold text-text md:mb-10 md:text-3xl"
        >
          {heading}
        </Reveal>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-x-8">
          {data.stats.map((stat, i) => (
            <Reveal
              as="li"
              key={stat.id}
              delay={i * 80}
              className="grid grid-rows-[auto_auto_1fr] place-items-center text-center"
            >
              <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary md:h-14 md:w-14">
                <Icon
                  name={stat.iconName}
                  className="h-6 w-6 md:h-7 md:w-7"
                  aria-hidden="true"
                />
              </span>
              <span className="font-display text-3xl font-bold leading-none text-primary tabular-nums md:text-4xl">
                {stat.value}
              </span>
              <span className="mt-2 max-w-[18ch] text-sm leading-snug text-text-secondary md:text-base">
                {stat.label}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
