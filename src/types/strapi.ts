// Types alignés sur les schémas Strapi (scf-back/src/components et /src/api).
// À maintenir manuellement si les schémas changent.

// ---------- Primitives Strapi ----------

export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  mime?: string;
  name?: string;
  formats?: Record<string, { url: string; width: number; height: number }>;
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// ---------- Enums ----------

export type IconName =
  | "PawPrint"
  | "Heart"
  | "HandHeart"
  | "Home"
  | "Stethoscope"
  | "Wheat"
  | "Users"
  | "Eye"
  | "Megaphone"
  | "Clock"
  | "MapPin"
  | "Mail"
  | "Phone"
  | "Package"
  | "UserPlus"
  | "Calendar"
  | "ArrowRight"
  | "Sparkles"
  | "ShieldCheck"
  | "Receipt"
  | "HeartPulse"
  | "Utensils"
  | "Cat"
  | "Leaf"
  | "Search"
  | "ShieldAlert"
  | "Wallet"
  | "ListChecks";

export type CtaVariant =
  | "primary"
  | "secondary"
  | "outlined-primary"
  | "outlined-light"
  | "white";

export type IconPosition = "left" | "right";

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "x"
  | "tiktok"
  | "youtube"
  | "linkedin";

export type ChatSexe = "Femelle" | "Male";

// ---------- Shared components ----------

export interface SharedCta {
  id: number;
  label: string;
  href: string;
  variant: CtaVariant;
  iconName: IconName | null;
  iconPosition: IconPosition | null;
  external: boolean;
}

export interface SharedNavLink {
  id: number;
  label: string;
  href: string;
}

export interface SharedSocialLink {
  id: number;
  platform: SocialPlatform;
  url: string;
}

export interface SharedContactInfo {
  id: number;
  email: string | null;
  emailDistribution: string | null;
  emailDons: string | null;
  phone: string | null;
  addressLines: string | null;
  addressNote: string | null;
}

export interface SharedSeo {
  id: number;
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage: StrapiMedia | null;
}

export interface SharedStat {
  id: number;
  value: string;
  label: string;
  iconName: IconName;
}

export interface SharedInfoCard {
  id: number;
  iconName: IconName;
  titre: string;
  valeur: string;
  detail: string | null;
}

export interface SharedFeatureCard {
  id: number;
  iconName: IconName;
  titre: string;
  description: string | null;
  cta: SharedCta | null;
}

export interface SharedActionCard {
  id: number;
  iconName: IconName;
  titre: string;
  description: string;
  cta: SharedCta;
}

export interface ChatInfoPratique {
  id: number;
  libelle: string;
  valeur: string;
}

// ---------- Collection types ----------

export interface Benevole {
  id: number;
  documentId: string;
  nom: string;
  slug: string;
  role: string | null;
  photo: StrapiMedia | null;
  bio: string | null;
  email: string | null;
  actif: boolean;
  absent: boolean;
  absenceDebut: string | null;
  absenceFin: string | null;
  absenceMotif: string | null;
  chats?: Chat[];
  chatsEnBackup?: Chat[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

/** Statut du chat dans le parcours d'adoption. */
export type ChatStatut =
  | "en_refuge"
  | "famille_accueil"
  | "en_soins"
  | "reserve"
  | "adopte";

/** Entente constatée avec une espèce ou un public. */
export type Entente = "ok" | "pas_ok" | "inconnu";

/** Besoin d'accès extérieur du chat. */
export type BesoinExterieur =
  | "indifferent"
  | "interieur_strict"
  | "acces_exterieur_requis";

export interface Chat {
  id: number;
  documentId: string;
  nom: string;
  slug: string;
  age: string;
  sexe: ChatSexe;
  trait: string;
  description: string | null;
  image: StrapiMedia;
  gallery: StrapiMedia[] | null;
  caracteres: string[] | null;
  infos: ChatInfoPratique[] | null;
  referent: Benevole | null;
  referentsBackup: Benevole[] | null;
  badge: string | null;
  featured: boolean;
  statut: ChatStatut;
  dateNaissance: string | null;
  vaccine: boolean;
  sterilise: boolean;
  identifie: boolean;
  deparasite: boolean;
  fraisAdoption: number | null;
  ententeChiens: Entente;
  ententeChats: Entente;
  ententeEnfants: Entente;
  niveauEnergie: number;
  besoinExterieur: BesoinExterieur;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface Tag {
  id: number;
  documentId: string;
  nom: string;
  slug: string;
}

export interface Article {
  id: number;
  documentId: string;
  titre: string;
  slug: string;
  date: string;
  image: StrapiMedia;
  resume: string | null;
  contenu: string;
  tags: Tag[];
  seo: SharedSeo | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

// ---------- Home components ----------

export interface HomeHero {
  id: number;
  badgeText: string | null;
  badgeIconName: IconName | null;
  titreL1: string;
  titreL2Highlighted: string;
  description: string;
  image: StrapiMedia;
  imageAlt: string | null;
  ctaPrimary: SharedCta | null;
  ctaSecondary: SharedCta | null;
}

export interface HomeStatsBlock {
  id: number;
  ariaLabel: string | null;
  stats: SharedStat[];
}

export interface HomeChatsBlock {
  id: number;
  titre: string;
  description: string | null;
  chats: Chat[];
  ctaSeeAll: SharedCta | null;
}

export interface HomeQuiSommesNous {
  id: number;
  label: string | null;
  titre: string;
  image: StrapiMedia | null;
  imageAlt: string | null;
  paragraphes: string | null;
  quote: string | null;
  quoteHighlight: string | null;
  tags: string[] | null;
  cta: SharedCta | null;
}

export interface HomeDistributionBandeau {
  id: number;
  label: string | null;
  titre: string;
  description: string | null;
  infos: SharedInfoCard[];
  ctaLink: SharedCta | null;
}

export interface HomeGesteCompte {
  id: number;
  titre: string;
  description: string | null;
  actions: SharedActionCard[];
}

export interface HomeActualitesBlock {
  id: number;
  titre: string;
  description: string | null;
  ctaSeeAll: SharedCta | null;
  articles: Article[];
}

export interface HomeCtaFinal {
  id: number;
  labelKicker: string | null;
  titre: string;
  description: string | null;
  ctaPrimary: SharedCta | null;
  ctaSecondary: SharedCta | null;
  chatFeatured: Chat | null;
}

// ---------- About components ----------

export interface AboutHero {
  id: number;
  badgeText: string | null;
  badgeIconName: IconName | null;
  titreL1: string;
  titreL2Highlighted: string | null;
  description: string;
  image: StrapiMedia;
  imageAlt: string | null;
}

export interface AboutJalon {
  id: number;
  annee: string;
  titre: string;
  description: string;
}

export interface AboutHistoire {
  id: number;
  label: string | null;
  titre: string;
  description: string | null;
  jalons: AboutJalon[];
}

export interface AboutMissionSignature {
  id: number;
  badge: string | null;
  label: string;
  labelIconName: IconName | null;
  titre: string;
  description: string;
  infos: SharedInfoCard[];
  emailContact: string | null;
  image: StrapiMedia | null;
  imageAlt: string | null;
}

export interface AboutMissionsBlock {
  id: number;
  label: string | null;
  titre: string;
  description: string | null;
  signature: AboutMissionSignature;
  autres: SharedFeatureCard[];
}

export interface AboutValeur {
  id: number;
  titre: string;
  description: string;
}

export interface AboutValeursBlock {
  id: number;
  label: string | null;
  titre: string;
  valeurs: AboutValeur[];
}

export interface AboutFelinsOmbre {
  id: number;
  badge: string | null;
  titre: string;
  paragraphes: string | null;
  image: StrapiMedia;
  imageAlt: string | null;
  locationBadge: string | null;
  locationIconName: IconName | null;
  collected: number;
  goal: number;
  ctaHelloAsso: SharedCta | null;
  gofundmeNote: string | null;
  fiscalNote: string | null;
}

export interface AboutStatsBand {
  id: number;
  label: string | null;
  titre: string;
  stats: SharedStat[];
}

export interface AboutTemoignage {
  id: number;
  nom: string;
  statut: string;
  histoire: string;
  photo: StrapiMedia;
}

export interface AboutTemoignagesBlock {
  id: number;
  label: string | null;
  titre: string;
  description: string | null;
  items: AboutTemoignage[];
}

export interface AboutCtaFinal {
  id: number;
  labelKicker: string | null;
  titre: string;
  description: string | null;
  ctaPrimary: SharedCta | null;
  ctaSecondary: SharedCta | null;
}

// ---------- Adoption components ----------

export interface AdoptionHeroData {
  id: number;
  image: StrapiMedia | null;
  titreDebut: string;
  titreHighlight: string;
  sousTitre: string;
}

export interface AdoptionMatchingCta {
  id: number;
  badge: string | null;
  titre: string;
  description: string;
  cta: SharedCta;
}

// ---------- Don components ----------

export interface DonHero {
  id: number;
  titre: string;
  sousTitre: string;
  image: StrapiMedia | null;
}

export interface DonReassuranceBand {
  id: number;
  items: SharedFeatureCard[];
}

export interface DonWidget {
  id: number;
  /** Eyebrow au-dessus du titre du widget (ex. « Votre don en 1 minute »). */
  eyebrow: string | null;
  titre: string;
  /** Paragraphe sous le titre du widget. */
  sousTexte: string | null;
  /** URL de la campagne HelloAsso (le `/widget` et `?lang=fr` sont ajoutés côté front). */
  helloAssoUrlUnique: string;
}

export interface DonUtiliteItem {
  id: number;
  iconName: IconName;
  titre: string;
  description: string;
  /** Visuel affiché en haut de la carte récit (optionnel — fallback statique sinon). */
  image?: StrapiMedia | null;
}

export interface DonUtiliteBlock {
  id: number;
  titre: string;
  /** Intro éditoriale du récit (sous le titre). */
  intro: string | null;
  items: DonUtiliteItem[];
}

export interface DonBesoinItem {
  id: number;
  libelle: string;
}

export interface DonAutresActions {
  id: number;
  titre: string;
  intro: string | null;
  actions: SharedActionCard[];
  /** Titre de la carte des besoins matériels (ex. « Nous avons notamment besoin de : »). */
  titreBesoins: string | null;
  /** Liste éditable des besoins matériels. */
  besoins: DonBesoinItem[];
}

// ---------- Single types ----------

export interface AdoptionPage {
  id: number;
  documentId: string;
  hero: AdoptionHeroData;
  matchingCta: AdoptionMatchingCta | null;
  seo: SharedSeo | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface DonPage {
  id: number;
  documentId: string;
  hero: DonHero;
  reassurance: DonReassuranceBand | null;
  widget: DonWidget | null;
  utilite: DonUtiliteBlock | null;
  autresActions: DonAutresActions | null;
  seo: SharedSeo | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface HomePage {
  id: number;
  documentId: string;
  hero: HomeHero;
  statsBlock: HomeStatsBlock | null;
  chatsBlock: HomeChatsBlock | null;
  quiSommesNous: HomeQuiSommesNous | null;
  distributionBandeau: HomeDistributionBandeau | null;
  gesteCompte: HomeGesteCompte | null;
  actualitesBlock: HomeActualitesBlock | null;
  ctaFinal: HomeCtaFinal | null;
  seo: SharedSeo | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface AboutPage {
  id: number;
  documentId: string;
  hero: AboutHero;
  missions: AboutMissionsBlock | null;
  histoire: AboutHistoire | null;
  valeurs: AboutValeursBlock | null;
  felinsOmbre: AboutFelinsOmbre | null;
  statsBand: AboutStatsBand | null;
  temoignages: AboutTemoignagesBlock | null;
  ctaFinal: AboutCtaFinal | null;
  seo: SharedSeo | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface SiteSettings {
  id: number;
  documentId: string;
  siteName: string;
  tagline: string | null;
  navLinks: SharedNavLink[];
  navCta: SharedCta | null;
  footerIntro: string | null;
  footerHelloAssoCta: SharedCta | null;
  footerLinks: SharedNavLink[];
  legalLinks: SharedNavLink[];
  contact: SharedContactInfo | null;
  socials: SharedSocialLink[];
  siret: string | null;
  foundedYear: number | null;
  legalFooterNote: string | null;
  defaultSeo: SharedSeo | null;
  createdAt: string;
  updatedAt: string;
}

// ---------- Auth & user ----------

/**
 * Rôles users-permissions.
 * - `authenticated` : adoptant (rôle attribué à l'inscription)
 * - `membre` : membre de l'association, traite les demandes d'adoption
 */
export type StrapiRole = "public" | "authenticated" | "membre";

/** Type du rôle « Membre de l'association » (cf. src/index.ts côté Strapi). */
export const ROLE_MEMBRE: StrapiRole = "membre";

export interface AuthUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  prenom: string;
  nom: string;
  cguAcceptedAt: string;
  role: { id: number; name: string; type: StrapiRole } | null;
  createdAt: string;
  updatedAt: string;
}

export type TypeLogement = "maison" | "appartement" | "studio";
export type AccesExterieur = "jardin" | "balcon" | "aucun";
export type PresenceMaison = "tout_le_temps" | "partiel" | "bureau";
export type AutresAnimaux = "aucun" | "chats" | "chiens" | "chats_et_chiens" | "autres";
export type Enfants = "aucun" | "moins_6_ans" | "plus_6_ans" | "mixte";
export type ExperienceChats = "jamais" | "passee" | "actuelle" | "fa";
export type PrefAge = "aucune" | "chaton" | "jeune" | "adulte" | "senior";
export type PrefSexe = "aucune" | "femelle" | "male";

export interface ProfilAdoptant {
  id: number;
  documentId: string;
  telephone: string | null;
  dateNaissance: string | null;
  ville: string | null;
  codePostal: string | null;
  typeLogement: TypeLogement | null;
  accesExterieur: AccesExterieur | null;
  presenceMaison: PresenceMaison | null;
  autresAnimaux: AutresAnimaux | null;
  enfants: Enfants | null;
  experienceChats: ExperienceChats | null;
  prefAge: PrefAge | null;
  prefSexe: PrefSexe | null;
  prefCaracteres: string[] | null;
  completionPct: number;
  notesPersonnelles: string | null;

  // Fiche d'adoption SCF — identité et foyer
  adressePostale: string | null;
  compositionFoyer: CompositionFoyer | null;
  nbColocataires: number | null;
  nbEnfants: number | null;
  agesEnfants: number[] | null;
  foyerDaccord: boolean | null;
  foyerDesaccordDetail: string | null;

  // Activité
  travaille: boolean | null;
  profession: string | null;
  heureDebutTravail: number | null;
  heureFinTravail: number | null;
  heuresSeulParJour: number | null;

  // Logement et environnement
  superficieLogement: number | null;
  lieuVieAnimal: LieuVieAnimal | null;
  typeZone: TypeZone | null;
  proximiteRoutePassante: boolean | null;
  sortiesAutorisees: boolean | null;
  etage: number | null;
  fenetresSecurisees: boolean | null;
  envisageSecuriserFenetres: boolean | null;
  superficieJardin: number | null;
  jardinGrillage: boolean | null;
  hauteurGrillage: number | null;
  superficieBalcon: number | null;
  balconSecurise: boolean | null;

  // Autres animaux et remarques
  autresAnimauxDetail: string | null;
  autresAnimauxSterilises: boolean | null;
  autresAnimauxDepuis: number | null;
  remarques: string | null;
}

export type CompositionFoyer = "seul" | "couple" | "colocation" | "autre";
export type LieuVieAnimal = "interieur" | "exterieur" | "les_deux" | "autre";
export type TypeZone = "ville" | "campagne" | "lotissement" | "autre";

export type DemandeStatut = "en_attente" | "en_cours" | "acceptee" | "refusee";

export interface DemandeAdoption {
  id: number;
  documentId: string;
  message: string;
  dateRencontreSouhaitee: string | null;
  /** Rempli seulement quand l'adoptant candidate malgré une incompatibilité. */
  justificationIncompatibilite: string | null;
  statut: DemandeStatut;
  reponseBenevole: string | null;
  repondueAt: string | null;
  assigneeAt: string | null;
  chat: Chat;
  createdAt: string;
  updatedAt: string;
}

/**
 * Demande vue par un membre de l'association : elle porte en plus l'adoptant
 * et son profil, ainsi que le fait d'agir ou non en remplacement du référent.
 */
export interface DemandeATraiter extends DemandeAdoption {
  user: Pick<AuthUser, "id" | "prenom" | "nom" | "email"> & {
    profil: ProfilAdoptant | null;
  };
  enRemplacement: boolean;
}

// ---------- Compatibilité chat ↔ adoptant ----------

export type NiveauCompatibilite = "excellent" | "bon" | "moyen" | "faible";
export type CategorieCritere = "bien_etre" | "capacite" | "preference";

/**
 * Ressenti qualitatif d'un critère. L'adoptant n'a pas le barème : on ne lui
 * montre jamais de nombre, seulement la nature de chaque critère (un atout, un
 * point d'attention, ou neutre) et la raison en langage naturel.
 */
export type Ressenti = "atout" | "neutre" | "attention";

/** Un critère de compatibilité, exprimé sans chiffre. */
export interface CritereCompatibilite {
  code: string;
  libelle: string;
  categorie: CategorieCritere;
  detail: string;
  ressenti: Ressenti;
}

/**
 * Compatibilité d'un chat pour l'adoptant connecté. Volontairement sans
 * pourcentage : seul le niveau qualitatif et l'indicateur `plafonne`
 * (incompatibilité rédhibitoire) pilotent l'affichage.
 */
export interface ChatScore {
  slug: string;
  nom: string;
  niveau: NiveauCompatibilite;
  plafonne: boolean;
  alertes: string[];
  criteres: CritereCompatibilite[];
}

export interface CompatibiliteResponse {
  data: ChatScore[];
  meta: { profilComplet: boolean; champsManquants?: string[] };
}

// ---------- Response aliases ----------

export type HomePageResponse = StrapiSingleResponse<HomePage>;
export type AboutPageResponse = StrapiSingleResponse<AboutPage>;
export type DonPageResponse = StrapiSingleResponse<DonPage>;
export type AdoptionPageResponse = StrapiSingleResponse<AdoptionPage>;
export type SiteSettingsResponse = StrapiSingleResponse<SiteSettings>;
export type ChatsResponse = StrapiCollectionResponse<Chat>;
export type ChatResponse = StrapiSingleResponse<Chat>;
export type ArticlesResponse = StrapiCollectionResponse<Article>;
export type ArticleResponse = StrapiSingleResponse<Article>;
export type TagsResponse = StrapiCollectionResponse<Tag>;

// ---------- Guide pages (Conseils / Chat trouvé) ----------

export interface GuideHero {
  id: number;
  badgeText: string | null;
  titre: string;
  intro: string;
}

export interface GuideStep {
  id: number;
  titre: string;
  texte: string;
}

export interface GuideSection {
  id: number;
  titre: string;
  navLabel: string;
  iconName: IconName | null;
  chapo: string;
  points: GuideStep[];
  astuce: string | null;
  danger: string | null;
}

export interface GuideChecklistItem {
  id: number;
  label: string;
  detail: string | null;
}

export interface GuideFaqItem {
  id: number;
  question: string;
  reponse: string;
}

export interface ConseilsPage {
  id: number;
  documentId: string;
  hero: GuideHero;
  sections: GuideSection[];
  kitKicker: string | null;
  kitTitre: string | null;
  kitDescription: string | null;
  kit: GuideChecklistItem[];
  faqKicker: string | null;
  faqTitre: string | null;
  faq: GuideFaqItem[];
  vetNote: string | null;
  ctaTitre: string | null;
  ctaDescription: string | null;
  ctaPrimary: SharedCta | null;
  ctaSecondary: SharedCta | null;
  seo: SharedSeo | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface ChatTrouvePage {
  id: number;
  documentId: string;
  hero: GuideHero;
  urgenceText: string | null;
  urgenceCtaLabel: string | null;
  situations: GuideSection[];
  infosKicker: string | null;
  infosTitre: string | null;
  infosDescription: string | null;
  infos: GuideChecklistItem[];
  contactTitre: string | null;
  contactDescription: string | null;
  contactEmail: string | null;
  seo: SharedSeo | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export type ConseilsPageResponse = StrapiSingleResponse<ConseilsPage>;
export type ChatTrouvePageResponse = StrapiSingleResponse<ChatTrouvePage>;
