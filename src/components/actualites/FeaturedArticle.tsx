import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getStrapiMedia } from "@/lib/strapi";
import { formatArticleDate } from "@/lib/formatters";
import type { Article } from "@/types/strapi";

interface FeaturedArticleProps {
  article: Article;
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  const imageUrl = getStrapiMedia(article.image.url) ?? "";
  const dateLabel = formatArticleDate(article.date);

  return (
    <Link
      href={`/actualites/${article.slug}`}
      className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      <article className="relative grid overflow-hidden rounded-2xl border border-border bg-surface shadow-md transition duration-500 ease-out group-hover:shadow-2xl group-hover:shadow-primary/20 motion-reduce:transition-none md:grid-cols-5">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary-50 md:col-span-3 md:aspect-auto md:min-h-[22rem]">
          <Image
            src={imageUrl}
            alt={article.image.alternativeText ?? article.titre}
            fill
            priority
            sizes="(min-width:1024px) 60vw, 100vw"
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100 motion-reduce:transition-none"
          />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-primary/30">
            Cette semaine
          </span>
        </div>
        <div className="flex flex-col justify-center gap-4 p-6 md:col-span-2 md:p-8 lg:p-10">
          <time dateTime={article.date} className="text-xs text-text-muted">
            {dateLabel}
          </time>
          <h2 className="font-display text-2xl font-bold leading-tight text-text transition group-hover:text-primary md:text-3xl lg:text-4xl">
            {article.titre}
          </h2>
          {article.resume ? (
            <p className="line-clamp-3 text-base text-text-secondary md:line-clamp-4">
              {article.resume}
            </p>
          ) : null}
          {(article.tags?.length ?? 0) > 0 ? (
            <ul className="flex flex-wrap gap-1.5">
              {(article.tags ?? []).slice(0, 3).map((tag) => (
                <li
                  key={tag.id}
                  className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-dark"
                >
                  {tag.nom}
                </li>
              ))}
            </ul>
          ) : null}
          <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            Lire l'article
            <ArrowRight
              className="h-4 w-4 transition group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
              aria-hidden="true"
            />
          </span>
        </div>
      </article>
    </Link>
  );
}
