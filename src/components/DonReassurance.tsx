import Reveal from "./Reveal";
import { Icon } from "./Icon";
import type { DonReassuranceBand } from "@/types/strapi";

interface DonReassuranceProps {
  data: DonReassuranceBand;
}

export default function DonReassurance({ data }: DonReassuranceProps) {
  if (data.items.length === 0) return null;

  return (
    <section
      aria-label="Garanties paiement et fiscal"
      className="border-y border-border bg-surface"
    >
      <div className="mx-auto max-w-7xl px-5 py-6 md:px-8 md:py-7">
        <Reveal>
          <ul className="flex flex-wrap items-stretch justify-center gap-x-8 gap-y-4 md:gap-x-12">
            {data.items.map((item, i) => (
              <li
                key={item.id}
                className="group flex items-center gap-3"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary transition group-hover:scale-110">
                  <Icon name={item.iconName} className="h-5 w-5" aria-hidden="true" />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full ring-1 ring-primary/15"
                  />
                </span>
                <div>
                  <p className="text-sm font-semibold text-text md:text-base">
                    {item.titre}
                  </p>
                  <p className="text-xs text-text-secondary md:text-sm">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
