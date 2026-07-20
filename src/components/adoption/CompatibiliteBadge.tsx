"use client";

import { Heart } from "lucide-react";
import { useCompatibilite } from "./CompatibiliteProvider";
import { COULEUR_NIVEAU, LIBELLE_NIVEAU, LIBELLE_NIVEAU_COURT } from "./compatibilite-ui";

/**
 * Pastille de compatibilité affichée sur une carte chat. Ne rend rien tant que
 * le score n'est pas disponible (visiteur anonyme, profil incomplet, ou
 * chargement) : la carte reste alors strictement identique à aujourd'hui.
 *
 * Volontairement qualitative — pas de pourcentage : l'adoptant n'a pas le
 * barème, un chiffre l'inviterait à « optimiser » sans rien lui apprendre.
 */
export default function CompatibiliteBadge({ slug }: { slug: string }) {
  const score = useCompatibilite(slug);
  if (!score) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-sm ${COULEUR_NIVEAU[score.niveau]}`}
      title={LIBELLE_NIVEAU[score.niveau]}
    >
      <Heart className="h-3 w-3" aria-hidden="true" />
      {LIBELLE_NIVEAU_COURT[score.niveau]}
    </span>
  );
}
