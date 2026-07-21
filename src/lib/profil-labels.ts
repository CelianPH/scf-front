import type { SelectOption } from "@/components/ui/Select";
import type {
  AccesExterieur,
  AutresAnimaux,
  CompositionFoyer,
  Enfants,
  ExperienceChats,
  LieuVieAnimal,
  PrefAge,
  PrefSexe,
  PresenceMaison,
  TypeLogement,
  TypeZone,
} from "@/types/strapi";

/**
 * Libellés français des enums du profil adoptant.
 *
 * Source unique partagée entre le formulaire de saisie (ProfilForm) et les
 * vues de lecture (dossier vu par le bénévole) : sans elle, un même code comme
 * `moins_6_ans` s'affichait « Moins de 6 ans » dans le formulaire mais brut
 * dans la vue bénévole.
 */
export const TYPE_LOGEMENT_LABELS: Record<TypeLogement, string> = {
  maison: "Maison",
  appartement: "Appartement",
  studio: "Studio",
};
export const ACCES_EXTERIEUR_LABELS: Record<AccesExterieur, string> = {
  jardin: "Jardin sécurisé",
  balcon: "Balcon sécurisé",
  aucun: "Aucun",
};
export const PRESENCE_MAISON_LABELS: Record<PresenceMaison, string> = {
  tout_le_temps: "Présent toute la journée",
  partiel: "Mi-temps / en alternance",
  bureau: "Bureau plein temps",
};
export const AUTRES_ANIMAUX_LABELS: Record<AutresAnimaux, string> = {
  aucun: "Aucun",
  chats: "Chat(s)",
  chiens: "Chien(s)",
  chats_et_chiens: "Chats et chiens",
  autres: "Autres animaux",
};
export const ENFANTS_LABELS: Record<Enfants, string> = {
  aucun: "Aucun",
  moins_6_ans: "Moins de 6 ans",
  plus_6_ans: "Plus de 6 ans",
  mixte: "Les deux",
};
export const EXPERIENCE_CHATS_LABELS: Record<ExperienceChats, string> = {
  jamais: "Première adoption",
  passee: "Déjà eu un chat dans le passé",
  actuelle: "J'ai actuellement un chat",
  fa: "Expérience en FA",
};
export const PREF_AGE_LABELS: Record<PrefAge, string> = {
  aucune: "Aucune préférence",
  chaton: "Chaton (< 1 an)",
  jeune: "Jeune (1-3 ans)",
  adulte: "Adulte (3-8 ans)",
  senior: "Senior (8+ ans)",
};
export const PREF_SEXE_LABELS: Record<PrefSexe, string> = {
  aucune: "Aucune préférence",
  femelle: "Femelle",
  male: "Mâle",
};
export const COMPOSITION_FOYER_LABELS: Record<CompositionFoyer, string> = {
  seul: "Je vis seul(e)",
  couple: "En couple",
  colocation: "En colocation",
  autre: "Autre situation",
};
export const LIEU_VIE_ANIMAL_LABELS: Record<LieuVieAnimal, string> = {
  interieur: "Uniquement à l'intérieur",
  exterieur: "Uniquement à l'extérieur",
  les_deux: "Les deux",
  autre: "Autre",
};
export const TYPE_ZONE_LABELS: Record<TypeZone, string> = {
  ville: "En ville",
  campagne: "À la campagne",
  lotissement: "En lotissement",
  autre: "Autre",
};

/** Libellé affichable d'une valeur d'enum ; tolère une valeur absente ou inconnue. */
export function enumLabel<T extends string>(
  labels: Record<T, string>,
  valeur: T | null | undefined
): string | null {
  if (valeur === null || valeur === undefined) return null;
  return labels[valeur] ?? valeur;
}

/** Transforme un Record enum→libellé en options ordonnées pour un <Select>. */
function toOptions<T extends string>(
  labels: Record<T, string>
): SelectOption<T>[] {
  return (Object.entries(labels) as [T, string][]).map(([value, label]) => ({
    value,
    label,
  }));
}

/**
 * Vocabulaire canonique des traits de caractère recherchés.
 *
 * Doit rester le miroir exact de `CARACTERES_CANONIQUES` côté back
 * (`scf-back/src/api/chat/utils/caracteres.ts`) : c'est ce vocabulaire partagé
 * qui permet à l'algorithme de compatibilité de recouper les préférences de
 * l'adoptant avec les caractères des chats. Le back rejette toute valeur hors
 * de cette liste.
 */
export const CARACTERE_OPTIONS = [
  "Câlin",
  "Joueur",
  "Calme",
  "Indépendant",
  "Sociable",
  "Curieux",
  "Timide",
  "Énergique",
  "Doux",
  "Craintif",
] as const;

export const TYPE_LOGEMENT_OPTIONS = toOptions(TYPE_LOGEMENT_LABELS);
export const ACCES_OPTIONS = toOptions(ACCES_EXTERIEUR_LABELS);
export const PRESENCE_OPTIONS = toOptions(PRESENCE_MAISON_LABELS);
export const ANIMAUX_OPTIONS = toOptions(AUTRES_ANIMAUX_LABELS);
export const ENFANTS_OPTIONS = toOptions(ENFANTS_LABELS);
export const EXPERIENCE_OPTIONS = toOptions(EXPERIENCE_CHATS_LABELS);
export const PREF_AGE_OPTIONS = toOptions(PREF_AGE_LABELS);
export const PREF_SEXE_OPTIONS = toOptions(PREF_SEXE_LABELS);
export const COMPOSITION_FOYER_OPTIONS = toOptions(COMPOSITION_FOYER_LABELS);
export const LIEU_VIE_OPTIONS = toOptions(LIEU_VIE_ANIMAL_LABELS);
export const TYPE_ZONE_OPTIONS = toOptions(TYPE_ZONE_LABELS);
