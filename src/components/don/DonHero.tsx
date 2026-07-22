import Image from "next/image";
import type { ComponentType, SVGProps } from "react";
import { BadgePercent, ChevronDown, Receipt, ShieldCheck } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import DonWidget from "@/components/don/DonWidget";
import { getStrapiMedia } from "@/lib/strapi";
import type {
  DonHero as DonHeroData,
  DonReassuranceBand,
  DonWidget as DonWidgetData,
} from "@/types/strapi";

interface DonHeroProps {
  hero: DonHeroData;
  reassurance: DonReassuranceBand | null;
  widget: DonWidgetData | null;
}

type Garantie = {
  key: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
  iconName?: string;
  titre: string;
  detail?: string | null;
};

/** Garanties de secours si le bloc `reassurance` n'est pas renseigné côté Strapi. */
const GARANTIES_FALLBACK: Garantie[] = [
  { key: "secu", icon: ShieldCheck, titre: "Paiement 100 % sécurisé via HelloAsso" },
  { key: "recu", icon: Receipt, titre: "Reçu fiscal généré automatiquement" },
  {
    key: "deduc",
    icon: BadgePercent,
    titre: "Reconnue d'intérêt général — jusqu'à 66 % déductible",
  },
];

/** Colore le dernier mot du titre en rose clair (lisible sur le fond sombre du hero). */
function renderTitre(titre: string) {
  const mots = titre.trim().split(" ");
  if (mots.length < 2) return <span className="text-[#F5C6DC]">{titre}</span>;
  const dernier = mots.pop();
  return (
    <>
      {mots.join(" ")} <span className="text-[#F5C6DC]">{dernier}</span>
    </>
  );
}

export default function DonHero({ hero, reassurance, widget }: DonHeroProps) {
  const imageUrl = hero.image ? (getStrapiMedia(hero.image.url) ?? null) : null;
  const imageAlt = hero.image?.alternativeText ?? "";

  const garanties: Garantie[] =
    reassurance && reassurance.items.length > 0
      ? reassurance.items.map((item) => ({
          key: String(item.id),
          iconName: item.iconName,
          titre: item.titre,
          detail: item.description,
        }))
      : GARANTIES_FALLBACK;

  return (
    <section aria-labelledby="don-hero-titre" className="bg-dark">
      {/* Sur desktop, le split remplit pile la hauteur d'écran restante sous la
         navbar (h ≈ 73px) : le formulaire HelloAsso — dont le bouton « Faire un
         don » — est visible sans scroller la page. */}
      <div className="grid grid-cols-1 overflow-hidden bg-dark lg:h-[calc(100svh-73px)] lg:grid-cols-[1fr_1.05fr]">
          {/* Colonne émotion */}
          <div className="relative flex min-h-[280px] flex-col justify-center overflow-hidden px-6 py-8 sm:px-10 lg:h-full lg:min-h-0 lg:px-12 lg:py-10">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[70%_center]"
              />
            ) : (
              <div className="absolute inset-0 bg-dark" />
            )}
            {/* Voile diagonal doux : sombre à gauche pour asseoir le texte,
               teinte magenta en bas à droite (aligné sur le prototype 2a). */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(120deg,rgba(26,14,36,0.72)_0%,rgba(26,14,36,0.42)_45%,rgba(194,24,91,0.32)_100%)]"
            />

            <div className="relative z-10 max-w-[440px]">
              <h1
                id="don-hero-titre"
                className="font-display text-4xl font-bold leading-[1.1] text-white md:text-5xl"
              >
                {renderTitre(hero.titre)}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-white/90">
                {hero.sousTitre}
              </p>

              <ul className="mt-6 flex flex-col gap-2.5">
                {garanties.map((g) => (
                  <li
                    key={g.key}
                    className="flex items-center gap-2.5 text-sm font-medium text-white"
                  >
                    <span className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[9px] bg-white/15">
                      {g.icon ? (
                        <g.icon className="h-[15px] w-[15px]" aria-hidden="true" />
                      ) : (
                        <Icon
                          name={g.iconName}
                          className="h-[15px] w-[15px]"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                    <span>
                      {g.titre}
                      {g.detail ? (
                        <span className="text-white/65"> — {g.detail}</span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="#don-recit"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/55 px-4 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                Voir pourquoi votre don compte
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Colonne widget */}
          <div className="flex min-h-0 flex-col bg-surface p-6 sm:p-8 lg:h-full lg:px-8 lg:py-7">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
              {widget?.eyebrow ?? "Votre don en 1 minute"}
            </span>
            <h2 className="mt-1.5 font-display text-2xl font-bold text-text">
              {widget?.titre ?? "Choisissez votre montant"}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-text-muted">
              {widget?.sousTexte ??
                "Montant libre, ponctuel ou mensuel — tout se règle directement dans le formulaire sécurisé ci-dessous."}
            </p>
            {widget ? (
              <DonWidget data={widget} className="mt-4 flex-1" />
            ) : null}
          </div>
        </div>
    </section>
  );
}
