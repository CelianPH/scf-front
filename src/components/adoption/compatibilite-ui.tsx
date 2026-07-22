import { Check, AlertTriangle, Minus } from "lucide-react";
import type {
  ChatScore,
  CategorieCritere,
  NiveauCompatibilite,
  Ressenti,
} from "@/types/strapi";

/**
 * Vocabulaire et styles partagés de la compatibilité, sans aucun chiffre.
 * Centralisé ici pour que la carte de swipe, le badge d'adoption et l'encart
 * de fiche parlent d'une seule voix.
 */

/** Libellé long du niveau (encart fiche, récap). */
export const LIBELLE_NIVEAU: Record<NiveauCompatibilite, string> = {
  excellent: "Excellente compatibilité",
  bon: "Bonne compatibilité",
  moyen: "Compatibilité moyenne",
  faible: "Compatibilité limitée",
};

/** Libellé court du niveau (badge de carte, contrainte de place). */
export const LIBELLE_NIVEAU_COURT: Record<NiveauCompatibilite, string> = {
  excellent: "Très compatible",
  bon: "Compatible",
  moyen: "À discuter",
  faible: "Peu compatible",
};

/** Couleur d'accent du niveau (pastilles, jauge, badge). */
export const COULEUR_NIVEAU: Record<NiveauCompatibilite, string> = {
  excellent: "bg-green-600",
  bon: "bg-primary",
  moyen: "bg-amber-500",
  faible: "bg-text-muted",
};

/** Nombre de crans remplis de la jauge segmentée, par niveau. */
export const CRANS_NIVEAU: Record<NiveauCompatibilite, number> = {
  faible: 1,
  moyen: 2,
  bon: 3,
  excellent: 4,
};

/** Priorité des catégories : le bien-être du chat prime sur les préférences. */
const RANG_CATEGORIE: Record<CategorieCritere, number> = {
  bien_etre: 0,
  capacite: 1,
  preference: 2,
};

/**
 * Les meilleures raisons pour lesquelles ce chat va bien avec l'adoptant.
 * Uniquement les critères vécus comme des atouts, priorité au bien-être.
 */
export function raisonsPositives(score: ChatScore, n = 3): string[] {
  return score.criteres
    .filter((c) => c.ressenti === "atout")
    .sort((a, b) => RANG_CATEGORIE[a.categorie] - RANG_CATEGORIE[b.categorie])
    .slice(0, n)
    .map((c) => c.detail);
}

/**
 * Les points qui coincent : les critères vécus comme des points d'attention,
 * priorité au bien-être du chat. Chaque phrase se suffit à elle-même (elle ne
 * nomme pas le chat, déjà affiché au-dessus de la liste) et dit le point une
 * seule fois.
 */
export function raisonsNegatives(score: ChatScore): string[] {
  return score.criteres
    .filter((c) => c.ressenti === "attention")
    .sort((a, b) => RANG_CATEGORIE[a.categorie] - RANG_CATEGORIE[b.categorie])
    .map((c) => c.detail);
}

/** Jauge segmentée en 4 crans — un repère visuel sans révéler de nombre. */
export function JaugeNiveau({ niveau }: { niveau: NiveauCompatibilite }) {
  const remplis = CRANS_NIVEAU[niveau];
  return (
    <div
      className="flex gap-1"
      role="img"
      aria-label={LIBELLE_NIVEAU[niveau]}
    >
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-8 rounded-full ${
            i < remplis ? COULEUR_NIVEAU[niveau] : "bg-bg-alt"
          }`}
        />
      ))}
    </div>
  );
}

/** Icône d'un critère selon son ressenti. */
export function IconeRessenti({ ressenti }: { ressenti: Ressenti }) {
  if (ressenti === "atout") {
    return <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden="true" />;
  }
  if (ressenti === "attention") {
    return <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" aria-hidden="true" />;
  }
  return <Minus className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />;
}
