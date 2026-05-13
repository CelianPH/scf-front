"use client";

import { useMemo, useState } from "react";
import { Search, X, SlidersHorizontal, PawPrint } from "lucide-react";
import AdoptionCard from "./AdoptionCard";
import { Select } from "@/components/ui/Select";
import type { Chat } from "@/types/strapi";

type SexeFilter = "all" | "Male" | "Femelle";
type AgeFilter = "all" | "junior" | "adulte" | "senior";
type SortKey = "recent" | "oldest" | "name";

interface AdoptionListProps {
  chats: Chat[];
}

function parseAge(age: string): number {
  const m = age.match(/(\d+([.,]\d+)?)/);
  return m ? parseFloat(m[1].replace(",", ".")) : 0;
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
  { value: "adulte", label: "Adulte" },
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
    <section aria-label="Liste des chats à l'adoption" className="bg-bg-alt">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <div className="rounded-3xl bg-surface p-5 shadow-sm ring-1 ring-border md:p-6">
          <div className="flex items-center gap-2 text-text">
            <SlidersHorizontal className="h-5 w-5 text-primary" aria-hidden="true" />
            <h2 className="font-display text-lg font-bold md:text-xl">
              Filtrer par
            </h2>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-[1fr_1fr_1.5fr]">
            <fieldset>
              <legend className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Sexe
              </legend>
              <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Sexe">
                {SEXE_OPTIONS.map((opt) => {
                  const active = sexe === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setSexe(opt.value)}
                      className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                        active
                          ? "bg-primary text-white shadow-sm shadow-primary/30"
                          : "bg-bg-alt text-text-secondary ring-1 ring-border hover:text-text"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Âge
              </legend>
              <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Âge">
                {AGE_OPTIONS.map((opt) => {
                  const active = age === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setAge(opt.value)}
                      className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
                        active
                          ? "bg-primary text-white shadow-sm shadow-primary/30"
                          : "bg-bg-alt text-text-secondary ring-1 ring-border hover:text-text"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Caractère
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
                  placeholder="Joueur, calme, câlin…"
                  className="w-full rounded-full border border-border bg-bg-alt py-2 pl-10 pr-9 text-sm text-text outline-none transition focus:border-primary focus:bg-surface"
                />
                {caractere ? (
                  <button
                    type="button"
                    onClick={() => setCaractere("")}
                    aria-label="Effacer la recherche"
                    className="absolute right-3 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-text-muted hover:bg-bg-alt hover:text-text"
                  >
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                ) : null}
              </div>
            </label>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p
            className="text-sm text-text-secondary md:text-base"
            aria-live="polite"
          >
            <span className="font-bold text-text">{filtered.length}</span>{" "}
            chat{filtered.length > 1 ? "s" : ""}
            {hasFilter ? " correspondent à vos critères" : " disponibles"}
          </p>

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
          <div className="mt-10 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border bg-surface px-6 py-16 text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary">
              <PawPrint className="h-8 w-8" aria-hidden="true" />
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold text-text">
              Aucun chat ne correspond
            </h3>
            <p className="mt-2 max-w-md text-sm text-text-secondary md:text-base">
              Essayez d&apos;élargir votre recherche ou de retirer un filtre —
              chaque chat mérite d&apos;être découvert.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-primary/30 transition hover:-translate-y-px hover:shadow-md hover:shadow-primary/40"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((c) => (
              <li key={c.id}>
                <AdoptionCard chat={c} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
