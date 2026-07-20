import type { Metadata } from "next";
import { PawPrint } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/layout/Reveal";
import { Button } from "@/components/ui/Button";
import ArticleCard from "@/components/actualites/ArticleCard";
import ArticleSearchForm from "@/components/actualites/ArticleSearchForm";
import TagFilterChips from "@/components/actualites/TagFilterChips";
import Pagination from "@/components/actualites/Pagination";
import FeaturedArticle from "@/components/actualites/FeaturedArticle";
import { getArticles, getTags } from "@/lib/strapi";
import { buildActualitesHref } from "@/lib/actualites";

export const metadata: Metadata = {
  title: "Actualités | Sans Croquettes Fixes",
  description:
    "Toutes les actualités de l'association : campagnes de stérilisation, distributions, adoptions et témoignages.",
};

const PAGE_SIZE = 9;

interface ActualitesPageProps {
  searchParams: Promise<{
    page?: string;
    q?: string;
    tag?: string;
  }>;
}

function parsePage(raw: string | undefined): number {
  const n = Number.parseInt(raw ?? "1", 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export default async function ActualitesPage({
  searchParams,
}: ActualitesPageProps) {
  const params = await searchParams;
  const page = parsePage(params.page);
  const search = params.q?.trim() || null;
  const tag = params.tag?.trim() || null;

  const [articlesRes, tagsRes] = await Promise.all([
    getArticles({
      page,
      pageSize: PAGE_SIZE,
      search: search ?? undefined,
      tagSlug: tag ?? undefined,
    }),
    getTags(),
  ]);

  const articles = articlesRes.data ?? [];
  const pagination = articlesRes.meta?.pagination;
  const total = pagination?.total ?? articles.length;
  const pageCount = pagination?.pageCount ?? 1;

  const showFeatured = page === 1 && !search && !tag && articles.length > 0;
  const featured = showFeatured ? articles[0] : null;
  const gridArticles = showFeatured ? articles.slice(1) : articles;

  return (
    <>
      <Navbar />
      <main>
        <section className="relative overflow-hidden bg-bg">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary-50 blur-3xl md:h-96 md:w-96"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 top-40 hidden h-64 w-64 rounded-full bg-secondary-50 blur-3xl md:block"
          />

          <div className="relative mx-auto max-w-5xl px-5 py-14 text-center md:px-8 md:py-20">
            <Reveal>
              <h1 className="font-display text-5xl font-bold leading-[1.02] text-text md:text-6xl lg:text-7xl xl:text-[5.5rem]">
                Nouvelles<br className="lg:hidden" />{" "}
                <span className="italic text-secondary">du terrain.</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-base text-text-secondary md:text-lg">
                Vendredis de distribution, chats sortis de la rue, portraits
                de bénévoles, point d'étape sur Les Félins de l'Ombre : tout
                ce qu'on aurait raconté autour d'un café après une tournée.
              </p>
            </Reveal>

            <Reveal delay={160} className="mt-10">
              <div className="mx-auto max-w-2xl">
                <ArticleSearchForm
                  defaultValue={search ?? ""}
                  tag={tag}
                />
              </div>
            </Reveal>

            <Reveal delay={200} className="mt-8">
              <div className="flex justify-center">
                <TagFilterChips
                  tags={tagsRes.data ?? []}
                  activeSlug={tag}
                  search={search}
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-bg pb-16 md:pb-24">
          <div className="mx-auto max-w-7xl px-5 md:px-8">
            {articles.length === 0 ? (
              <div className="relative mx-auto max-w-xl overflow-hidden px-6 py-16 text-center">
                <PawPrint
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-6 h-44 w-44 -translate-x-1/2 -rotate-12 text-primary-50"
                  strokeWidth={1}
                />
                <div className="relative">
                  <p className="font-display text-3xl font-bold leading-tight text-text md:text-4xl">
                    Aucun chat ici…<br />
                    <span className="italic text-secondary">pour l'instant.</span>
                  </p>
                  <p className="mx-auto mt-4 max-w-sm text-sm text-text-secondary md:text-base">
                    Essayez un autre mot-clé, retirez un filtre, ou revenez
                    bientôt. On raconte une nouvelle histoire par semaine.
                  </p>
                  {(search || tag) ? (
                    <div className="mt-6">
                      <Button
                        href={buildActualitesHref({})}
                        variant="outlined-primary"
                        size="sm"
                      >
                        Voir tous les articles
                      </Button>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <>
                {featured ? (
                  <Reveal>
                    <FeaturedArticle article={featured} />
                  </Reveal>
                ) : null}

                {gridArticles.length > 0 ? (
                  <ul
                    className={`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ${
                      featured ? "mt-10 md:mt-14" : "mt-2"
                    }`}
                  >
                    {gridArticles.map((article, i) => (
                      <Reveal as="li" key={article.id} delay={i * 60}>
                        <ArticleCard article={article} />
                      </Reveal>
                    ))}
                  </ul>
                ) : null}

                <Pagination
                  page={page}
                  pageCount={pageCount}
                  search={search}
                  tag={tag}
                />
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
