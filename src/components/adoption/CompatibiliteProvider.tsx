"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ChatScore, CompatibiliteResponse } from "@/types/strapi";

/** État du calcul de compatibilité pour le visiteur courant. */
type EtatCompat =
  | { statut: "chargement" }
  /** Visiteur non connecté : aucun badge, l'UI reste celle d'aujourd'hui. */
  | { statut: "anonyme" }
  /** Connecté mais socle du profil incomplet : on invite à le compléter. */
  | { statut: "profil_incomplet"; champsManquants: string[] }
  /** Scores disponibles, indexés par slug. */
  | { statut: "pret"; scores: Map<string, ChatScore> };

const CompatibiliteContext = createContext<EtatCompat>({ statut: "chargement" });

/**
 * Charge une seule fois la compatibilité de tous les chats adoptables et la
 * met à disposition des cartes. Un seul appel réseau pour toute la liste,
 * plutôt qu'un par carte.
 */
export function CompatibiliteProvider({ children }: { children: ReactNode }) {
  const [etat, setEtat] = useState<EtatCompat>({ statut: "chargement" });

  useEffect(() => {
    let annule = false;

    fetch("/api/compatibilite", { cache: "no-store" })
      .then((r) => r.json().catch(() => null) as Promise<CompatibiliteResponse | null>)
      .then((res) => {
        if (annule) return;
        // `data: null` => visiteur anonyme (cf. route handler).
        if (!res || res.data === null) {
          setEtat({ statut: "anonyme" });
          return;
        }
        if (!res.meta?.profilComplet) {
          setEtat({
            statut: "profil_incomplet",
            champsManquants: res.meta?.champsManquants ?? [],
          });
          return;
        }
        setEtat({
          statut: "pret",
          scores: new Map(res.data.map((s) => [s.slug, s])),
        });
      })
      .catch(() => {
        if (!annule) setEtat({ statut: "anonyme" });
      });

    return () => {
      annule = true;
    };
  }, []);

  return (
    <CompatibiliteContext.Provider value={etat}>
      {children}
    </CompatibiliteContext.Provider>
  );
}

/** État global de la compatibilité (chargement / anonyme / incomplet / prêt). */
export function useCompatibiliteEtat(): EtatCompat {
  return useContext(CompatibiliteContext);
}

/** Score d'un chat précis, ou `null` tant qu'il n'est pas disponible. */
export function useCompatibilite(slug: string): ChatScore | null {
  const etat = useContext(CompatibiliteContext);
  return useMemo(
    () => (etat.statut === "pret" ? etat.scores.get(slug) ?? null : null),
    [etat, slug]
  );
}
