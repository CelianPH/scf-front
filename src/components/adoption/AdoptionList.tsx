"use client";

import { useMemo, useState } from "react";
import { Search, X, SlidersHorizontal, PawPrint } from "lucide-react";
import AdoptionCard from "./AdoptionCard";
import { Button } from "@/components/ui/Button";
import Reveal from "@/components/layout/Reveal";
import { Select } from "@/components/ui/Select";
import type { Chat } from "@/types/strapi";

type SexeFilter = "all" | "Male" | "Femelle";
type AgeFilter = "all" | "junior" | "adulte" | "senior";
type SortKey = "recent" | "oldest" | "name";

interface AdoptionListProps {
  chats: Chat[];
}

/** Convertit un âge en années. Gère "2 ans", "3 mois", "6 semaines" et "01/09/2025". */
function parseAge(age: string): number {
  const value = age.trim();

  // Date de naissance au format JJ/MM/AAAA
  const birth = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (birth) {
    const [, d, mo, y] = birth;
    const birthDate = new Date(Number(y), Number(mo) - 1, Number(d));
    const ms = Date.now() - birthDate.getTime();
    return ms > 0 ? ms / (365.25 * 24 * 60 * 60 * 1000) : 0;
  }

  const m = value.match(/(\d+([.,]\d+)?)/);
  if (!m) return 0;
  const n = parseFloat(m[1].replace(",", "."));

  const unit = value.toLowerCase();
  if (unit.includes("semaine")) return n / 52;
  if (unit.includes("mois")) return n / 12;
  if (unit.includes("jour")) return n / 365;
  return n;
}

function ageBucket(age: string): AgeFilter {
  const n = parseAge(age);
  if (n < 2) return "junior";
  if (n < 8) return "adulte";
  return "senior";
}

const AGE_OPTIONS: { value: AgeFilter; label: string }[] = [
  { value: "all", label: "Tous les âges" },
  { value: "junior", label: "Junior (< 2 ans)" },
  { value: "adulte", label: "Adulte (2–7 ans)" },
  { value: "senior", label: "Senior (8 ans +)" },
];

const SEXE_OPTIONS: { value: SexeFilter; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "Femelle", label: "Femelle" },
  { value: "Male", label: "Mâle" },
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "recent", label: "Plus récents" },
  { value: "oldest", label: "Plus anciens" },
  { value: "name", label: "Nom (A-Z)" },
];

export default function AdoptionList({ chats }: AdoptionListProps) {
  const [sexe, setSexe] = useState<SexeFilter>("all");
  const [age, setAge] = useState<AgeFilter>("all");
  const [caractere, setCaractere] = useState<string>("");
  const [sort, setSort] = useState<SortKey>("recent");

  const hasFilter = sexe !== "all" || age !== "all" || caractere.length > 0;

  const filtered = useMemo(() => {
    const q = caractere.trim().toLowerCase();
    return chats
      .filter((c) => (sexe === "all" ? true : c.sexe === sexe))
      .filter((c) => (age === "all" ? true : ageBucket(c.age) === age))
      .filter((c) => {
        if (!q) return true;
        return (
          c.trait?.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q) ||
          c.nom.toLowerCase().includes(q)
        );
      })
      .slice()
      .sort((a, b) => {
        if (sort === "name") return a.nom.localeCompare(b.nom, "fr");
        const aDate = new Date(a.createdAt).getTime();
        const bDate = new Date(b.createdAt).getTime();
        return sort === "oldest" ? aDate - bDate : bDate - aDate;
      });
  }, [chats, sexe, age, caractere, sort]);

  function resetFilters() {
    setSexe("all");
    setAge("all");
    setCaractere("");
  }

  return (
    <section aria-label="Liste des chats à l'adoption" className="bg-bg">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <div className="rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-border md:p-6">
          <div className="flex items-center gap-2 text-text">
            <SlidersHorizontal className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 className="font-display text-lg font-bold md:text-xl">
              Filtrer par
            </h2>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-[1fr_1fr_1.5fr]">
            <div role="radiogroup" aria-labelledby="filter-sexe-label">
              <p id="filter-sexe-label" className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Sexe
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {SEXE_OPTIONS.map((opt) => {
                  const active = sexe === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setSexe(opt.value)}
                      className={`rounded-full px-4 py-2.5 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:outline-none ${
                        active
                          ? "bg-primary text-white shadow-sm shadow-primary/30"
                          : "bg-surface text-text-secondary ring-1 ring-border hover:text-text"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div role="radiogroup" aria-labelledby="filter-age-label">
              <p id="filter-age-label" className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Âge
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {AGE_OPTIONS.map((opt) => {
                  const active = age === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setAge(opt.value)}
                      className={`rounded-full px-4 py-2.5 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:outline-none ${
                        active
                          ? "bg-primary text-white shadow-sm shadow-primary/30"
                          : "bg-surface text-text-secondary ring-1 ring-border hover:text-text"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Nom ou caractère
              </span>
              <div className="relative mt-2">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={caractere}
                  onChange={(e) => setCaractere(e.target.value)}
                  placeholder="Mia, joueur, câlin…"
                  className="w-full rounded-full border border-border bg-surface py-2 pl-10 pr-9 text-sm text-text outline-none transition focus:border-primary"
                />
                {caractere ? (
                  <button
                    type="button"
                    onClick={() => setCaractere("")}
                    aria-label="Effacer la recherche"
                    className="absolute right-3 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-text-muted hover:bg-bg-alt hover:text-text focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            </label>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <p
              className="text-sm text-text-secondary md:text-base"
              aria-live="polite"
            >
              <span className="font-bold text-text">{filtered.length}</span>{" "}
              chat{filtered.length > 1 ? "s" : ""}
              {hasFilter ? " correspondent à vos critères" : " disponibles"}
            </p>
            {hasFilter && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium text-text-secondary transition hover:border-primary/40 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:outline-none"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                Effacer les filtres
              </button>
            )}
          </div>

          <div className="inline-flex items-center gap-2 text-sm text-text-secondary">
            Trier par
            <Select<SortKey>
              value={sort}
              onChange={setSort}
              options={SORT_OPTIONS}
              ariaLabel="Trier les chats par"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-surface px-6 py-16 text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary">
              <PawPrint className="h-8 w-8" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold text-text">
              Aucun chat ne correspond
            </h3>
            <p className="mt-2 max-w-md text-sm text-text-secondary md:text-base">
              Essayez d&apos;élargir votre recherche ou de retirer un filtre :
              chaque chat mérite d&apos;être découvert.
            </p>
            <Button variant="primary" size="md" onClick={resetFilters} className="mt-5">
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((c, i) => (
              <li key={c.id}>
                <Reveal delay={Math.min(i, 6) * 80}>
                  <AdoptionCard chat={c} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
