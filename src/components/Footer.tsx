import { Construction } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-dark-lighter bg-dark text-white/80">
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-12">
        <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="font-display text-lg font-bold text-white">
              Sans Croquettes Fixes
            </p>
            <p className="mt-1 text-sm text-white/60">
              Association lyonnaise de protection animale &middot; depuis 2015
            </p>
          </div>
          <div
            role="status"
            aria-label="Pied de page en cours de construction"
            className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 md:text-sm"
          >
            <Construction className="h-4 w-4" aria-hidden="true" />
            <span>Pied de page en travaux</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
