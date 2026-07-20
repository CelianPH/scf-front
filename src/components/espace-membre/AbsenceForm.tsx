"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CalendarOff, Check } from "lucide-react";
import type { Benevole } from "@/types/strapi";

interface AbsenceFormProps {
  benevole: Benevole;
}

export default function AbsenceForm({ benevole }: AbsenceFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [debut, setDebut] = useState(benevole.absenceDebut ?? "");
  const [fin, setFin] = useState(benevole.absenceFin ?? "");
  const [motif, setMotif] = useState(benevole.absenceMotif ?? "");
  const [erreur, setErreur] = useState<string | null>(null);

  async function envoyer(absent: boolean) {
    setErreur(null);

    if (absent && debut && fin && fin < debut) {
      setErreur("La date de fin ne peut pas précéder la date de début.");
      return;
    }

    const res = await fetch("/api/espace-membre/absence", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        absent
          ? {
              absent: true,
              absenceDebut: debut || null,
              absenceFin: fin || null,
              absenceMotif: motif.trim() || null,
            }
          : { absent: false }
      ),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      setErreur(
        body?.error?.message ?? "L'absence n'a pas pu être enregistrée."
      );
      return;
    }

    if (!absent) {
      setDebut("");
      setFin("");
      setMotif("");
    }
    startTransition(() => router.refresh());
  }

  if (benevole.absent) {
    return (
      <div className="rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
        <p className="flex items-center gap-2 font-display text-lg font-bold text-amber-900">
          <CalendarOff className="h-5 w-5" />
          Tu es déclaré·e absent·e
        </p>
        <p className="mt-1 text-sm text-amber-900">
          Tes demandes sont redirigées vers tes référent·es de secours.
          {benevole.absenceDebut || benevole.absenceFin ? (
            <>
              {" "}
              Période :{" "}
              {benevole.absenceDebut
                ? new Date(benevole.absenceDebut).toLocaleDateString("fr-FR")
                : "…"}{" "}
              →{" "}
              {benevole.absenceFin
                ? new Date(benevole.absenceFin).toLocaleDateString("fr-FR")
                : "…"}
              .
            </>
          ) : null}
          {benevole.absenceMotif ? ` Motif : ${benevole.absenceMotif}.` : ""}
        </p>

        {erreur ? (
          <p role="alert" className="mt-2 text-sm text-red-700">
            {erreur}
          </p>
        ) : null}

        <button
          type="button"
          disabled={isPending}
          onClick={() => envoyer(false)}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:opacity-60"
        >
          <Check className="h-4 w-4" />
          Je suis de retour
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-surface p-5 ring-1 ring-border">
      <p className="font-display text-lg font-bold text-text">
        Déclarer une absence
      </p>
      <p className="mt-1 text-sm text-text-secondary">
        Pendant ton absence, les demandes des chats dont tu es référent·e
        basculent vers tes référent·es de secours.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div>
          <label
            htmlFor="absence-debut"
            className="text-xs font-semibold uppercase tracking-wider text-text-muted"
          >
            Du (facultatif)
          </label>
          <input
            id="absence-debut"
            type="date"
            value={debut}
            onChange={(e) => setDebut(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label
            htmlFor="absence-fin"
            className="text-xs font-semibold uppercase tracking-wider text-text-muted"
          >
            Au (facultatif)
          </label>
          <input
            id="absence-fin"
            type="date"
            value={fin}
            onChange={(e) => setFin(e.target.value)}
            className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="mt-3">
        <label
          htmlFor="absence-motif"
          className="text-xs font-semibold uppercase tracking-wider text-text-muted"
        >
          Motif (facultatif)
        </label>
        <input
          id="absence-motif"
          type="text"
          value={motif}
          onChange={(e) => setMotif(e.target.value)}
          placeholder="Ex : congés, indisponibilité ponctuelle"
          className="mt-1.5 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {erreur ? (
        <p role="alert" className="mt-2 text-sm text-red-700">
          {erreur}
        </p>
      ) : null}

      <button
        type="button"
        disabled={isPending}
        onClick={() => envoyer(true)}
        className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-surface px-5 py-2.5 text-sm font-semibold text-text ring-1 ring-border transition hover:bg-bg-alt disabled:opacity-60"
      >
        <CalendarOff className="h-4 w-4" />
        Me déclarer absent·e
      </button>
      <p className="mt-2 text-xs text-text-muted">
        Sans dates, l&apos;absence court jusqu&apos;à ton retour.
      </p>
    </div>
  );
}
