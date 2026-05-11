import Link from "next/link";
import { X } from "lucide-react";
import { buildActualitesHref } from "@/lib/actualites";
import type { Tag } from "@/types/strapi";

interface TagFilterChipsProps {
  tags: Tag[];
  activeSlug: string | null;
  search: string | null;
}

export default function TagFilterChips({
  tags,
  activeSlug,
  search,
}: TagFilterChipsProps) {
  if (tags.length === 0) return null;

  return (
    <nav aria-label="Filtrer par thématique" className="mt-6">
      {search ? (
        <div className="mb-3 flex flex-wrap items-center justify-center gap-2 text-xs text-text-muted">
          <span>Recherche active :</span>
          <Link
            href={buildActualitesHref(
              activeSlug ? { tag: activeSlug } : {},
            )}
            className="group inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-dark transition hover:border-primary hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label={`Effacer la recherche « ${search} »`}
          >
            <span className="max-w-[14rem] truncate">« {search} »</span>
            <X
              className="h-3 w-3 opacity-70 transition group-hover:opacity-100"
              aria-hidden="true"
            />
          </Link>
        </div>
      ) : null}
      <ul className="flex flex-wrap justify-center gap-2">
        <li>
          <Link
            href={buildActualitesHref({ q: search })}
            aria-current={activeSlug === null ? "page" : undefined}
            className={`inline-flex min-h-[2.75rem] items-center rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              activeSlug === null
                ? "border-primary bg-primary text-white"
                : "border-border bg-surface text-text-secondary hover:border-primary hover:text-primary"
            }`}
          >
            Toutes
          </Link>
        </li>
        {tags.map((tag) => {
          const active = activeSlug === tag.slug;
          return (
            <li key={tag.id}>
              <Link
                href={buildActualitesHref({ tag: tag.slug, q: search })}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-[2.75rem] items-center rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  active
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-surface text-text-secondary hover:border-primary hover:text-primary"
                }`}
              >
                {tag.nom}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
