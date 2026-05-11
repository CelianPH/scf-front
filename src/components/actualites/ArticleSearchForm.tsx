import { ArrowRight, Search } from "lucide-react";

interface ArticleSearchFormProps {
  defaultValue: string;
  tag: string | null;
}

export default function ArticleSearchForm({
  defaultValue,
  tag,
}: ArticleSearchFormProps) {
  return (
    <form
      action="/actualites"
      method="get"
      role="search"
      className="relative w-full"
    >
      {tag ? <input type="hidden" name="tag" value={tag} /> : null}
      <label htmlFor="actu-search" className="sr-only">
        Chercher une histoire, un chat, un vendredi
      </label>
      <div className="group relative flex items-center rounded-full border border-border bg-surface shadow-sm transition focus-within:border-primary focus-within:shadow-md">
        <Search
          className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted transition group-focus-within:text-primary"
          aria-hidden="true"
        />
        <input
          id="actu-search"
          name="q"
          type="search"
          defaultValue={defaultValue}
          placeholder="Un article, un chat, un vendredi…"
          className="h-12 w-full rounded-full bg-transparent pl-14 pr-14 text-base text-text placeholder:text-text-muted focus:outline-none md:h-14 md:pr-16 md:text-lg"
        />
        <button
          type="submit"
          aria-label="Lancer la recherche"
          className="absolute right-1.5 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white shadow-sm transition hover:bg-primary-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:right-2 md:h-11 md:w-11"
        >
          <ArrowRight className="h-4 w-4 md:h-5 md:w-5" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}
