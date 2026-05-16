"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
  value: string | null;
  onChange: (iso: string | null) => void;
  /** Année min (incluse). Défaut: aujourd'hui - 100 ans. */
  minYear?: number;
  /** Année max (incluse). Défaut: aujourd'hui. */
  maxYear?: number;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}

const MOIS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const JOURS = ["L", "M", "M", "J", "V", "S", "D"];

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function parseISO(iso: string | null): { y: number; m: number; d: number } | null {
  if (!iso) return null;
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return null;
  return { y: +m[1], m: +m[2] - 1, d: +m[3] };
}

function toISO(y: number, m: number, d: number): string {
  return `${y}-${pad(m + 1)}-${pad(d)}`;
}

function daysInMonth(y: number, m: number): number {
  return new Date(y, m + 1, 0).getDate();
}

/** Indice (0=lun) du premier jour du mois. */
function firstWeekdayIndex(y: number, m: number): number {
  const d = new Date(y, m, 1).getDay(); // 0=dim..6=sam
  return (d + 6) % 7; // 0=lun..6=dim
}

function formatFR(iso: string): string {
  const p = parseISO(iso);
  if (!p) return "";
  return `${pad(p.d)}/${pad(p.m + 1)}/${p.y}`;
}

export function DatePicker({
  value,
  onChange,
  minYear,
  maxYear,
  placeholder = "Choisir une date",
  ariaLabel,
  className = "",
}: DatePickerProps) {
  const today = new Date();
  const yMax = maxYear ?? today.getFullYear();
  const yMin = minYear ?? yMax - 100;

  const parsed = parseISO(value);
  const initial = parsed ?? { y: yMax - 25, m: 0, d: 1 };

  const [open, setOpen] = useState(false);
  const [viewY, setViewY] = useState(initial.y);
  const [viewM, setViewM] = useState(initial.m);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Quand la valeur externe change, on resynchronise la vue.
  useEffect(() => {
    const p = parseISO(value);
    if (p) {
      setViewY(p.y);
      setViewM(p.m);
    }
  }, [value]);

  const years = useMemo(() => {
    const out: number[] = [];
    for (let y = yMax; y >= yMin; y--) out.push(y);
    return out;
  }, [yMax, yMin]);

  const cellsBefore = firstWeekdayIndex(viewY, viewM);
  const totalDays = daysInMonth(viewY, viewM);

  function prevMonth() {
    if (viewM === 0) {
      if (viewY > yMin) {
        setViewY(viewY - 1);
        setViewM(11);
      }
    } else setViewM(viewM - 1);
  }

  function nextMonth() {
    if (viewM === 11) {
      if (viewY < yMax) {
        setViewY(viewY + 1);
        setViewM(0);
      }
    } else setViewM(viewM + 1);
  }

  function pick(day: number) {
    onChange(toISO(viewY, viewM, day));
    setOpen(false);
    buttonRef.current?.focus();
  }

  const selected = parsed && parsed.y === viewY && parsed.m === viewM ? parsed.d : null;
  const todayISO =
    today.getFullYear() === viewY && today.getMonth() === viewM
      ? today.getDate()
      : null;

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={ariaLabel ?? placeholder}
        className="mt-1 inline-flex w-full items-center justify-between gap-2 rounded-md border border-border bg-surface px-4 py-2.5 text-base text-text outline-none transition hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <span className={value ? "" : "text-text-muted"}>
          {value ? formatFR(value) : placeholder}
        </span>
        <Calendar className="h-4 w-4 text-text-muted" aria-hidden="true" />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Sélection de date"
          className="absolute left-0 right-0 z-30 mt-2 overflow-hidden rounded-xl border border-border bg-surface p-3 shadow-xl shadow-primary/10 sm:left-auto sm:right-0 sm:w-[320px]"
        >
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Mois précédent"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition hover:bg-bg-alt hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="flex flex-1 items-center gap-1.5">
              <select
                value={viewM}
                onChange={(e) => setViewM(+e.target.value)}
                aria-label="Mois"
                className="flex-1 rounded-md border border-border bg-bg-alt px-2 py-1 text-sm font-medium text-text outline-none focus:border-primary"
              >
                {MOIS.map((m, i) => (
                  <option key={m} value={i}>
                    {m}
                  </option>
                ))}
              </select>
              <select
                value={viewY}
                onChange={(e) => setViewY(+e.target.value)}
                aria-label="Année"
                className="w-[90px] rounded-md border border-border bg-bg-alt px-2 py-1 text-sm font-medium text-text outline-none focus:border-primary"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={nextMonth}
              aria-label="Mois suivant"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-text-secondary transition hover:bg-bg-alt hover:text-primary"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div
            className="mt-3 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-text-muted"
            aria-hidden="true"
          >
            {JOURS.map((j, i) => (
              <span key={i}>{j}</span>
            ))}
          </div>

          <div role="grid" className="mt-1 grid grid-cols-7 gap-1">
            {Array.from({ length: cellsBefore }).map((_, i) => (
              <span key={`empty-${i}`} />
            ))}
            {Array.from({ length: totalDays }, (_, i) => i + 1).map((d) => {
              const isSelected = selected === d;
              const isToday = todayISO === d;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => pick(d)}
                  aria-selected={isSelected}
                  aria-label={`${d} ${MOIS[viewM]} ${viewY}`}
                  className={`relative inline-flex h-9 items-center justify-center rounded-md text-sm transition ${
                    isSelected
                      ? "bg-primary font-semibold text-white shadow-sm shadow-primary/30"
                      : "text-text hover:bg-primary-50 hover:text-primary"
                  }`}
                >
                  {d}
                  {isToday && !isSelected ? (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-1 h-0.5 w-3 rounded-full bg-primary"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <button
              type="button"
              onClick={() => {
                onChange(null);
                setOpen(false);
                buttonRef.current?.focus();
              }}
              className="text-xs font-medium text-text-secondary hover:text-primary"
            >
              Effacer
            </button>
            <button
              type="button"
              onClick={() => {
                const now = new Date();
                onChange(toISO(now.getFullYear(), now.getMonth(), now.getDate()));
                setOpen(false);
                buttonRef.current?.focus();
              }}
              className="text-xs font-medium text-primary hover:text-primary-dark"
            >
              Aujourd&apos;hui
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
