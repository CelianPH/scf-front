import Reveal from "./Reveal";
import { Icon } from "./Icon";
import type { AboutStatsBand as AboutStatsBandData } from "@/types/strapi";

interface AboutStatsBandProps {
  data: AboutStatsBandData;
}

export default function AboutStatsBand({ data }: AboutStatsBandProps) {
  return (
    <section
      aria-label={data.label ?? "Notre impact en chiffres"}
      className="relative overflow-hidden bg-dark"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 [background:radial-gradient(ellipse_at_top_right,rgba(194,24,91,0.22),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(123,31,162,0.28),transparent_55%)]"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <Reveal className="mx-auto max-w-2xl text-center">
          {data.label ? (
            <span className="text-sm font-semibold uppercase tracking-wider text-primary-accent">
              {data.label}
            </span>
          ) : null}
          <h2 className="mt-2 font-display text-3xl font-bold text-white md:text-4xl">
            {data.titre}
          </h2>
        </Reveal>

        <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-10 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
          {data.stats.map((stat, i) => (
            <Reveal
              as="li"
              key={stat.id}
              delay={i * 80}
              className="grid grid-rows-[auto_auto_1fr] place-items-center text-center"
            >
              <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-primary-accent ring-1 ring-white/15 md:h-14 md:w-14">
                <Icon
                  name={stat.iconName}
                  className="h-6 w-6 md:h-7 md:w-7"
                  aria-hidden="true"
                />
              </span>
              <span className="font-display text-3xl font-bold leading-none tabular-nums text-white md:text-4xl lg:text-5xl">
                {stat.value}
              </span>
              <span className="mt-2 max-w-[18ch] text-sm leading-snug text-white/70 md:text-base">
                {stat.label}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
