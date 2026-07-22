import Image from "next/image";
import Reveal from "@/components/layout/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Section } from "@/components/ui/Section";
import { getStrapiMedia } from "@/lib/strapi";
import type { DonUtiliteBlock } from "@/types/strapi";

interface DonUtiliteProps {
  data: DonUtiliteBlock;
}

/**
 * Visuels de secours (par position) tant que Strapi ne fournit pas d'image par
 * item. `objectPosition` cadre chaque photo sur son sujet (les photos n'ont pas
 * toutes leur sujet au centre géométrique).
 */
const IMAGES_FALLBACK = [
  { src: "/images/don-veto.jpg", objectPosition: "center" },
  { src: "/images/don-nourriture.jpg", objectPosition: "75% center" },
  { src: "/images/don-actions.jpg", objectPosition: "center 75%" },
];

const INTRO_FALLBACK =
  "Les dons financiers couvrent les frais vétérinaires, financent le matériel, organisent des actions locales et font vivre notre engagement au quotidien.";

export default function DonUtilite({ data }: DonUtiliteProps) {
  return (
    <Section
      id="don-recit"
      aria-labelledby="don-utilite-titre"
      bg="bg"
      className="scroll-mt-24"
    >
      <Reveal className="mx-auto max-w-[600px] text-center">
        <span className="text-sm font-semibold uppercase tracking-wider text-primary">
          Transparence
        </span>
        <h2
          id="don-utilite-titre"
          className="mt-2 text-pretty font-display text-3xl font-bold text-text md:text-4xl"
        >
          {data.titre}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-text-secondary">
          {data.intro ?? INTRO_FALLBACK}
        </p>
      </Reveal>

      <ul
        className="mx-auto mt-8 grid max-w-[940px] grid-cols-1 gap-6 sm:grid-cols-3 md:mt-10"
        aria-label={data.titre}
      >
        {data.items.map((item, i) => {
          const fallback = IMAGES_FALLBACK[i] ?? null;
          const imageUrl = item.image ? getStrapiMedia(item.image.url) : fallback?.src;
          // Une image Strapi est cadrée au centre ; les visuels de secours ont
          // leur propre point de cadrage (sujet hors du centre géométrique).
          const objectPosition = item.image ? "center" : (fallback?.objectPosition ?? "center");

          return (
            <Reveal
              as="li"
              key={item.id}
              delay={i * 80}
              className="group overflow-hidden rounded-[20px] border border-border bg-surface text-left shadow-sm transition-shadow hover:shadow-md"
            >
              {imageUrl ? (
                <div className="relative h-[150px] w-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={item.image?.alternativeText ?? ""}
                    fill
                    sizes="(min-width: 640px) 300px, 100vw"
                    className="object-cover"
                    style={{ objectPosition }}
                  />
                </div>
              ) : (
                <div className="flex h-[150px] items-center justify-center bg-primary-50">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-md bg-surface text-primary">
                    <Icon name={item.iconName} className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
              )}
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-text">
                  {item.titre}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
