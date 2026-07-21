"use client";

import { useState, type ReactNode } from "react";
import { FileText } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import {
  ACCES_EXTERIEUR_LABELS,
  AUTRES_ANIMAUX_LABELS,
  COMPOSITION_FOYER_LABELS,
  ENFANTS_LABELS,
  EXPERIENCE_CHATS_LABELS,
  LIEU_VIE_ANIMAL_LABELS,
  PREF_AGE_LABELS,
  PREF_SEXE_LABELS,
  PRESENCE_MAISON_LABELS,
  TYPE_LOGEMENT_LABELS,
  TYPE_ZONE_LABELS,
  enumLabel,
} from "@/lib/profil-labels";
import type { ProfilAdoptant } from "@/types/strapi";

interface Props {
  profil: ProfilAdoptant;
  adoptant: string;
}

/** Une ligne label/valeur ; s'efface d'elle-même si la valeur est vide. */
function Ligne({ label, valeur }: { label: string; valeur?: ReactNode }) {
  if (valeur === null || valeur === undefined || valeur === "") return null;
  const texte =
    typeof valeur === "boolean" ? (valeur ? "Oui" : "Non") : valeur;
  return (
    <div>
      <dt className="text-xs text-text-muted">{label}</dt>
      <dd className="text-sm text-text">{texte}</dd>
    </div>
  );
}

/**
 * Un groupe de champs. `valeurs` liste les valeurs brutes de la section : si
 * toutes sont vides, la section entière est masquée (on ne peut pas déduire le
 * vide des children, chaque <Ligne> restant un élément React même quand elle
 * ne rendra rien).
 */
function Section({
  titre,
  valeurs,
  children,
}: {
  titre: string;
  valeurs: unknown[];
  children: ReactNode;
}) {
  const aDuContenu = valeurs.some(
    (v) => v !== null && v !== undefined && v !== ""
  );
  if (!aDuContenu) return null;
  return (
    <section>
      <h3 className="text-xs font-semibold uppercase tracking-wider text-primary-dark">
        {titre}
      </h3>
      <dl className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-3">{children}</dl>
    </section>
  );
}

/** Ajoute une unité à une valeur numérique renseignée (0 inclus), sinon null. */
function avecUnite(valeur: number | null | undefined, unite: string) {
  return valeur === null || valeur === undefined ? null : `${valeur} ${unite}`;
}

/** « 4 ans, 9 ans » depuis un tableau d'âges ; tolère d'anciennes données. */
function formatAges(valeur: unknown): string | null {
  if (!Array.isArray(valeur)) {
    // Ancien format texte libre : on l'affiche tel quel s'il reste une chaîne.
    return typeof valeur === "string" && valeur ? valeur : null;
  }
  const ages = valeur.filter((a): a is number => typeof a === "number");
  return ages.length ? ages.map((a) => `${a} ans`).join(", ") : null;
}

/** « 9 h – 17 h » depuis deux heures, en tolérant un créneau partiel. */
function formatHoraires(
  debut: number | null | undefined,
  fin: number | null | undefined
): string | null {
  const d = debut === null || debut === undefined ? null : `${debut} h`;
  const f = fin === null || fin === undefined ? null : `${fin} h`;
  if (d && f) return `${d} – ${f}`;
  return d ?? f ?? null;
}

/** « 1,8 m » avec séparateur décimal français. */
function formatMetres(valeur: number | null | undefined): string | null {
  return valeur === null || valeur === undefined
    ? null
    : `${valeur.toLocaleString("fr-FR")} m`;
}

export default function DossierAdoptantComplet({ profil, adoptant }: Props) {
  const [open, setOpen] = useState(false);
  const caracteres =
    profil.prefCaracteres && profil.prefCaracteres.length > 0
      ? profil.prefCaracteres.join(", ")
      : null;
  // « Aucune préférence » n'apporte rien au dossier : on le traite comme vide
  // pour ne montrer que les préférences réellement exprimées.
  const prefAge = profil.prefAge === "aucune" ? null : profil.prefAge;
  const prefSexe = profil.prefSexe === "aucune" ? null : profil.prefSexe;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-surface px-3.5 py-1.5 text-xs font-semibold text-primary-dark ring-1 ring-border transition hover:bg-primary-50"
      >
        <FileText className="h-3.5 w-3.5" aria-hidden="true" />
        Voir le dossier complet
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={`Dossier de ${adoptant}`}
      >
        <div className="space-y-6">
          <Section
            titre="Coordonnées"
            valeurs={[
              profil.telephone,
              profil.dateNaissance,
              profil.ville,
              profil.codePostal,
              profil.adressePostale,
            ]}
          >
            <Ligne label="Téléphone" valeur={profil.telephone} />
            <Ligne
              label="Date de naissance"
              valeur={
                profil.dateNaissance
                  ? new Date(profil.dateNaissance).toLocaleDateString("fr-FR")
                  : null
              }
            />
            <Ligne label="Ville" valeur={profil.ville} />
            <Ligne label="Code postal" valeur={profil.codePostal} />
            <Ligne label="Adresse postale" valeur={profil.adressePostale} />
          </Section>

          <Section
            titre="Foyer"
            valeurs={[
              profil.compositionFoyer,
              profil.nbColocataires,
              profil.nbEnfants,
              profil.agesEnfants,
              profil.enfants,
              profil.foyerDaccord,
              profil.foyerDesaccordDetail,
            ]}
          >
            <Ligne
              label="Composition"
              valeur={enumLabel(COMPOSITION_FOYER_LABELS, profil.compositionFoyer)}
            />
            <Ligne label="Nb de colocataires" valeur={profil.nbColocataires} />
            <Ligne label="Nb d'enfants" valeur={profil.nbEnfants} />
            <Ligne label="Âges des enfants" valeur={formatAges(profil.agesEnfants)} />
            <Ligne
              label="Enfants au foyer"
              valeur={enumLabel(ENFANTS_LABELS, profil.enfants)}
            />
            <Ligne label="Foyer d'accord" valeur={profil.foyerDaccord} />
            <Ligne
              label="Détail du désaccord"
              valeur={profil.foyerDesaccordDetail}
            />
          </Section>

          <Section
            titre="Activité"
            valeurs={[
              profil.travaille,
              profil.profession,
              profil.heureDebutTravail,
              profil.heureFinTravail,
              profil.heuresSeulParJour,
            ]}
          >
            <Ligne label="En activité" valeur={profil.travaille} />
            <Ligne label="Profession" valeur={profil.profession} />
            <Ligne
              label="Horaires de travail"
              valeur={formatHoraires(profil.heureDebutTravail, profil.heureFinTravail)}
            />
            <Ligne
              label="Heures seul / jour"
              valeur={avecUnite(profil.heuresSeulParJour, "h")}
            />
          </Section>

          <Section
            titre="Logement & environnement"
            valeurs={[
              profil.typeLogement,
              profil.superficieLogement,
              profil.accesExterieur,
              profil.presenceMaison,
              profil.lieuVieAnimal,
              profil.typeZone,
              profil.proximiteRoutePassante,
              profil.sortiesAutorisees,
              profil.etage,
              profil.fenetresSecurisees,
              profil.envisageSecuriserFenetres,
              profil.superficieJardin,
              profil.jardinGrillage,
              profil.hauteurGrillage,
              profil.superficieBalcon,
              profil.balconSecurise,
            ]}
          >
            <Ligne
              label="Type de logement"
              valeur={enumLabel(TYPE_LOGEMENT_LABELS, profil.typeLogement)}
            />
            <Ligne
              label="Superficie"
              valeur={avecUnite(profil.superficieLogement, "m²")}
            />
            <Ligne
              label="Accès extérieur"
              valeur={enumLabel(ACCES_EXTERIEUR_LABELS, profil.accesExterieur)}
            />
            <Ligne
              label="Présence à la maison"
              valeur={enumLabel(PRESENCE_MAISON_LABELS, profil.presenceMaison)}
            />
            <Ligne
              label="Lieu de vie de l'animal"
              valeur={enumLabel(LIEU_VIE_ANIMAL_LABELS, profil.lieuVieAnimal)}
            />
            <Ligne
              label="Type de zone"
              valeur={enumLabel(TYPE_ZONE_LABELS, profil.typeZone)}
            />
            <Ligne label="Route passante à proximité" valeur={profil.proximiteRoutePassante} />
            <Ligne label="Sorties autorisées" valeur={profil.sortiesAutorisees} />
            <Ligne label="Étage" valeur={profil.etage} />
            <Ligne label="Fenêtres sécurisées" valeur={profil.fenetresSecurisees} />
            <Ligne
              label="Envisage de sécuriser les fenêtres"
              valeur={profil.envisageSecuriserFenetres}
            />
            <Ligne
              label="Superficie du jardin"
              valeur={avecUnite(profil.superficieJardin, "m²")}
            />
            <Ligne label="Jardin grillagé" valeur={profil.jardinGrillage} />
            <Ligne label="Hauteur du grillage" valeur={formatMetres(profil.hauteurGrillage)} />
            <Ligne
              label="Superficie du balcon"
              valeur={avecUnite(profil.superficieBalcon, "m²")}
            />
            <Ligne label="Balcon sécurisé" valeur={profil.balconSecurise} />
          </Section>

          <Section
            titre="Autres animaux"
            valeurs={[
              profil.autresAnimaux,
              profil.autresAnimauxDetail,
              profil.autresAnimauxSterilises,
              profil.autresAnimauxDepuis,
            ]}
          >
            <Ligne
              label="Autres animaux"
              valeur={enumLabel(AUTRES_ANIMAUX_LABELS, profil.autresAnimaux)}
            />
            <Ligne label="Détail" valeur={profil.autresAnimauxDetail} />
            <Ligne label="Stérilisés" valeur={profil.autresAnimauxSterilises} />
            <Ligne label="Depuis" valeur={avecUnite(profil.autresAnimauxDepuis, "ans")} />
          </Section>

          <Section
            titre="Expérience & préférences"
            valeurs={[
              profil.experienceChats,
              prefAge,
              prefSexe,
              caracteres,
            ]}
          >
            <Ligne
              label="Expérience avec les chats"
              valeur={enumLabel(EXPERIENCE_CHATS_LABELS, profil.experienceChats)}
            />
            <Ligne
              label="Préférence d'âge"
              valeur={enumLabel(PREF_AGE_LABELS, prefAge)}
            />
            <Ligne
              label="Préférence de sexe"
              valeur={enumLabel(PREF_SEXE_LABELS, prefSexe)}
            />
            <Ligne label="Caractères recherchés" valeur={caracteres} />
          </Section>

          <Section titre="Remarques" valeurs={[profil.remarques]}>
            <Ligne label="Remarques" valeur={profil.remarques} />
          </Section>
        </div>
      </Modal>
    </>
  );
}
