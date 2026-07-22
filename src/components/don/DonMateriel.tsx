import Reveal from "@/components/layout/Reveal";
import { Section } from "@/components/ui/Section";
import type { DonAutresActions as DonAutresActionsData } from "@/types/strapi";

interface DonMaterielProps {
  data: DonAutresActionsData;
}

const EMAIL_DONS = "dons@sanscroquettesfixes.fr";

/** Besoins de secours si le back n'en fournit pas encore (`autresActions.besoins`). */
const BESOINS_FALLBACK = [
  "Nourriture humide chats & chiens (non périmée)",
  "Croquettes chats & chiens (paquets fermés)",
  "Friandises",
  "Accessoires chiens (harnais, laisses…)",
  "Produits de soins (shampoing, nettoyant…)",
  "Jeux et jouets",
];

const TITRE_FALLBACK = "Et les dons matériels ?";
const DESC_FALLBACK =
  "Du matériel inutilisé ou en bon état à transmettre ? On en a peut-être besoin.";
const TITRE_BESOINS_FALLBACK = "Nous avons notamment besoin de :";

export default function DonMateriel({ data }: DonMaterielProps) {
  // L'action « don matériel » se repère à son CTA de type mailto.
  const materiel = data.actions.find((a) => a.cta.href.startsWith("mailto:"));
  const emailHref = materiel?.cta.href ?? `mailto:${EMAIL_DONS}`;
  const email = emailHref.replace(/^mailto:/, "");

  const besoins =
    data.besoins && data.besoins.length > 0
      ? data.besoins.map((b) => b.libelle)
      : BESOINS_FALLBACK;
  const titreBesoins = data.titreBesoins ?? TITRE_BESOINS_FALLBACK;

  return (
    <Section aria-labelledby="don-materiel-titre" bg="bg-alt" size="compact">
      <div className="mx-auto grid max-w-[980px] grid-cols-1 items-center gap-8 md:grid-cols-[0.9fr_1.1fr] md:gap-11">
        <Reveal>
          <span className="text-sm font-semibold uppercase tracking-wider text-secondary">
            Sans donner d&apos;argent
          </span>
          <h2
            id="don-materiel-titre"
            className="mt-2 font-display text-3xl font-bold text-text"
          >
            {materiel?.titre ?? TITRE_FALLBACK}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-text-secondary">
            {materiel?.description ?? DESC_FALLBACK} Écrivez-nous à{" "}
            <a href={emailHref} className="font-bold text-secondary hover:text-secondary-dark">
              {email}
            </a>
            .
          </p>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            Nous revenons vers vous rapidement pour organiser la récupération ou l&apos;envoi{" "}
            <strong className="text-text-secondary">(Lyon et alentours seulement)</strong>.
          </p>
        </Reveal>

        <Reveal delay={90}>
          <div className="rounded-[18px] border border-border bg-surface p-6 md:px-8">
            <p className="font-semibold text-text">{titreBesoins}</p>
            <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
              {besoins.map((besoin) => (
                <li
                  key={besoin}
                  className="flex items-start gap-2.5 text-sm leading-snug text-text-secondary"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                  />
                  {besoin}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
