import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/components/compte/LogoutButton";

export default async function ParametresPage() {
  const user = (await getCurrentUser())!;

  return (
    <section className="mx-auto max-w-2xl px-5 py-12 md:px-8 md:py-16">
      <h1 className="font-display text-4xl font-bold text-text md:text-5xl">
        Paramètres
      </h1>

      <div className="mt-10 space-y-6">
        <Block title="Informations du compte">
          <Row label="Nom" value={`${user.prenom} ${user.nom}`} />
          <Row label="Email" value={user.email} />
          <Row
            label="Email confirmé"
            value={user.confirmed ? "Oui ✓" : "Non — vérifie ta boîte mail"}
          />
          <Row
            label="CGU acceptées le"
            value={new Date(user.cguAcceptedAt).toLocaleDateString("fr-FR")}
          />
        </Block>

        <Block title="Mes données (RGPD)">
          <p className="text-sm text-text-secondary">
            Tes droits d&apos;accès, de rectification et de portabilité sont décrits
            dans notre{" "}
            <Link href="/politique-de-confidentialite" className="text-primary underline">
              politique de confidentialité
            </Link>
            . Pour exporter ou supprimer tes données, contacte-nous à{" "}
            <a
              href="mailto:contact@sanscroquettesfixes.fr"
              className="text-primary underline"
            >
              contact@sanscroquettesfixes.fr
            </a>{" "}
            (un flow automatisé est prévu prochainement).
          </p>
        </Block>

        <Block title="Session">
          <LogoutButton />
        </Block>
      </div>
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-bold text-text">{title}</h2>
      <div className="mt-3 rounded-2xl bg-surface p-5 ring-1 ring-border md:p-6">
        {children}
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-b border-border py-3 last:border-b-0 sm:grid-cols-[200px_1fr]">
      <dt className="text-sm font-semibold text-text-secondary">{label}</dt>
      <dd className="text-sm text-text">{value}</dd>
    </div>
  );
}
