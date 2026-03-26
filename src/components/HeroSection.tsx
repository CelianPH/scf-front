import { getStrapiMedia } from "@/lib/strapi";
import type { StrapiMedia } from "@/types/strapi";

interface HeroSectionProps {
  titre: string;
  description: string;
  image: StrapiMedia;
}

export default function HeroSection({
  titre,
  description,
  image,
}: HeroSectionProps) {
  const imageUrl = getStrapiMedia(image?.url);

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-end overflow-hidden bg-dark">
      {/*
       * Background image via CSS — pas de next/image ici volontairement :
       * si l'URL est invalide, aucune icône cassée ne s'affiche,
       * le gradient prend le relais naturellement.
       */}
      {imageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
          role="img"
          aria-label={image.alternativeText || titre}
        />
      )}

      {/* Brand gradient overlay — fonctionne comme overlay ET comme fallback */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-deep/70 via-secondary-dark/75 to-dark/95" />

      {/* Decorative glows */}
      <div className="absolute top-[15%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-primary/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-8%] w-[45vw] h-[45vw] rounded-full bg-secondary-light/15 blur-[80px] pointer-events-none" />

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 80"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            fill="var(--color-bg)"
          />
        </svg>
      </div>

      {/* Content — flex justify-end + line-clamp = toujours en bas, jamais de débordement */}
      <div className="relative z-10 p-6 pb-24 mt-auto">
        <h1 className="font-display text-[2.5rem] font-bold text-white mb-3 leading-[1.1] line-clamp-3 drop-shadow-lg">
          {titre}
        </h1>
        <p className="text-white/75 text-base leading-relaxed line-clamp-3 max-w-sm drop-shadow-sm">
          {description}
        </p>
      </div>
    </section>
  );
}
