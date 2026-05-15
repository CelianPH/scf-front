import Image from "next/image";
import Link from "next/link";
import { MailQuestion } from "lucide-react";
import { getMesDemandes } from "@/lib/strapi";
import { getStrapiMedia } from "@/lib/strapi";

const STATUT_LABEL: Record<string, { label: string; cls: string }> = {
  en_attente: { label: "En attente", cls: "bg-amber-100 text-amber-800" },
  en_cours: { label: "En cours", cls: "bg-blue-100 text-blue-800" },
  acceptee: { label: "Acceptée", cls: "bg-green-100 text-green-800" },
  refusee: { label: "Refusée", cls: "bg-red-100 text-red-800" },
};

export default async function DemandesPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string }>;
}) {
  const params = await searchParams;
  const { data: demandes } = await getMesDemandes();

  return (
    <section className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
      <h1 className="font-display text-4xl font-bold text-text md:text-5xl">
        Mes demandes d&apos;adoption
      </h1>

      {params.success ? (
        <p className="mt-6 rounded-md bg-primary-50 px-4 py-3 text-sm text-primary-dark">
          ✓ Demande envoyée ! Un bénévole va te recontacter par email.
        </p>
      ) : null}

      {demandes.length === 0 ? (
        <div className="mt-10 flex flex-col items-center rounded-3xl border-2 border-dashed border-border bg-surface px-6 py-16 text-center">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary">
            <MailQuestion className="h-8 w-8" />
          </span>
          <h2 className="mt-5 font-display text-2xl font-bold text-text">
            Pas encore de demande
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Parcours les chats et fais une demande pour celui qui te parle.
          </p>
          <Link
            href="/adoption"
            className="mt-5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white"
          >
            Voir les chats
          </Link>
        </div>
      ) : (
        <ul className="mt-10 space-y-4">
          {demandes.map((d) => {
            const photo = getStrapiMedia(d.chat.image?.url);
            const statut = STATUT_LABEL[d.statut] ?? STATUT_LABEL.en_attente;
            return (
              <li key={d.id}>
                <article className="flex gap-4 rounded-2xl bg-surface p-4 ring-1 ring-border md:p-5">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-primary-50 sm:h-24 sm:w-24">
                    {photo ? (
                      <Image src={photo} alt={d.chat.nom} fill sizes="96px" className="object-cover" />
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={`/adoption/${d.chat.slug}`}
                        className="font-display text-lg font-bold text-text hover:text-primary md:text-xl"
                      >
                        {d.chat.nom}
                      </Link>
                      <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${statut.cls}`}>
                        {statut.label}
                      </span>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
                      {d.message}
                    </p>
                    <p className="mt-2 text-xs text-text-muted">
                      Envoyée le {new Date(d.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                    {d.reponseBenevole ? (
                      <div className="mt-3 rounded-lg bg-bg-alt p-3 text-sm text-text">
                        <p className="text-xs font-semibold uppercase tracking-wider text-primary-dark">
                          Réponse de l&apos;asso
                        </p>
                        <p className="mt-1">{d.reponseBenevole}</p>
                      </div>
                    ) : null}
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
