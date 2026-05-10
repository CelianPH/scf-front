import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function QuiSommesNous() {
  return (
    <section aria-labelledby="qui-titre" className="bg-bg">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
          <Reveal className="relative order-2 md:order-1">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-secondary-50 md:aspect-square">
              <Image
                src="/images/equipe.jpg"
                alt="Bénévole de Sans Croquettes Fixes prenant soin d'un chat"
                fill
                sizes="(min-width:768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute -right-3 -top-3 hidden h-24 w-24 rounded-xl bg-primary/10 md:block lg:-right-6 lg:-top-6 lg:h-32 lg:w-32"
            />
          </Reveal>

          <Reveal delay={150} className="order-1 md:order-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Notre histoire
            </span>
            <h2
              id="qui-titre"
              className="mt-2 font-display text-3xl font-bold text-text md:text-4xl lg:text-5xl"
            >
              Qui sommes-nous&nbsp;?
            </h2>
            <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg">
              Sans Croquettes Fixes est une association loi 1901, déclarée en
              préfecture en août 2015. Basée à Lyon, nous agissons dans toute
              la région Auvergne-Rhône-Alpes, et parfois plus loin.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
              Notre conviction&nbsp;: la protection animale passe aussi par la
              solidarité humaine. Derrière chaque animal en difficulté, il y a
              souvent un maître en détresse. C&apos;est à eux deux que nous
              tendons la main.
            </p>

            <figure className="relative mx-auto mt-12 max-w-xl px-4 text-center md:mt-14 md:px-8">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-1 -top-6 select-none font-display text-7xl leading-none text-primary md:-left-2 md:-top-10 md:text-8xl"
              >
                ❝
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-2 -right-1 select-none font-display text-7xl leading-none text-primary md:-bottom-4 md:-right-2 md:text-8xl"
              >
                ❞
              </span>

              <blockquote className="relative pt-6 font-display text-2xl italic leading-snug text-text md:pt-8 md:text-[2rem] md:leading-[1.25]">
                Parce que l&apos;abandon ne devrait jamais être une{" "}
                <span className="relative inline-block whitespace-nowrap">
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-[-0.15em] bottom-[0.1em] top-[0.45em] -z-0 -skew-x-3 rounded-[2px] bg-primary/25"
                  />
                  <span className="relative z-10">solution</span>
                </span>
                .
              </blockquote>

              <div
                aria-hidden="true"
                className="mt-7 flex justify-center text-primary md:mt-8"
              >
                <svg
                  width="160"
                  height="20"
                  viewBox="0 0 160 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10 L52 10"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <circle cx="55" cy="10" r="1.6" fill="currentColor" />
                  <path
                    d="M60 10 Q68 2 76 10 Q84 18 92 10"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <circle cx="97" cy="10" r="1.6" fill="currentColor" />
                  <path
                    d="M100 10 L158 10"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <figcaption className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-primary md:text-xs">
                Notre conviction
              </figcaption>
            </figure>

            <ul className="mt-7 flex flex-wrap gap-2">
              {[
                "Prise en charge",
                "Distribution",
                "Stérilisation",
                "Accompagnement",
                "Sensibilisation",
              ].map((action) => (
                <li
                  key={action}
                  className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm font-medium text-text-secondary"
                >
                  {action}
                </li>
              ))}
            </ul>

            <Link
              href="/a-propos"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-base font-semibold text-white shadow-md shadow-primary/20 transition hover:bg-primary-dark"
            >
              En savoir plus
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
