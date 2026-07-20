"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, X, type LucideIcon } from "lucide-react";
import type { DemandeStatut } from "@/types/strapi";

interface DemandeActionsProps {
  demandeId: number;
  statut: DemandeStatut;
}

/** Transitions proposées selon l'état courant. Une demande close est figée. */
const TRANSITIONS: Record<
  DemandeStatut,
  { statut: DemandeStatut; label: string; style: string; icon: LucideIcon }[]
> = {
  en_attente: [
    {
      statut: "en_cours",
      label: "Prendre en charge",
      style: "bg-primary text-white shadow-sm shadow-primary/25 hover:bg-primary-dark",
      icon: ArrowRight,
    },
    {
      statut: "refusee",
      label: "Refuser",
      style: "bg-surface text-text ring-1 ring-border hover:bg-bg-alt",
      icon: X,
    },
  ],
  en_cours: [
    {
      statut: "acceptee",
      label: "Accepter",
      style: "bg-green-600 text-white shadow-sm shadow-green-600/25 hover:bg-green-700",
      icon: Check,
    },
    {
      statut: "refusee",
      label: "Refuser",
      style: "bg-surface text-text ring-1 ring-border hover:bg-bg-alt",
      icon: X,
    },
  ],
  acceptee: [],
  refusee: [],
};

export default function DemandeActions({
  demandeId,
  statut,
}: DemandeActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [reponse, setReponse] = useState("");
  const [erreur, setErreur] = useState<string | null>(null);
  const [envoiEnCours, setEnvoiEnCours] = useState(false);

  const transitions = TRANSITIONS[statut] ?? [];
  if (transitions.length === 0) return null;

  async function appliquer(nouveauStatut: DemandeStatut) {
    // `isPending` ne couvre que le rafraîchissement : sans ce garde, un double
    // clic envoie deux PUT, dont le second échoue sur une demande déjà close.
    if (envoiEnCours) return;

    setErreur(null);
    setEnvoiEnCours(true);

    try {
      const res = await fetch(`/api/demandes/${demandeId}/statut`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          statut: nouveauStatut,
          ...(reponse.trim() ? { reponseBenevole: reponse.trim() } : {}),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        setErreur(
          body?.error?.message ??
            "Le statut n'a pas pu être mis à jour. Réessaie."
        );
        return;
      }

      setReponse("");
      startTransition(() => router.refresh());
    } catch {
      setErreur("Connexion impossible. Vérifie ta connexion et réessaie.");
    } finally {
      setEnvoiEnCours(false);
    }
  }

  return (
    <div className="mt-4 border-t border-border pt-4">
      <label
        htmlFor={`reponse-${demandeId}`}
        className="text-xs font-semibold uppercase tracking-wider text-text-muted"
      >
        Message à l&apos;adoptant (facultatif)
      </label>
      <textarea
        id={`reponse-${demandeId}`}
        value={reponse}
        onChange={(e) => setReponse(e.target.value)}
        rows={2}
        placeholder="Ex : on te propose une rencontre samedi après-midi."
        className="mt-1.5 w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />

      {erreur ? (
        <p role="alert" className="mt-2 text-sm text-red-700">
          {erreur}
        </p>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-2">
        {transitions.map((t) => (
          <button
            key={t.statut}
            type="button"
            disabled={isPending || envoiEnCours}
            onClick={() => appliquer(t.statut)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 ${t.style}`}
          >
            <t.icon className="h-4 w-4" aria-hidden="true" />
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
