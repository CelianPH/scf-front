"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/compte";
  const confirmed = params.get("confirmed") === "1";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const { error: msg } = await res.json();
      setError(msg ?? "Identifiants invalides");
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {confirmed ? (
        <p className="rounded-md bg-primary-50 px-4 py-3 text-sm text-primary-dark">
          ✓ Email confirmé. Tu peux te connecter.
        </p>
      ) : null}

      <label className="block">
        <span className="text-sm font-semibold text-text">Email</span>
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          className="mt-1 w-full rounded-md border border-border bg-surface px-4 py-2.5 text-base outline-none focus:border-primary"
        />
      </label>

      <label className="block">
        <span className="text-sm font-semibold text-text">Mot de passe</span>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          className="mt-1 w-full rounded-md border border-border bg-surface px-4 py-2.5 text-base outline-none focus:border-primary"
        />
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
        {loading ? "Connexion…" : "Se connecter"}
        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
      </button>

      <div className="flex justify-between text-sm">
        <Link href="/mot-de-passe-oublie" className="text-text-secondary hover:text-primary">
          Mot de passe oublié ?
        </Link>
        <Link href="/inscription" className="font-semibold text-primary">
          Créer un compte
        </Link>
      </div>
    </form>
  );
}
