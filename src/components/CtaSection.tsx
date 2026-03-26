import FadeIn from "./FadeIn";

interface CtaSectionProps {
  titre: string;
  bouton1: string;
  bouton2: string;
}

export default function CtaSection({
  titre,
  bouton1,
  bouton2,
}: CtaSectionProps) {
  return (
    <section id="rejoindre" className="px-5 py-12 bg-bg">
      <FadeIn>
        <div className="bg-gradient-to-br from-primary via-primary-dark to-secondary-dark rounded-3xl p-8 text-center relative overflow-hidden">
          {/* Decorative orbs */}
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-secondary/20 blur-2xl" />

          {/* Dot pattern */}
          <div className="absolute top-4 right-4 w-16 h-16 opacity-[0.08]">
            <svg viewBox="0 0 64 64" fill="white">
              <circle cx="8" cy="8" r="2.5" />
              <circle cx="24" cy="8" r="2.5" />
              <circle cx="40" cy="8" r="2.5" />
              <circle cx="56" cy="8" r="2.5" />
              <circle cx="8" cy="24" r="2.5" />
              <circle cx="24" cy="24" r="2.5" />
              <circle cx="40" cy="24" r="2.5" />
              <circle cx="56" cy="24" r="2.5" />
              <circle cx="8" cy="40" r="2.5" />
              <circle cx="24" cy="40" r="2.5" />
              <circle cx="40" cy="40" r="2.5" />
              <circle cx="56" cy="40" r="2.5" />
            </svg>
          </div>

          <h2 className="font-display text-2xl font-semibold text-white mb-6 relative z-10 drop-shadow-sm">
            {titre}
          </h2>

          <div className="flex gap-3 relative z-10">
            <button className="flex-1 py-3.5 px-5 bg-white text-primary font-semibold rounded-full shadow-lg shadow-primary-deep/20 transition-all duration-300 hover:shadow-xl hover:bg-white/95 active:scale-95 text-sm">
              {bouton1}
            </button>
            <button className="flex-1 py-3.5 px-5 border-2 border-white/80 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/15 hover:border-white active:scale-95 text-sm backdrop-blur-sm">
              {bouton2}
            </button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
