import FadeIn from "./FadeIn";
import type { Mission } from "@/types/strapi";

interface MissionsSectionProps {
  missions: Mission[];
}

const missionIcons: Record<string, string> = {
  "pris en charge": "\uD83D\uDC3E",
  distribution: "\uD83C\uDF5A",
  "stérilisation": "\u2695\uFE0F",
  accompagnement: "\uD83E\uDD1D",
  sensibilisation: "\uD83D\uDCA1",
  adoption: "\u2764\uFE0F",
};

function getIcon(titre: string): string {
  const key = titre.toLowerCase().trim();
  return missionIcons[key] || "\u2B50";
}

export default function MissionsSection({ missions }: MissionsSectionProps) {
  return (
    <section
      id="missions"
      className="px-5 py-16"
    >
      <FadeIn>
        <h2 className="font-display text-3xl font-semibold text-center mb-2">
          Nos missions
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-10" />
      </FadeIn>

      <div className="flex flex-col gap-3 max-w-lg mx-auto">
        {missions.map((mission, index) => (
          <FadeIn key={mission.id} delay={index * 80}>
            <div className="group bg-surface rounded-2xl p-5 shadow-sm ring-1 ring-border-light transition-all duration-300 hover:shadow-lg hover:shadow-primary/[0.07] hover:ring-primary/20 active:scale-[0.98]">
              <div className="flex items-start gap-4">
                <span
                  className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center text-lg shadow-sm"
                  role="img"
                  aria-hidden="true"
                >
                  {getIcon(mission.Titre)}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-medium text-text mb-1 group-hover:text-primary transition-colors duration-200">
                    {mission.Titre}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {mission.Description}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
