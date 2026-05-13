"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Check, ChevronDown } from "lucide-react";

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
}

interface SelectProps<T extends string> {
  value: T;
  onChange: (v: T) => void;
  options: SelectOption<T>[];
  label?: ReactNode;
  ariaLabel?: string;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
}

/**
 * Listbox stylisable selon le design system, alternative au <select> natif.
 * Pattern WAI-ARIA "Listbox" : bouton déclencheur + panneau role="listbox".
 */
export function Select<T extends string>({
  value,
  onChange,
  options,
  label,
  ariaLabel,
  placeholder = "Sélectionner",
  className = "",
  buttonClassName = "",
}: SelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number>(() =>
    Math.max(0, options.findIndex((o) => o.value === value))
  );
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const baseId = useId();
  const listId = `${baseId}-list`;
  const labelId = `${baseId}-label`;

  const selected = useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  );

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      const idx = options.findIndex((o) => o.value === value);
      setActiveIdx(idx >= 0 ? idx : 0);
      requestAnimationFrame(() => {
        listRef.current
          ?.querySelector<HTMLLIElement>(`[data-idx="${idx}"]`)
          ?.scrollIntoView({ block: "nearest" });
      });
    }
  }, [open, options, value]);

  function pick(idx: number) {
    const opt = options[idx];
    if (!opt) return;
    onChange(opt.value);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function handleButtonKey(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  }

  function handleListKey(e: React.KeyboardEvent<HTMLUListElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIdx(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveIdx(options.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      pick(activeIdx);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div ref={rootRef} className={`relative inline-block ${className}`}>
      {label ? (
        <span id={labelId} className="sr-only">
          {label}
        </span>
      ) : null}
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={label ? labelId : undefined}
        aria-label={!label ? ariaLabel : undefined}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleButtonKey}
        className={`inline-flex items-center justify-between gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium text-text shadow-sm outline-none transition hover:border-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${buttonClassName}`}
      >
        <span>{selected?.label ?? placeholder}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 ${
            open ? "rotate-180 text-primary" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <ul
          ref={listRef}
          role="listbox"
          id={listId}
          aria-activedescendant={`${baseId}-opt-${activeIdx}`}
          tabIndex={-1}
          onKeyDown={handleListKey}
          onFocus={() => {
            /* keep focus styling */
          }}
          autoFocus
          className="absolute right-0 z-30 mt-2 max-h-72 min-w-[var(--radix-popper-anchor-width,12rem)] overflow-auto rounded-xl border border-border bg-surface p-1 shadow-xl shadow-primary/10 ring-1 ring-border outline-none"
        >
          {options.map((o, i) => {
            const active = i === activeIdx;
            const isSelected = o.value === value;
            return (
              <li
                key={o.value}
                id={`${baseId}-opt-${i}`}
                role="option"
                data-idx={i}
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIdx(i)}
                onClick={() => pick(i)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  active
                    ? "bg-primary-50 text-text"
                    : "text-text-secondary"
                } ${isSelected ? "font-semibold text-primary" : ""}`}
              >
                <span>{o.label}</span>
                {isSelected ? (
                  <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
