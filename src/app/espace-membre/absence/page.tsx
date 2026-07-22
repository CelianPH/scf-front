import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Reveal from "@/components/layout/Reveal";
import { getBenevoleMe } from "@/lib/strapi-server";
import AbsenceForm from "@/components/espace-membre/AbsenceForm";

export default async function AbsencePage() {
  const { data: benevole } = await getBenevoleMe();

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <Reveal>
        <Link
          href="/espace-membre"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary transition hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Espace bénévole
        </Link>

        <h1 className="mt-6 font-display text-4xl font-bold text-text md:text-5xl">
          Mes absences
        </h1>
        <p className="mt-3 text-text-secondary md:text-lg">
          Préviens l&apos;association quand tu n&apos;es pas disponible pour
          traiter les demandes d&apos;adoption.
        </p>
      </Reveal>

      <Reveal delay={100} className="mx-auto mt-10 max-w-2xl">
        {benevole ? (
          <AbsenceForm benevole={benevole} />
        ) : (
          <p className="rounded-2xl bg-surface p-5 text-sm text-text-secondary ring-1 ring-border">
            Aucune fiche bénévole n&apos;est rattachée à ton compte. Contacte
            un·e administrateur·rice de l&apos;association.
          </p>
        )}
      </Reveal>
    </section>
  );
}
