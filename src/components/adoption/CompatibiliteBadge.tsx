"use client";

import { useCompatibilite } from "./CompatibiliteProvider";
import type { NiveauCompatibilite } from "@/types/strapi";

/** Couleurs par niveau — cohérentes entre la carte, la fiche et /matching. */
const STYLES: Record<NiveauCompatibilite, string> = {
  excellent: "bg-green-600 text-white",
  bon: "bg-primary text-white",
  moyen: "bg-amber-500 text-white",
  faible: "bg-text-muted text-white",
};

/**
 * Pastille de compatibilité affichée sur une carte chat. Ne rend rien tant que
 * le score n'est pas disponible (visiteur anonyme, profil incomplet, ou
 * chargement) : la carte reste alors strictement identique à aujourd'hui.
 */
export default function CompatibiliteBadge({ slug }: { slug: string }) {
  const score = useCompatibilite(slug);
  if (!score) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold shadow-sm ${STYLES[score.niveau]}`}
      title={`Compatibilité ${score.score}% avec votre profil`}
    >
      {score.score}%
      <span className="font-medium opacity-90">compatible</span>
    </span>
  );
}
