import FadeIn from "./FadeIn";
import type { Chiffre } from "@/types/strapi";

interface ChiffresSectionProps {
  chiffres: Chiffre[];
}

export default function ChiffresSection({ chiffres }: ChiffresSectionProps) {
  return (
    <section className="px-5 py-16">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-center mb-2">
          Sans Croquettes fixe en chiffre
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-10" />
      </FadeIn>

      <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
        {chiffres.map((chiffre, index) => (
          <FadeIn key={chiffre.id} delay={index * 100}>
            <div className="bg-surface rounded-2xl p-5 text-center shadow-sm ring-1 ring-border-light transition-all duration-300 hover:shadow-md hover:ring-primary/20">
              <span
                className="font-display text-3xl font-bold block mb-1.5 leading-none bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent"
              >
                {chiffre.Valeur}
              </span>
              <span className="text-text-muted text-sm leading-snug block">
                {chiffre.Label}
              </span>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
