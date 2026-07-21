import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/layout/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { getStrapiMedia } from "@/lib/strapi";
import { formatArticleDate } from "@/lib/formatters";
import type { HomeActualitesBlock } from "@/types/strapi";

interface ActualitesSectionProps {
  data: HomeActualitesBlock;
}

export default function ActualitesSection({ data }: ActualitesSectionProps) {
  const articles = [...data.articles]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <section aria-labelledby="actus-titre" className="bg-bg">
      <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="actus-titre"
              className="font-display text-3xl font-bold text-text md:text-4xl lg:text-5xl"
            >
              {data.titre}
            </h2>
            {data.description ? (
              <p className="mt-2 text-base text-text-secondary md:mt-3 md:text-lg">
                {data.description}
              </p>
            ) : null}
          </div>
          {data.ctaSeeAll ? (
            <ArrowLink
              href={data.ctaSeeAll.href}
              external={data.ctaSeeAll.external}
              size="md"
            >
              {data.ctaSeeAll.label}
            </ArrowLink>
          ) : null}
        </Reveal>

        <ul className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => {
            const imageUrl = getStrapiMedia(article.image.url) ?? "";
            const dateLabel = formatArticleDate(article.date);
            return (
              <Reveal as="li" key={article.id} delay={i * 100}>
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
                        {article.titre}
                      </h3>
                    </div>
                  </article>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
