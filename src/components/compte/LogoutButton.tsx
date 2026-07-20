"use client";

import { LogOut } from "lucide-react";

export default function LogoutButton() {
  async function onClick() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-xl border-2 border-red-200 bg-red-50 px-5 py-3 text-base font-semibold text-red-700 transition hover:bg-red-100"
    >
      <LogOut className="h-5 w-5" />
      Se déconnecter
    </button>
  );
}
