import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBenevoleMe } from "@/lib/strapi-server";
import AbsenceForm from "@/components/espace-membre/AbsenceForm";

export default async function AbsencePage() {
  const { data: benevole } = await getBenevoleMe();

  return (
    <section className="mx-auto max-w-2xl px-5 py-12 md:px-8 md:py-16">
      <Link
        href="/espace-membre"
        className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text"
      >
        <ArrowLeft className="h-4 w-4" />
        Espace membre
      </Link>

      <h1 className="mt-4 font-display text-4xl font-bold text-text md:text-5xl">
        Mes absences
      </h1>
      <p className="mt-2 text-text-secondary">
        Préviens l&apos;association quand tu n&apos;es pas disponible pour
        traiter les demandes d&apos;adoption.
      </p>

      <div className="mt-8">
        {benevole ? (
          <AbsenceForm benevole={benevole} />
        ) : (
          <p className="rounded-2xl bg-surface p-5 text-sm text-text-secondary ring-1 ring-border">
            Aucune fiche bénévole n&apos;est rattachée à ton compte. Contacte
            un·e administrateur·rice de l&apos;association.
          </p>
        )}
      </div>

      {benevole?.chats?.length ? (
        <div className="mt-8">
          <h2 className="font-display text-xl font-bold text-text">
            Chats dont tu es référent·e
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {benevole.chats.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/adoption/${c.slug}`}
                  className="inline-block rounded-full bg-surface px-3 py-1.5 text-sm text-text ring-1 ring-border hover:ring-primary"
                >
                  {c.nom}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
