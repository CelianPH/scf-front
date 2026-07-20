"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  slug: string;
  catName: string;
  fullWidth?: boolean;
}

const STORAGE_KEY = "scf:favorites";

function readLocal(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeLocal(list: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {}
}

export default function FavoriteButton({ slug, catName, fullWidth = true }: FavoriteButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [authed, setAuthed] = useState<boolean | null>(null);

  // Check auth + initial state
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const me = await fetch("/api/auth/me", { cache: "no-store" });
      const isAuth = me.ok;
      if (cancelled) return;
      setAuthed(isAuth);

      if (isAuth) {
        // Source de vérité : DB. On compare localStorage et on sync.
        const local = readLocal();
        const dbRes = await fetch("/api/auth/favoris");
        const dbData = await dbRes.json();
        const dbSlugs: string[] = (dbData.data ?? []).map((c: any) => c.slug);

        // Merge : si localStorage a des slugs non présents en DB, on les ajoute
        const toAdd = local.filter((s) => !dbSlugs.includes(s));
        for (const s of toAdd) {
          await fetch("/api/auth/favoris", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chatSlug: s }),
          });
          dbSlugs.push(s);
        }
        writeLocal([]); // on vide le local après sync
        setActive(dbSlugs.includes(slug));
      } else {
        // Non connecté : les favoris demandent une connexion, donc jamais coché.
        // Le localStorage sert seulement de file d'attente migrée au login.
        setActive(false);
      }
      setHydrated(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  async function toggle() {
    // Non connecté : on redirige vers la connexion, comme la demande d'adoption.
    // Après login, l'effet ci-dessus persiste le favori en base.
    if (!authed) {
      const list = readLocal();
      if (!list.includes(slug)) writeLocal([...list, slug]);
      router.push(`/connexion?next=${encodeURIComponent(pathname)}`);
      return;
    }

    const res = await fetch("/api/auth/favoris", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatSlug: slug }),
    });
    const data = await res.json();
    setActive(data.data?.active ?? !active);
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
