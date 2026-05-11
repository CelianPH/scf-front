import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia } from "@/lib/strapi";
import { formatArticleDate } from "@/lib/formatters";
import type { Article } from "@/types/strapi";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const imageUrl = getStrapiMedia(article.image.url) ?? "";
  const dateLabel = formatArticleDate(article.date);

  return (
    <Link
      href={`/actualites/${article.slug}`}
      className="group block h-full rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition duration-200 ease-out group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-primary/15 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary-50">
          <Image
            src={imageUrl}
            alt={article.image.alternativeText ?? article.titre}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        </div>
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <time dateTime={article.date} className="text-xs text-text-muted">
            {dateLabel}
          </time>
          <h3 className="mt-3 font-display text-lg font-bold leading-snug text-text transition group-hover:text-primary md:text-xl">
            <span className="bg-gradient-to-r from-primary to-primary bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 ease-out group-hover:bg-[length:100%_2px] motion-reduce:transition-none">
              {article.titre}
            </span>
          </h3>
          {article.resume ? (
            <p className="mt-2 line-clamp-3 text-sm text-text-secondary">
              {article.resume}
            </p>
          ) : null}
          {article.tags.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <li
                  key={tag.id}
                  className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-dark"
                >
                  {tag.nom}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </article>
    </Link>
  );
}
