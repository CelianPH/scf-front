import { ChevronDown } from "lucide-react";
import type { FaqItem } from "./content";

interface ConseilsFaqProps {
  items: FaqItem[];
}

/**
 * FAQ en accordéon basée sur <details> natif : accessible au clavier et
 * fonctionnelle sans JavaScript.
 */
export default function ConseilsFaq({ items }: ConseilsFaqProps) {
  return (
    <ul className="mx-auto max-w-3xl space-y-3">
      {items.map((item) => (
        <li key={item.question}>
          <details className="group rounded-2xl bg-surface shadow-sm ring-1 ring-border transition hover:ring-primary/30 open:ring-primary/40">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-base font-bold text-text md:text-lg [&::-webkit-details-marker]:hidden">
              {item.question}
              <ChevronDown
                className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="px-5 pb-5 text-sm leading-relaxed text-text-secondary md:text-base">
              {item.reponse}
            </p>
          </details>
        </li>
      ))}
    </ul>
  );
}
