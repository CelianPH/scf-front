import Link from "next/link";
import {
  ArrowLeft,
  IdCard,
  ShieldCheck,
  LogOut,
  Mail,
  CheckCircle2,
  AlertCircle,
  CalendarCheck,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/layout/Reveal";
import { getCurrentUser } from "@/lib/auth";
import LogoutButton from "@/components/compte/LogoutButton";

export default async function ParametresPage() {
  const user = (await getCurrentUser())!;

  return (
    <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
      <Reveal>
        <Link
          href="/compte"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-secondary transition hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Mon espace
        </Link>

        <h1 className="mt-6 font-display text-4xl font-bold text-text md:text-5xl">
          Paramètres
        </h1>
        <p className="mt-3 text-text-secondary md:text-lg">
          Tes informations, tes données personnelles et ta session.
        </p>
      </Reveal>

      <div className="mx-auto mt-10 max-w-2xl space-y-6">
        <Block title="Informations du compte" icon={IdCard} delay={0}>
            <dl>
              <Row
                icon={UserRound}
                label="Nom"
                value={`${user.prenom} ${user.nom}`}
              />
              <Row icon={Mail} label="Email" value={user.email} />
              <Row
                icon={user.confirmed ? CheckCircle2 : AlertCircle}
                label="Email confirmé"
                value={
                  user.confirmed ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Confirmé
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      À vérifier dans ta boîte mail
                    </span>
                  )
                }
              />
              <Row
                icon={CalendarCheck}
                label="CGU acceptées le"
                value={new Date(user.cguAcceptedAt).toLocaleDateString("fr-FR")}
              />
            </dl>
          </Block>

          <Block title="Mes données (RGPD)" icon={ShieldCheck} delay={90}>
            <div className="flex gap-3 rounded-xl bg-bg-alt p-4">
              <ShieldCheck
                className="h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <p className="text-sm leading-relaxed text-text-secondary">
                Tes droits d&apos;accès, de rectification et de portabilité sont
                décrits dans notre{" "}
                <Link
                  href="/politique-de-confidentialite"
                  className="font-medium text-primary underline underline-offset-2"
                >
                  politique de confidentialité
                </Link>
                . Pour exporter ou supprimer tes données, contacte-nous à{" "}
                <a
                  href="mailto:contact@sanscroquettesfixes.fr"
                  className="font-medium text-primary underline underline-offset-2"
                >
                  contact@sanscroquettesfixes.fr
                </a>{" "}
                (un flow automatisé est prévu prochainement).
              </p>
            </div>
          </Block>

          <Block title="Session" icon={LogOut} delay={180}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary via-primary to-primary-vif font-display text-sm font-bold text-white shadow-sm shadow-primary/25">
                  {`${user.prenom?.[0] ?? ""}${user.nom?.[0] ?? ""}`.toUpperCase() || "?"}
                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface bg-green-500" />
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-text">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Connecté·e
                  </p>
                  <p className="truncate text-sm text-text-secondary">
                    {user.email}
                  </p>
                </div>
              </div>
              <LogoutButton />
            </div>
          </Block>
      </div>
    </section>
  );
}

function Block({
  title,
  icon: Icon,
  delay,
  children,
}: {
  title: string;
  icon: LucideIcon;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <section>
        <h2 className="flex items-center gap-2 font-display text-xl font-bold text-text">
          <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
          {title}
        </h2>
        <div className="mt-3 rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-border md:p-6">
          {children}
        </div>
      </section>
    </Reveal>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 items-center gap-1 border-b border-border py-3 last:border-b-0 sm:grid-cols-[200px_1fr]">
      <dt className="flex items-center gap-2 text-sm font-semibold text-text-secondary">
        <Icon className="h-4 w-4 text-text-muted" aria-hidden="true" />
        {label}
      </dt>
      <dd className="text-sm text-text">{value}</dd>
    </div>
  );
}
