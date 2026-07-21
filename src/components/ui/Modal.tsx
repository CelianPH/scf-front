"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  children: ReactNode;
}

/**
 * Fenêtre modale accessible (WAI-ARIA "dialog") : overlay plein écran, panneau
 * centré scrollable, fermeture au clavier (Échap) et au clic sur le fond.
 */
export function Modal({ open, onClose, title, children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleId = useId();

  // Fermeture clavier + gel du scroll de la page tant que la modale est ouverte.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [open, onClose]);

  // Focus le panneau à l'ouverture pour que Échap fonctionne sans clic préalable.
  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-dark/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) => {
        // Ne fermer que sur un clic réellement initié sur le fond, pas sur une
        // sélection de texte qui se termine hors du panneau.
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-surface shadow-xl outline-none ring-1 ring-border sm:rounded-2xl"
      >
        <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4">
          <h2
            id={titleId}
            className="font-display text-lg font-bold text-text"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-text-muted transition hover:bg-bg-alt hover:text-text"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-5">{children}</div>
      </div>
    </div>,
    document.body
  );
}
