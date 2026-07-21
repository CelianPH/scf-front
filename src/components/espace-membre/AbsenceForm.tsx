"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { CalendarOff, Calendar, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
      <div className="overflow-hidden rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-200">
        <div className="flex items-start gap-3">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
            <CalendarOff className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-lg font-bold text-amber-900">
              Tu es déclaré·e absent·e
            </p>
            <p className="mt-1 text-sm leading-relaxed text-amber-900/90">
              Tes demandes sont redirigées vers tes référent·es de secours.
              {benevole.absenceDebut || benevole.absenceFin ? (
                <>
                  {" "}
                  Période :{" "}
                  <span className="font-semibold">
                    {benevole.absenceDebut
                      ? new Date(benevole.absenceDebut).toLocaleDateString(
                          "fr-FR"
                        )
                      : "…"}{" "}
                    →{" "}
                    {benevole.absenceFin
                      ? new Date(benevole.absenceFin).toLocaleDateString(
                          "fr-FR"
                        )
                      : "…"}
                  </span>
                  .
                </>
              ) : null}
              {benevole.absenceMotif
                ? ` Motif : ${benevole.absenceMotif}.`
                : ""}
            </p>
          </div>
        </div>

        {erreur ? (
          <p role="alert" className="mt-3 text-sm text-red-700">
            {erreur}
          </p>
        ) : null}

        <Button
          variant="primary"
          size="md"
          iconLeft={Check}
          disabled={isPending}
          onClick={() => envoyer(false)}
          className="mt-5"
        >
          Je suis de retour
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-border">
      <div className="flex items-start gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-50 text-primary">
          <CalendarOff className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="font-display text-lg font-bold text-text">
            Déclarer une absence
          </p>
          <p className="mt-1 text-sm text-text-secondary">
            Pendant ton absence, les demandes des chats dont tu es
            référent·e basculent vers tes référent·es de secours.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div>
          <label
            htmlFor="absence-debut"
            className="text-xs font-semibold uppercase tracking-wider text-text-muted"
          >
            Du (facultatif)
          </label>
          <div className="relative mt-1.5">
            <Calendar
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
              aria-hidden="true"
            />
            <input
              id="absence-debut"
              type="date"
              value={debut}
              onChange={(e) => setDebut(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-3 text-sm text-text outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="absence-fin"
            className="text-xs font-semibold uppercase tracking-wider text-text-muted"
          >
            Au (facultatif)
          </label>
          <div className="relative mt-1.5">
            <Calendar
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
              aria-hidden="true"
            />
            <input
              id="absence-fin"
              type="date"
              value={fin}
              onChange={(e) => setFin(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface py-2.5 pl-10 pr-3 text-sm text-text outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
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
          className="mt-1.5 w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-text-muted outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>

      {erreur ? (
        <p role="alert" className="mt-3 text-sm text-red-700">
          {erreur}
        </p>
      ) : null}

      <Button
        variant="outlined-primary"
        size="md"
        iconLeft={CalendarOff}
        disabled={isPending}
        onClick={() => envoyer(true)}
        className="mt-5"
      >
        Me déclarer absent·e
      </Button>
      <p className="mt-2 text-xs text-text-muted">
        Sans dates, l&apos;absence court jusqu&apos;à ton retour.
      </p>
    </div>
  );
}
