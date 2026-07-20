import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Reveal from "@/components/layout/Reveal";
import { Button } from "@/components/ui/Button";
import { RichText } from "@/components/ui/RichText";
import { getArticleBySlug, getArticles, getStrapiMedia } from "@/lib/strapi";
import { buildActualitesHref } from "@/lib/actualites";
import { formatArticleDate } from "@/lib/formatters";
import type { Article } from "@/types/strapi";

async function fetchRelated(article: Article): Promise<Article[]> {
  const primaryTag = article.tags?.[0]?.slug;
  if (!primaryTag) return [];
  try {
    const res = await getArticles({ tagSlug: primaryTag, pageSize: 4 });
    return res.data.filter((a) => a.slug !== article.slug).slice(0, 3);
  } catch (err) {
    console.error("[actualites/[slug]] fetchRelated failed:", err);
    return [];
  }
}

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

const articleProseClass = [
  "mt-10 text-base leading-relaxed text-text md:text-lg",
  "[&_p]:mt-5",
  "[&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-text",
  "[&_h3]:mt-7 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-text",
  "[&_a]:rounded-sm [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors [&_a]:duration-200 [&_a:hover]:text-primary-dark [&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-offset-2 [&_a:focus-visible]:outline-primary",
  "[&_strong]:font-semibold [&_strong]:text-text [&_em]:italic",
  "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mt-1",
  "[&_blockquote]:relative [&_blockquote]:mt-8 [&_blockquote]:rounded-lg [&_blockquote]:bg-primary-50/60 [&_blockquote]:px-6 [&_blockquote]:py-5 [&_blockquote]:font-display [&_blockquote]:text-xl [&_blockquote]:italic [&_blockquote]:leading-snug [&_blockquote]:text-text md:[&_blockquote]:px-8 md:[&_blockquote]:py-6 md:[&_blockquote]:text-2xl [&_blockquote>*]:relative [&_blockquote>*]:z-10 [&_blockquote]:before:absolute [&_blockquote]:before:left-3 [&_blockquote]:before:top-0 [&_blockquote]:before:font-display [&_blockquote]:before:text-[5rem] [&_blockquote]:before:leading-none [&_blockquote]:before:text-primary/25 [&_blockquote]:before:content-['\\201C']",
].join(" ");

async function fetchArticle(slug: string) {
  try {
    const { data } = await getArticleBySlug(slug);
    return data;
  } catch (err) {
    console.error("[actualites/[slug]] fetchArticle failed:", err);
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const { data } = await getArticles({ pageSize: 100 });
    return data.map((article) => ({ slug: article.slug }));
  } catch (err) {
    console.error("[actualites/[slug]] generateStaticParams failed:", err);
    return [];
  }
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticle(slug);
  if (!article) {
    return { title: "Article introuvable | Sans Croquettes Fixes" };
  }
  const seo = article.seo;
  return {
    title: seo?.metaTitle ?? `${article.titre} | Sans Croquettes Fixes`,
    description: seo?.metaDescription ?? article.resume ?? undefined,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await fetchArticle(slug);
  if (!article) {
    notFound();
  }

  const imageUrl = getStrapiMedia(article.image.url) ?? "";
  const dateLabel = formatArticleDate(article.date);
  const related = await fetchRelated(article);
  const relatedTagNom = article.tags?.[0]?.nom ?? null;

  return (
    <>
      <Navbar />
      <main>
        <article className="bg-bg">
          <div className="mx-auto max-w-3xl px-5 py-10 md:px-8 md:py-14">
            <Link
              href="/actualites"
              className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary transition hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Retour aux actualités
            </Link>

            <Reveal as="header" className="mt-6">
              {(article.tags?.length ?? 0) > 0 ? (
                <ul className="mb-4 flex flex-wrap gap-2">
                  {(article.tags ?? []).map((tag) => (
                    <li key={tag.id}>
                      <Link
                        href={buildActualitesHref({ tag: tag.slug })}
                        className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-dark transition hover:bg-primary hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        {tag.nom}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}

              <h1 className="font-display text-3xl font-bold leading-tight text-text md:text-4xl lg:text-5xl">
                {article.titre}
              </h1>

              <time
                dateTime={article.date}
                className="mt-4 block text-sm text-text-muted"
              >
                {dateLabel}
              </time>

              {article.resume ? (
                <p className="mt-6 text-lg leading-relaxed text-text-secondary md:text-xl">
                  {article.resume}
                </p>
              ) : null}
            </Reveal>

            <Reveal delay={100}>
              <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg bg-secondary-50">
                <Image
                  src={imageUrl}
                  alt={article.image.alternativeText ?? article.titre}
                  fill
                  priority
                  sizes="(min-width:768px) 768px, 100vw"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiA5Ij48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iOSIgZmlsbD0iI0Y1RUJGNyIvPjwvc3ZnPg=="
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={200}>
              <RichText html={article.contenu} className={articleProseClass} />
            </Reveal>
          </div>

          <aside
            aria-label="Continuez avec SCF"
            className="border-t border-border bg-bg-alt"
          >
            <div className="mx-auto max-w-5xl px-5 py-10 md:px-8 md:py-14">
              <Reveal>
                <div className="relative overflow-hidden rounded-2xl bg-dark px-6 py-8 text-center text-white md:px-10 md:py-10">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/30 blur-3xl"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-12 bottom-0 h-48 w-48 rounded-full bg-secondary/30 blur-3xl"
                  />
                  <div className="relative mx-auto max-w-2xl">
                    <p className="font-display text-2xl font-bold leading-snug md:text-3xl">
                      Cette histoire vous touche ?<br />
                      <span className="italic text-secondary-lighter">
                        Elle fait partie d'un combat plus large.
                      </span>
                    </p>
                    <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
                      Depuis la rue Desaix, Sans Croquettes Fixes nourrit, soigne
                      et place les chats errants du quartier. Distributions
                      hebdomadaires, stérilisations, familles d'accueil :
                      découvrez l'association derrière le terrain.
                    </p>
                    <div className="mt-7 flex justify-center">
                      <Button
                        href="/a-propos"
                        variant="secondary"
                        size="lg"
                        iconRight={ArrowRight}
                      >
                        Découvrir l'association
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>

              {related.length > 0 ? (
                <Reveal delay={120} className="mt-10 md:mt-14">
                  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                        <span
                          className="h-px w-8 bg-primary/60"
                          aria-hidden="true"
                        />
                        Lire ensuite
                      </div>
                      <h2 className="mt-3 font-display text-2xl font-bold leading-snug text-text md:text-3xl">
                        {relatedTagNom
                          ? `D'autres récits autour de ${relatedTagNom.toLowerCase()}`
                          : "D'autres récits du terrain"}
                      </h2>
                    </div>
                    <Link
                      href={buildActualitesHref(
                        relatedTagNom && article.tags?.[0]
                          ? { tag: article.tags[0].slug }
                          : {},
                      )}
                      className="inline-flex items-center gap-1.5 self-start rounded-sm text-sm font-semibold text-primary transition hover:text-primary-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                    >
                      Tout voir
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                  <ul className="mt-8 grid gap-6 md:grid-cols-3">
                    {related.map((r, i) => {
                      const rImg = getStrapiMedia(r.image.url) ?? "";
                      return (
                        <Reveal as="li" key={r.id} delay={i * 80}>
                          <Link
                            href={`/actualites/${r.slug}`}
                            className="group block h-full rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                          >
                            <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition duration-200 ease-out group-hover:-translate-y-1 group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/15 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                              <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary-50">
                                <Image
                                  src={rImg}
                                  alt={r.image.alternativeText ?? r.titre}
                                  fill
                                  sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                                  className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                />
                              </div>
                              <div className="flex flex-1 flex-col p-5">
                                <time
                                  dateTime={r.date}
                                  className="text-xs text-text-muted"
                                >
                                  {formatArticleDate(r.date)}
                                </time>
                                <h3 className="mt-2 font-display text-base font-bold leading-snug text-text transition group-hover:text-primary md:text-lg">
                                  {r.titre}
                                </h3>
                              </div>
                            </article>
                          </Link>
                        </Reveal>
                      );
                    })}
                  </ul>
                </Reveal>
              ) : null}
            </div>
          </aside>
        </article>
      </main>
      <Footer />
    </>
  );
}
