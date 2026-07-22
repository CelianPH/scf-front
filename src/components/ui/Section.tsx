import { cn } from "@/lib/cn";

type SectionBg = "bg" | "bg-alt" | "secondary-50" | "dark";

/**
 * Rythme vertical de section — deux tailles seulement, pour remplacer les
 * échelles de `py` divergentes qui existaient section par section.
 * `default` : sections de contenu standard. `compact` : bandeaux plus denses
 * (statistiques, infos pratiques).
 */
type SectionSize = "default" | "compact";

interface SectionProps {
  /** Balise racine — `section` par défaut, `footer` pour le pied de page. */
  as?: "section" | "footer";
  /** Fond de la section (mappé sur les tokens de couleur du thème). */
  bg?: SectionBg;
  /** Rythme vertical normalisé. */
  size?: SectionSize;
  /** Classes ajoutées à la balise racine (fond custom, bordures…). */
  className?: string;
  /** Classes ajoutées au conteneur interne (largeur, alignement…). */
  innerClassName?: string;
  children: React.ReactNode;
  // Attributs ARIA d'étiquetage, passés tels quels à la balise racine.
  "aria-label"?: string;
  "aria-labelledby"?: string;
  id?: string;
}

const bgClasses: Record<SectionBg, string> = {
  bg: "bg-bg",
  "bg-alt": "bg-bg-alt",
  "secondary-50": "bg-secondary-50/60",
  dark: "border-t border-dark-lighter bg-dark text-white/80",
};

const sizeClasses: Record<SectionSize, string> = {
  default: "py-14 md:py-20",
  compact: "py-10 md:py-14",
};

/**
 * Conteneur de section partagé : largeur maximale, gouttières et rythme
 * vertical uniformes. Source unique de vérité pour la mise en page des
 * sections de page (voir DESIGN.md § Layout).
 */
export function Section({
  as: Tag = "section",
  bg = "bg",
  size = "default",
  className,
  innerClassName,
  children,
  id,
  ...aria
}: SectionProps) {
  return (
    <Tag id={id} className={cn(bgClasses[bg], className)} {...aria}>
      <div
        className={cn(
          "mx-auto max-w-7xl px-5 md:px-8",
          sizeClasses[size],
          innerClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
