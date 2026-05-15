import Link from "next/link";
import { Heart } from "lucide-react";
import AdoptionCard from "@/components/AdoptionCard";
import { getMesFavoris } from "@/lib/strapi-server";

export default async function FavorisPage() {
  const { data: favoris } = await getMesFavoris();

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <h1 className="font-display text-4xl font-bold text-text md:text-5xl">
        Mes favoris
      </h1>
      {favoris.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-3xl border-2 border-dashed border-border bg-surface px-6 py-16 text-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary">
            <Heart className="h-8 w-8" />
          </span>
          <h2 className="mt-5 font-display text-2xl font-bold text-text">
            Pas encore de favoris
          </h2>
          <p className="mt-2 max-w-md text-sm text-text-secondary">
            Parcours les chats à l&apos;adoption et clique sur le cœur pour les
            sauvegarder ici.
          </p>
          <Link
            href="/adoption"
            className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:-translate-y-px"
          >
            Voir les chats
          </Link>
        </div>
      ) : (
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favoris.map((c) => (
            <li key={c.id}>
              <AdoptionCard chat={c} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
