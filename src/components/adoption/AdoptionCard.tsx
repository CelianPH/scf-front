import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, PawPrint, Syringe, ShieldCheck, ScanLine, Zap, Heart, type LucideIcon } from "lucide-react";
import { getStrapiMedia } from "@/lib/strapi";
import { estAdoptable, statutLabel } from "@/lib/chat-statut";
import type { Chat } from "@/types/strapi";

interface AdoptionCardProps {
  chat: Chat;
}

export default function AdoptionCard({ chat }: AdoptionCardProps) {
  const sexeLabel = chat.sexe === "Male" ? "Mâle" : "Femelle";
  const imageUrl = getStrapiMedia(chat.image?.url) ?? "";
  const statusLabel = statutLabel(chat.statut);
  const adoptable = estAdoptable(chat.statut);
  const e = chat.sexe === "Femelle" ? "e" : "";

  // Soins déjà réalisés : on ne montre que les acquis (rassurant, sans bruit).
  const soins: { icon: LucideIcon; label: string }[] = [
    chat.sterilise && { icon: ShieldCheck, label: `Stérilisé${e}` },
    chat.vaccine && { icon: Syringe, label: `Vacciné${e}` },
    chat.identifie && { icon: ScanLine, label: `Identifié${e}` },
  ].filter(Boolean) as { icon: LucideIcon; label: string }[];

  return (
    <Link
      href={`/adoption/${chat.slug}`}
      aria-label={`Découvrir ${chat.nom}, chat ${sexeLabel.toLowerCase()} de ${chat.age}`}
      className="group block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <article
        className={`relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface transition duration-300 ease-out group-hover:-translate-y-1 group-hover:shadow-2xl group-hover:shadow-primary/15 motion-reduce:group-hover:translate-y-0 ${
          chat.featured
            ? "ring-2 ring-primary/30 shadow-md shadow-primary/10"
            : "ring-1 ring-border"
        }`}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br from-primary-50 via-bg-alt to-secondary-50">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={
                chat.image?.alternativeText ??
                `${chat.nom}, chat ${sexeLabel.toLowerCase()} de ${chat.age}`
              }
              fill
              sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, (min-width:640px) 50vw, 100vw"
              className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-primary/40">
              <PawPrint className="h-16 w-16" aria-hidden="true" />
            </div>
          )}

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/15 to-transparent opacity-90"
          />

          <span
            className={`absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm ${
              adoptable
                ? "bg-white text-primary ring-1 ring-primary/10"
                : "bg-text-muted text-white"
            }`}
          >
            {adoptable && (
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-60 motion-reduce:hidden" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
            )}
            {statusLabel}
          </span>

          {chat.badge ? (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              {chat.badge}
            </span>
          ) : chat.featured ? (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-primary shadow-sm ring-1 ring-primary/10">
              <Heart className="h-3 w-3 fill-primary" aria-hidden="true" />
              Coup de cœur
            </span>
          ) : null}

          <div className="absolute inset-x-4 bottom-4 text-white">
            <h3 className="font-display text-2xl font-bold leading-tight drop-shadow-sm md:text-3xl">
              {chat.nom}
            </h3>
            <p className="mt-1 text-sm font-medium text-white/90">
              {sexeLabel} · {chat.age}
            </p>
            {chat.niveauEnergie ? (
              <div
                className="mt-2 flex items-center gap-1.5"
                title={`Niveau d'énergie : ${chat.niveauEnergie}/5`}
              >
                <Zap className="h-3.5 w-3.5 text-white/90" aria-hidden="true" />
                <span
                  className="flex items-center gap-1"
                  role="img"
                  aria-label={`Niveau d'énergie ${chat.niveauEnergie} sur 5`}
                >
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-1.5 rounded-full ${
                        i < chat.niveauEnergie ? "bg-white" : "bg-white/30"
                      }`}
                    />
                  ))}
                </span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="line-clamp-2 text-sm leading-relaxed text-text-secondary md:text-[15px]">
            {chat.trait}
          </p>

          {chat.caracteres && chat.caracteres.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {chat.caracteres.slice(0, 3).map((c) => (
                <li
                  key={c}
                  className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-dark"
                >
                  {c}
                </li>
              ))}
              {chat.caracteres.length > 3 ? (
                <li className="rounded-full bg-bg-alt px-2.5 py-0.5 text-xs font-medium text-text-muted">
                  +{chat.caracteres.length - 3}
                </li>
              ) : null}
            </ul>
          ) : null}

          {soins.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {soins.map((s) => (
                <li
                  key={s.label}
                  className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-green-100"
                >
                  <s.icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {s.label}
                </li>
              ))}
            </ul>
          ) : null}

          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-[gap] duration-200 group-hover:gap-2.5">
            Faire connaissance
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </article>
    </Link>
  );
}
