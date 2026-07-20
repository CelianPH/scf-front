"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Sparkles } from "lucide-react";
import type {
  ChatScore,
  CompatibiliteResponse,
  NiveauCompatibilite,
} from "@/types/strapi";

/** Couleurs de la jauge par niveau (cohérentes avec le badge de carte). */
const COULEUR_JAUGE: Record<NiveauCompatibilite, string> = {
  excellent: "bg-green-600",
  bon: "bg-primary",
  moyen: "bg-amber-500",
  faible: "bg-text-muted",
};

const LIBELLE_NIVEAU: Record<NiveauCompatibilite, string> = {
  excellent: "Excellente compatibilité",
  bon: "Bonne compatibilité",
  moyen: "Compatibilité moyenne",
  faible: "Compatibilité faible",
};

type Etat =
  | { statut: "chargement" }
  | { statut: "anonyme" }
  | { statut: "profil_incomplet"; champsManquants: string[] }
  | { statut: "pret"; score: ChatScore }
  /** Connecté, profil complet, mais aucun score pour ce chat (non adoptable). */
  | { statut: "absent" };

/**
 * Encart de compatibilité sur la fiche d'un chat. Autonome : il fait son propre
 * appel filtré sur le slug (la fiche est un Server Component sans provider).
 * Reste discret pour un visiteur anonyme (ne rend rien).
 */
export default function CompatibiliteDetail({ slug }: { slug: string }) {
  const [etat, setEtat] = useState<Etat>({ statut: "chargement" });

  useEffect(() => {
    let annule = false;

    fetch(`/api/compatibilite?slug=${encodeURIComponent(slug)}`, {
      cache: "no-store",
    })
      .then((r) => r.json().catch(() => null) as Promise<CompatibiliteResponse | null>)
      .then((res) => {
        if (annule) return;
        if (!res || res.data === null) return setEtat({ statut: "anonyme" });
        if (!res.meta?.profilComplet) {
          return setEtat({
            statut: "profil_incomplet",
            champsManquants: res.meta?.champsManquants ?? [],
          });
        }
        const score = res.data[0];
        setEtat(score ? { statut: "pret", score } : { statut: "absent" });
      })
      .catch(() => {
        if (!annule) setEtat({ statut: "anonyme" });
      });

    return () => {
      annule = true;
    };
  }, [slug]);

  if (etat.statut === "chargement" || etat.statut === "anonyme" || etat.statut === "absent") {
    return null;
  }

  if (etat.statut === "profil_incomplet") {
    return (
      <div className="mt-4 rounded-2xl bg-surface p-5 ring-1 ring-border">
        <p className="flex items-center gap-2 text-sm font-semibold text-text">
          <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
          Découvrez votre compatibilité
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
          Complétez votre profil pour voir votre pourcentage de compatibilité
          avec {" "}
          {etat.champsManquants.length > 0
            ? `ce chat. Il manque ${etat.champsManquants.join(", ")}.`
            : "ce chat."}
        </p>
        <Link
          href="/compte/profil"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-[gap]"
        >
          Compléter mon profil
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  const { score } = etat;
  // Contributions les plus fortes, hors critères parfaitement neutres.
  const forces = [...score.criteres]
    .filter((c) => c.max > 0)
    .sort((a, b) => b.points / b.max - a.points / a.max)
    .slice(0, 3);

  return (
    <div className="mt-4 rounded-2xl bg-surface p-5 ring-1 ring-border">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-text">
          {LIBELLE_NIVEAU[score.niveau]}
        </p>
        <span className="font-display text-2xl font-bold text-text">
          {score.score}
          <span className="text-base font-semibold text-text-secondary">%</span>
        </span>
      </div>

      <div
        className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-bg-alt"
        role="progressbar"
        aria-valuenow={score.score}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Compatibilité avec votre profil"
      >
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${COULEUR_JAUGE[score.niveau]}`}
          style={{ width: `${score.score}%` }}
        />
      </div>

      {score.alertes.length > 0 && (
        <ul className="mt-3 space-y-1.5">
          {score.alertes.map((a) => (
            <li
              key={a}
              className="flex items-start gap-2 text-sm text-amber-700"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {a}
            </li>
          ))}
        </ul>
      )}

      <ul className="mt-3 space-y-1 text-sm text-text-secondary">
        {forces.map((c) => (
          <li key={c.code} className="flex items-center justify-between gap-3">
            <span>{c.libelle}</span>
            <span className="font-medium text-text">
              {c.points}/{c.max}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs leading-relaxed text-text-muted">
        Indicateur informatif : c&apos;est l&apos;équipe qui valide chaque
        adoption après échange.
      </p>
    </div>
  );
}
