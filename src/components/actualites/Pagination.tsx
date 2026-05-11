import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildActualitesHref } from "@/lib/actualites";

interface PaginationProps {
  page: number;
  pageCount: number;
  search: string | null;
  tag: string | null;
}

const arrowBase =
  "inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-surface text-text-secondary";
const arrowActive =
  "transition hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
const arrowDisabled = "opacity-40";

type PageItem = number | "ellipsis-left" | "ellipsis-right";

function buildPageItems(page: number, pageCount: number): PageItem[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  const items: PageItem[] = [1];
  const left = Math.max(2, page - 1);
  const right = Math.min(pageCount - 1, page + 1);
  if (left > 2) items.push("ellipsis-left");
  for (let p = left; p <= right; p++) items.push(p);
  if (right < pageCount - 1) items.push("ellipsis-right");
  items.push(pageCount);
  return items;
}

export default function Pagination({
  page,
  pageCount,
  search,
  tag,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  const items = buildPageItems(page, pageCount);
  const hasPrev = page > 1;
  const hasNext = page < pageCount;

  return (
    <nav
      aria-label="Pagination des articles"
      className="mt-12 flex items-center justify-center gap-2"
    >
      {hasPrev ? (
        <Link
          href={buildActualitesHref({ page: page - 1, q: search, tag })}
          rel="prev"
          className={`${arrowBase} ${arrowActive}`}
          aria-label="Page précédente"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          aria-label="Page précédente"
          className={`${arrowBase} ${arrowDisabled}`}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </span>
      )}

      <ul className="flex items-center gap-1">
        {items.map((item) => {
          if (item === "ellipsis-left" || item === "ellipsis-right") {
            return (
              <li key={item} aria-hidden="true">
                <span className="inline-flex h-11 min-w-[2.75rem] items-center justify-center px-1 text-sm text-text-muted">
                  …
                </span>
              </li>
            );
          }
          const active = item === page;
          return (
            <li key={item}>
              <Link
                href={buildActualitesHref({ page: item, q: search, tag })}
                aria-current={active ? "page" : undefined}
                aria-label={`Page ${item}`}
                className={`inline-flex h-11 min-w-[2.75rem] items-center justify-center rounded-md border px-3 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  active
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-surface text-text-secondary hover:border-primary hover:text-primary"
                }`}
              >
                {item}
              </Link>
            </li>
          );
        })}
      </ul>

      {hasNext ? (
        <Link
          href={buildActualitesHref({ page: page + 1, q: search, tag })}
          rel="next"
          className={`${arrowBase} ${arrowActive}`}
          aria-label="Page suivante"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          aria-label="Page suivante"
          className={`${arrowBase} ${arrowDisabled}`}
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
