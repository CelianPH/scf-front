import Image from "next/image";
import { getStrapiMedia } from "@/lib/strapi";
import FadeIn from "./FadeIn";
import type { Partenaire } from "@/types/strapi";

interface PartenairesSectionProps {
  partenaires: Partenaire[];
}

export default function PartenairesSection({
  partenaires,
}: PartenairesSectionProps) {
  return (
    <section id="partenaires" className="px-5 py-16">
      <FadeIn>
        <h2 className="font-display text-3xl font-semibold text-center mb-2">
          Nos partenaires
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-10" />
      </FadeIn>

      <FadeIn delay={150}>
        <div className="flex flex-wrap justify-center items-center gap-5 max-w-sm mx-auto">
          {partenaires.map((partenaire) => {
            const logoUrl = getStrapiMedia(partenaire.Logo?.url);
            const content = (
              <div className="w-[88px] h-16 bg-surface rounded-xl flex items-center justify-center p-2.5 shadow-sm ring-1 ring-border-light transition-all duration-300 hover:shadow-md hover:ring-primary/20">
                {logoUrl ? (
                  <Image
                    src={logoUrl}
                    alt={partenaire.Nom}
                    width={72}
                    height={48}
                    className="object-contain max-h-full grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                ) : (
                  <span className="text-xs text-text-muted text-center leading-tight font-medium">
                    {partenaire.Nom}
                  </span>
                )}
              </div>
            );

            return partenaire.Lien ? (
              <a
                key={partenaire.id}
                href={partenaire.Lien}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={partenaire.Nom}
              >
                {content}
              </a>
            ) : (
              <div key={partenaire.id}>{content}</div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}
