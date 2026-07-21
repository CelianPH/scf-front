"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";

interface Props {
  chatSlug: string;
  chatNom: string;
  /**
   * Renseigné quand ce chat est incompatible avec le profil : on affiche les
   * raisons et on exige une justification, transmise au bénévole référent.
   */
  incompatibilite: { alertes: string[]; problemes: string[] } | null;
}

export default function DemandeForm({ chatSlug, chatNom, incompatibilite }: Props) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [justification, setJustification] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Les problèmes à afficher : les alertes fortes d'abord, puis les points
  // d'attention non déjà couverts.
  const raisons = incompatibilite
    ? [
        ...incompatibilite.alertes,
        ...incompatibilite.problemes.filter(
          (p) => !incompatibilite.alertes.includes(p)
        ),
      ]
    : [];

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (message.length < 20) {
      setError("Le message doit faire au moins 20 caractères.");
      return;
    }
    if (incompatibilite && justification.trim().length < 20) {
      setError(
        "Explique en quelques mots (20 caractères minimum) comment tu comptes gérer les points d'attention."
      );
      return;
    }
    setError(null);
    setSubmitting(true);
    const res = await fetch("/api/demandes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatSlug,
        message,
        dateRencontreSouhaitee: date || null,
        ...(incompatibilite
          ? { justificationIncompatibilite: justification }
          : {}),
      }),
    });
    setSubmitting(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(
        data?.error?.message ??
          data?.error ??
          (res.status >= 500
            ? "Le service est momentanément indisponible."
            : "Erreur lors de l'envoi de la demande.")
      );
      return;
    }
    router.push("/compte/demandes?success=1");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {incompatibilite && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-amber-900">
            <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
            Ce chat présente des incompatibilités avec ton profil
          </p>
          {raisons.length > 0 && (
            <ul className="mt-2 space-y-1 text-sm text-amber-800">
              {raisons.map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                  {r}
                </li>
              ))}
            </ul>
          )}
          <p className="mt-2 text-sm text-amber-800">
            Tu peux tout de même candidater : explique ci-dessous comment tu
            comptes gérer ces points. Le bénévole référent en tiendra compte.
          </p>
        </div>
      )}

      <label className="block">
        <span className="text-sm font-semibold text-text">
          Pourquoi {chatNom} ? (min 20 caractères)
        </span>
        <textarea
          required
          minLength={20}
          maxLength={2000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="mt-1 w-full rounded-md border border-border bg-surface px-4 py-3 text-base text-text outline-none focus:border-primary"
          placeholder="Parle-nous de ton foyer, de tes attentes, de pourquoi tu penses être la bonne personne pour ce chat…"
        />
        <p className="mt-1 text-xs text-text-muted">{message.length}/2000</p>
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-text">
          Quand veux-tu venir le rencontrer ? (optionnel)
        </span>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 w-full rounded-md border border-border bg-surface px-4 py-2.5 text-base text-text outline-none focus:border-primary"
        />
      </label>

      {incompatibilite && (
        <label className="block">
          <span className="text-sm font-semibold text-text">
            Comment comptes-tu gérer ces points ? (20 caractères minimum)
          </span>
          <textarea
            required
            minLength={20}
            maxLength={2000}
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            rows={4}
            className="mt-1 w-full rounded-md border border-amber-300 bg-amber-50/40 px-4 py-3 text-base text-text outline-none focus:border-amber-500"
            placeholder="Par exemple : sécuriser un espace extérieur, adapter le foyer, encadrer la cohabitation…"
          />
          <p className="mt-1 text-xs text-text-muted">{justification.length}/2000</p>
        </label>
      )}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-gradient-to-r from-primary to-primary-vif px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-primary/30 hover:-translate-y-0.5 disabled:opacity-50"
      >
        {submitting ? "Envoi…" : "Envoyer ma demande"}
      </button>
    </form>
  );
}
