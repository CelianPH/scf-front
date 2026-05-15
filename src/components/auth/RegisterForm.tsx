"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

export default function RegisterForm() {
  const router = useRouter();
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cgu, setCgu] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 10) {
      setError("Le mot de passe doit faire au moins 10 caractères");
      return;
    }
    setError(null);
    setLoading(true);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prenom, nom, email, password, cguAccepted: cgu }),
    });
    setLoading(false);
    if (!res.ok) {
      const { error: msg } = await res.json();
      setError(msg ?? "Erreur d'inscription");
      return;
    }
    router.push("/inscription/verifier-email");
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <span className="text-sm font-semibold text-text">Prénom</span>
          <input
            required
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-surface px-4 py-2.5 text-base outline-none focus:border-primary"
            autoComplete="given-name"
          />
        </label>
        <label className="block">
          <span className="text-sm font-semibold text-text">Nom</span>
          <input
            required
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-surface px-4 py-2.5 text-base outline-none focus:border-primary"
            autoComplete="family-name"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-sm font-semibold text-text">Email</span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-md border border-border bg-surface px-4 py-2.5 text-base outline-none focus:border-primary"
          autoComplete="email"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-text">Mot de passe</span>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={10}
          className="mt-1 w-full rounded-md border border-border bg-surface px-4 py-2.5 text-base outline-none focus:border-primary"
          autoComplete="new-password"
        />
        <PasswordStrengthMeter password={password} />
        <p className="mt-1 text-xs text-text-muted">Min 10 caractères.</p>
      </label>

      <label className="flex items-start gap-2 text-sm">
        <input
          required
          type="checkbox"
          checked={cgu}
          onChange={(e) => setCgu(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-border accent-primary"
        />
        <span className="text-text-secondary">
          J&apos;accepte les{" "}
          <Link href="/mentions-legales" className="text-primary underline">
            CGU
          </Link>{" "}
          et la{" "}
          <Link href="/politique-de-confidentialite" className="text-primary underline">
            politique de confidentialité
          </Link>
        </span>
      </label>

      {error ? (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary via-primary-vif to-primary px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-primary/30 transition hover:-translate-y-0.5 disabled:opacity-50"
      >
        {loading ? "Création…" : "Créer mon compte"}
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </button>

      <p className="text-center text-sm text-text-secondary">
        Déjà un compte ?{" "}
        <Link href="/connexion" className="font-semibold text-primary">
          Se connecter
        </Link>
      </p>
    </form>
  );
}
