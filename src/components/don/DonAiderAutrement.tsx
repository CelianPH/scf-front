import Reveal from "@/components/layout/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Section } from "@/components/ui/Section";
import type { DonAutresActions as DonAutresActionsData } from "@/types/strapi";

interface DonAiderAutrementProps {
  data: DonAutresActionsData;
}

/** Liens de secours si aucune action non-matérielle n'est renseignée côté Strapi. */
const LIENS_FALLBACK = [
  { id: "adherer", label: "Adhérer", href: "/a-propos", external: false },
  { id: "benevole", label: "Devenir bénévole", href: "/a-propos", external: false },
];

export default function DonAiderAutrement({ data }: DonAiderAutrementProps) {
  // On garde les façons d'aider « autrement » : tout sauf le don matériel (mailto).
  const liens = data.actions
    .filter((a) => !a.cta.href.startsWith("mailto:"))
    .map((a) => ({
      id: String(a.id),
      label: a.cta.label,
      href: a.cta.href,
      external: a.cta.external,
    }));

  const items = liens.length > 0 ? liens : LIENS_FALLBACK;

  return (
    <Section
      aria-label="Autres façons de soutenir l'association"
      bg="bg"
      size="compact"
      className="border-t border-border"
    >
      <Reveal className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-center">
        <span className="text-sm font-medium text-text-secondary md:text-base">
          Vous pouvez aussi aider autrement :
        </span>
        {items.map((lien) => (
          <ArrowLink
            key={lien.id}
            href={lien.href}
            external={lien.external}
            tone="secondary"
            size="md"
          >
            {lien.label}
          </ArrowLink>
        ))}
      </Reveal>
    </Section>
  );
}
