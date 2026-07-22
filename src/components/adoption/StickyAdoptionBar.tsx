"use client";

import { useEffect, useState } from "react";
import { Heart, ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Props {
  catName: string;
  sexeLabel: string;
  age: string;
  adoptionUrl: string;
}

export default function StickyAdoptionBar({ catName, sexeLabel, age, adoptionUrl }: Props) {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const anchor = document.getElementById("adoption-cta");
    if (!anchor) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        // Déclencher dès que le haut du bloc a dépassé le bord supérieur du viewport
        setShow(entry.boundingClientRect.top < 0);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    obs.observe(anchor);
    return () => obs.disconnect();
  }, []);

  if (dismissed) return null;

  return (
    <div
      role="complementary"
      aria-label={`Adopter ${catName}`}
      className={`fixed inset-x-0 bottom-0 z-50 px-4 pb-4 transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none md:pb-6 ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-full opacity-0"
      }`}
    >
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-surface shadow-2xl shadow-black/15 ring-1 ring-border">
        <div className="flex items-center gap-3 p-4 md:gap-4 md:px-6">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              Prêt à l&apos;accueillir&nbsp;?
            </p>
            <p className="truncate font-display text-sm font-bold text-text md:text-base">
              {catName}
              <span className="font-normal text-text-secondary max-sm:hidden">
                {" "}· {sexeLabel} · {age}
              </span>
            </p>
            <p className="truncate text-xs font-normal text-text-secondary sm:hidden">
              {sexeLabel} · {age}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <Button
              href={adoptionUrl}
              variant="primary"
              size="sm"
              iconLeft={Heart}
              iconRight={ArrowRight}
            >
              <span className="hidden sm:inline">Faire une demande</span>
              <span className="sm:hidden">Adopter</span>
            </Button>
            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Masquer la barre d'adoption"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition hover:bg-bg-alt hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
