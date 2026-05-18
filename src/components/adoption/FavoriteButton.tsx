"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  slug: string;
  catName: string;
  fullWidth?: boolean;
}

const STORAGE_KEY = "scf:favorites";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function write(list: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    /* quota or private mode — ignore */
  }
}

export default function FavoriteButton({ slug, catName, fullWidth = true }: FavoriteButtonProps) {
  const [active, setActive] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setActive(read().includes(slug));
    setHydrated(true);
  }, [slug]);

  function toggle() {
    const list = read();
    const next = list.includes(slug)
      ? list.filter((s) => s !== slug)
      : [...list, slug];
    write(next);
    setActive(next.includes(slug));
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={active}
      aria-label={
        active
          ? `Retirer ${catName} de mes favoris`
          : `Ajouter ${catName} à mes favoris`
      }
      className={`group inline-flex items-center justify-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-semibold transition duration-200 ease-out hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${fullWidth ? "w-full" : ""} ${
        active
          ? "border-primary bg-primary-50 text-primary"
          : "border-border bg-surface text-text hover:border-primary/40"
      }`}
    >
      <Heart
        className={`h-4 w-4 transition-transform duration-200 ${
          active ? "fill-primary text-primary scale-110" : "text-text-secondary group-hover:text-primary"
        }`}
        aria-hidden="true"
      />
      <span suppressHydrationWarning>
        {hydrated && active ? "Dans mes favoris" : "Ajouter en favoris"}
      </span>
    </button>
  );
}
