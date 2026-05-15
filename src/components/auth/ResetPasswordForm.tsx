"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

export default function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const code = params.get("code") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 10) {
      setError("Le mot de passe doit faire au moins 10 caractères");
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, password, passwordConfirmation: confirm }),
    });
    setLoading(false);
    if (!res.ok) {
      const { error: msg } = await res.json();
      setError(msg ?? "Lien invalide ou expiré");
      return;
    }
    router.push("/compte");
  }

  if (!code) {
    return (
      <p className="text-sm text-red-600">
        Lien invalide. Réessaie depuis /mot-de-passe-oublie.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="text-sm font-semibold text-text">Nouveau mot de passe</span>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          className="mt-1 w-full rounded-md border border-border bg-surface px-4 py-2.5 text-base outline-none focus:border-primary"
        />
        <PasswordStrengthMeter password={password} />
      </label>
      <label className="block">
        <span className="text-sm font-semibold text-text">Confirmer</span>
        <input
          required
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          autoComplete="new-password"
          className="mt-1 w-full rounded-md border border-border bg-surface px-4 py-2.5 text-base outline-none focus:border-primary"
        />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-primary/30 transition hover:-translate-y-0.5 disabled:opacity-50"
      >
        {loading ? "Enregistrement…" : "Réinitialiser le mot de passe"}
      </button>
    </form>
  );
}
