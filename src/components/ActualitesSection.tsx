import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import Reveal from "./Reveal";

type Article = {
  titre: string;
  date: string;
  lecture: string;
  slug: string;
  image: string;
};

const articles: Article[] = [
  {
    titre: "Campagne de stérilisation 2026 : un cap franchi",
    date: "12 avril 2026",
    lecture: "3 min de lecture",
    slug: "campagne-sterilisation-2026",
    image: "/images/actu-sterilisation.jpg",
  },
  {
    titre: "Distribution de croquettes : retour sur l'hiver",
    date: "28 mars 2026",
    lecture: "4 min de lecture",
    slug: "distribution-croquettes-hiver",
    image: "/images/actu-croquettes.jpg",
  },
  {
    titre: "Comment accueillir un chat de refuge chez soi",
    date: "15 mars 2026",
    lecture: "5 min de lecture",
    slug: "accueillir-chat-refuge",
    image: "/images/actu-accueil.jpg",
  },
];

export default function ActualitesSection() {
  return (
    <section aria-labelledby="actus-titre" className="bg-bg">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              id="actus-titre"
              className="font-display text-3xl font-bold text-text md:text-4xl lg:text-5xl"
            >
              Dernières nouvelles
            </h2>
            <p className="mt-3 text-base text-text-secondary md:text-lg">
              Suivez nos actions, sauvetages et événements.
            </p>
          </div>
          <Link
            href="/actualites"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition hover:gap-2.5 hover:text-primary-dark md:text-base"
          >
            Toutes les actualités
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <Reveal as="li" key={article.slug} delay={i * 100}>
              <Link href={`/actualites/${article.slug}`} className="group block h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-primary/10">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary-50">
                    <Image
                      src={article.image}
                      alt=""
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <time>{article.date}</time>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        {article.lecture}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug text-text transition group-hover:text-primary md:text-xl">
                      {article.titre}
                    </h3>
                  </div>
                </article>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
