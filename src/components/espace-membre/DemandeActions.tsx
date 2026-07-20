"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { DemandeStatut } from "@/types/strapi";

interface DemandeActionsProps {
  demandeId: number;
  statut: DemandeStatut;
}

/** Transitions proposées selon l'état courant. Une demande close est figée. */
const TRANSITIONS: Record<
  DemandeStatut,
  { statut: DemandeStatut; label: string; style: string }[]
> = {
  en_attente: [
    {
      statut: "en_cours",
      label: "Prendre en charge",
      style: "bg-primary text-white hover:bg-primary-dark",
    },
    {
      statut: "refusee",
      label: "Refuser",
      style: "bg-surface text-text ring-1 ring-border hover:bg-bg-alt",
    },
  ],
  en_cours: [
    {
      statut: "acceptee",
      label: "Accepter",
      style: "bg-green-600 text-white hover:bg-green-700",
    },
    {
      statut: "refusee",
      label: "Refuser",
      style: "bg-surface text-text ring-1 ring-border hover:bg-bg-alt",
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

  const transitions = TRANSITIONS[statut] ?? [];
  if (transitions.length === 0) return null;

  async function appliquer(nouveauStatut: DemandeStatut) {
    setErreur(null);

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
        className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
            disabled={isPending}
            onClick={() => appliquer(t.statut)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition disabled:opacity-60 ${t.style}`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
