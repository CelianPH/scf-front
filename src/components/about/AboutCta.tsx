import { Calendar, Package, Stethoscope, type LucideIcon } from "lucide-react";
import Reveal from "@/components/layout/Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import type { AboutCtaFinal } from "@/types/strapi";

interface AboutCtaProps {
  data: AboutCtaFinal;
}

type Mission = {
  key: string;
  icon: LucideIcon;
  titre: string;
  detail: string;
};

/** Missions concrètes proposées aux bénévoles — donnent de la matière au CTA
 *  plutôt qu'un simple message générique (reprend les axes du seed home). */
const MISSIONS: Mission[] = [
  {
    key: "distribution",
    icon: Package,
    titre: "Distribution du vendredi",
    detail: "Préparer et remettre les croquettes aux familles suivies.",
  },
  {
    key: "transport",
    icon: Stethoscope,
    titre: "Transport vétérinaire",
    detail: "Conduire les chats à leurs rendez-vous de soins.",
  },
  {
    key: "evenements",
    icon: Calendar,
    titre: "Événements & collectes",
    detail: "Tenir un stand, récupérer des dons, faire connaître l'asso.",
  },
];

export default function AboutCta({ data }: AboutCtaProps) {
  return (
    <section aria-labelledby="about-cta-titre" className="bg-dark">
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(194,24,91,0.25),transparent_60%),radial-gradient(ellipse_at_bottom_left,rgba(123,31,162,0.3),transparent_55%)]"
        />
        <Reveal className="relative mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
            {/* Colonne message + actions */}
            <div className="text-center lg:text-left">
              {data.labelKicker ? (
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-accent">
                  {data.labelKicker}
                </span>
              ) : null}
              <h2
                id="about-cta-titre"
                className="mt-3 font-display text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl"
              >
                {data.titre}
              </h2>
              {data.description ? (
                <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75 md:text-lg lg:mx-0">
                  {data.description}
                </p>
              ) : null}
              {data.ctaPrimary || data.ctaSecondary ? (
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                  <CtaButton cta={data.ctaPrimary} />
                  <CtaButton cta={data.ctaSecondary} />
                </div>
              ) : null}
            </div>

            {/* Colonne missions concrètes */}
            <ul className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-sm sm:p-5">
              {MISSIONS.map((m) => (
                <li
                  key={m.key}
                  className="flex items-start gap-3.5 rounded-xl px-2 py-2.5 transition-colors hover:bg-white/[0.04]"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-primary-accent ring-1 ring-white/15">
                    <m.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold text-white">
                      {m.titre}
                    </span>
                    <span className="mt-0.5 block text-sm leading-snug text-white/65">
                      {m.detail}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
