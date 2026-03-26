import Image from "next/image";
import { getStrapiMedia } from "@/lib/strapi";
import FadeIn from "./FadeIn";
import type { Membre } from "@/types/strapi";

interface EquipeSectionProps {
  equipe: Membre[];
}

export default function EquipeSection({ equipe }: EquipeSectionProps) {
  return (
    <section id="equipe" className="px-5 py-16 bg-bg">
      <FadeIn>
        <h2 className="font-display text-3xl font-semibold text-center mb-2">
          L&apos;&eacute;quipe
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-10" />
      </FadeIn>

      <div className="flex flex-wrap justify-center gap-x-8 gap-y-8 max-w-xs mx-auto">
        {equipe.map((membre, index) => {
          const photoUrl = getStrapiMedia(membre.Photo?.url);
          return (
            <FadeIn key={membre.id} delay={index * 120}>
              <div className="flex flex-col items-center w-28 group">
                {/* Gradient ring around photo */}
                <div className="bg-gradient-to-br from-primary-accent to-secondary p-[3px] rounded-full mb-3 shadow-lg shadow-primary/10 transition-transform duration-300 group-hover:scale-105">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-bg-alt">
                    {photoUrl ? (
                      <Image
                        src={photoUrl}
                        alt={membre.Nom}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
                        <span className="text-2xl text-primary font-display font-semibold">
                          {membre.Nom.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <h3 className="font-display text-sm font-medium text-center leading-snug text-text">
                  {membre.Nom}
                </h3>
                <p className="text-text-muted text-xs text-center mt-0.5">
                  {membre.Role}
                </p>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
