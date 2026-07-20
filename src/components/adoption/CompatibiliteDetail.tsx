"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Sparkles } from "lucide-react";
import type { ChatScore, CompatibiliteResponse } from "@/types/strapi";
import {
  IconeRessenti,
  JaugeNiveau,
  LIBELLE_NIVEAU,
} from "./compatibilite-ui";

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
          Découvre ta compatibilité
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
          Complète ton profil pour voir ta compatibilité avec {" "}
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
  // Les raisons qui portent : atouts d'abord, puis quelques points neutres,
  // sans jamais montrer de chiffre.
  const raisons = [...score.criteres]
    .filter((c) => c.ressenti !== "attention")
    .sort((a, b) => Number(b.ressenti === "atout") - Number(a.ressenti === "atout"))
    .slice(0, 3);

  return (
    <div className="mt-4 rounded-2xl bg-surface p-5 ring-1 ring-border">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-text">
          {LIBELLE_NIVEAU[score.niveau]}
        </p>
        <JaugeNiveau niveau={score.niveau} />
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

      <ul className="mt-3 space-y-1.5 text-sm text-text-secondary">
        {raisons.map((c) => (
          <li key={c.code} className="flex items-start gap-2">
            <IconeRessenti ressenti={c.ressenti} />
            <span>{c.detail}</span>
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
