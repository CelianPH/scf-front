"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  chatSlug: string;
  chatNom: string;
}

export default function DemandeForm({ chatSlug, chatNom }: Props) {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (message.length < 20) {
      setError("Le message doit faire au moins 20 caractères.");
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
      }),
    });
    setSubmitting(false);
    if (!res.ok) {
      const data = await res.json();
      setError(
        data.error?.message ??
          data.error ??
          "Erreur lors de l'envoi de la demande."
      );
      return;
    }
    router.push("/compte/demandes?success=1");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
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
