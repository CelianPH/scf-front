"use client";

import { useState } from "react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setSent(true);
  }

  if (sent) {
    return (
      <p className="rounded-md bg-primary-50 px-4 py-3 text-sm text-primary-dark">
        Si un compte existe pour <strong>{email}</strong>, un lien de
        réinitialisation a été envoyé. Vérifie ta boîte mail.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
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
      <button
        type="submit"
        className="w-full rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-primary/30 transition hover:-translate-y-0.5"
      >
        Envoyer le lien
      </button>
    </form>
  );
}
