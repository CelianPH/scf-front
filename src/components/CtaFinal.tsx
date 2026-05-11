import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { CtaButton } from "@/components/ui/CtaButton";
import { getStrapiMedia } from "@/lib/strapi";
import type { HomeCtaFinal } from "@/types/strapi";

interface CtaFinalProps {
  data: HomeCtaFinal;
}

export default function CtaFinal({ data }: CtaFinalProps) {
  const chat = data.chatFeatured;

  return (
    <section
      aria-labelledby="cta-titre"
      className="relative isolate overflow-hidden bg-primary text-white"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      <Reveal
        className={
          chat
            ? "relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-5 py-10 md:grid-cols-[1.2fr_0.8fr] md:gap-10 md:px-8 md:py-14"
            : "relative mx-auto max-w-3xl px-5 py-10 text-center md:px-8 md:py-14"
        }
      >
        <div className={chat ? "order-2 md:order-1" : ""}>
          {data.labelKicker ? (
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
              {data.labelKicker}
            </span>
          ) : null}

          <h2
            id="cta-titre"
            className="mt-2 font-display text-2xl font-bold leading-[1.1] md:text-3xl lg:text-4xl"
          >
            {data.titre}
          </h2>

          {data.description ? (
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/85">
              {data.description}
            </p>
          ) : null}

          {data.ctaPrimary || data.ctaSecondary ? (
            <div
              className={
                chat
                  ? "mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
                  : "mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
              }
            >
              <CtaButton cta={data.ctaPrimary} />
              <CtaButton cta={data.ctaSecondary} />
            </div>
          ) : null}
        </div>

        {chat ? (
          (() => {
            const sexeLabel = chat.sexe === "Male" ? "mâle" : "femelle";
            const imageUrl = getStrapiMedia(chat.image.url) ?? "";
            return (
              <Link
                href={`/adoption/${chat.slug}`}
                className="group order-1 mx-auto block w-full max-w-[260px] focus-visible:outline-none md:order-2 md:max-w-none"
                aria-label={`Découvrir la fiche de ${chat.nom}, ${sexeLabel} de ${chat.age}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-lg shadow-black/25 ring-1 ring-white/20 transition group-focus-visible:ring-2 group-focus-visible:ring-white">
                  <Image
                    src={imageUrl}
                    alt={
                      chat.image.alternativeText ??
                      `${chat.nom}, ${sexeLabel} de ${chat.age}`
                    }
                    fill
                    sizes="(min-width: 768px) 30vw, 60vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 md:p-4">
                    <div className="min-w-0">
                      <p className="font-display text-base font-bold leading-tight md:text-lg">
                        {chat.nom}, {chat.age}
                      </p>
                      <p className="mt-0.5 truncate text-[11px] text-white/85">
                        {chat.trait}
                      </p>
                    </div>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow transition duration-200 ease-out group-hover:-translate-y-0.5 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 motion-reduce:group-hover:scale-100">
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })()
        ) : null}
      </Reveal>
    </section>
  );
}
