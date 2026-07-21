import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Heart } from "lucide-react";
import { getStrapiMedia } from "@/lib/strapi";
import type { DonHero as DonHeroData } from "@/types/strapi";

interface DonHeroProps {
  data: DonHeroData;
}

/** Colore le dernier mot du titre en magenta pour l'accent bicolore signature du site. */
function renderTitre(titre: string) {
  const mots = titre.trim().split(" ");
  if (mots.length < 2) return <span className="text-primary-accent">{titre}</span>;
  const dernier = mots.pop();
  return (
    <>
      {mots.join(" ")} <span className="text-primary-accent">{dernier}</span>
    </>
  );
}

export default function DonHero({ data }: DonHeroProps) {
  const imageUrl = data.image ? (getStrapiMedia(data.image.url) ?? null) : null;
  const imageAlt = data.imageAlt ?? data.image?.alternativeText ?? "";

  return (
    <section aria-labelledby="don-hero-titre" className="relative isolate overflow-hidden">
      <div className="relative h-[68svh] min-h-[520px] w-full md:h-[78svh]">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_center]"
          />
        ) : (
          <div className="absolute inset-0 bg-dark" />
        )}
        {/* Voile aligné sur les heros accueil/à-propos : diagonale sombre + teinte
           magenta en bas, plus une base horizontale douce à gauche pour asseoir le
           texte sans noyer la photo (le hero don était nettement plus sombre avant). */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-dark/50 via-dark/35 to-primary/30"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-dark/55 via-dark/15 to-transparent lg:via-transparent"
        />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-12 pt-24 md:px-8 md:pb-20 md:pt-32 lg:justify-center">
          <div className="max-w-2xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm md:text-sm">
              <Icon name="Heart" className="h-3.5 w-3.5" aria-hidden="true" />
              Soutenir l&apos;association
            </span>
            <h1
              id="don-hero-titre"
              className="font-display text-4xl font-bold leading-[1.05] text-white md:text-6xl lg:text-7xl"
            >
              {renderTitre(data.titre)}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 md:mt-6 md:text-lg">
              {data.sousTitre}
            </p>
            {data.mention ? (
              <p className="mt-3 text-xs text-white/55 md:text-sm">{data.mention}</p>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row md:mt-10">
              {/* Le don financier suit la convention DESIGN : violet secondary.
                 On ancre vers le formulaire plus bas pour garder le parcours narratif
                 (impact → campagne → don) plutôt qu'éjecter d'emblée vers HelloAsso. */}
              <Button href="#widget-don" variant="secondary" size="lg" iconLeft={Heart}>
                {data.ctaPrimary.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
