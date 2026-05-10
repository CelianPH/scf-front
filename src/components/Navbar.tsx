import { Construction } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <a href="/" className="font-display text-lg font-bold text-primary md:text-xl">
          Sans Croquettes Fixes
        </a>
        <div
          role="status"
          aria-label="Navigation en cours de construction"
          className="flex items-center gap-2 rounded-md border border-secondary-light/40 bg-secondary-50 px-3 py-1.5 text-xs font-medium text-secondary md:text-sm"
        >
          <Construction className="h-4 w-4" aria-hidden="true" />
          <span>Navigation en travaux</span>
        </div>
      </div>
    </header>
  );
}
