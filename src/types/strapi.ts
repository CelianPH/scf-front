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
  | "Receipt";

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
  description: string;
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
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

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
  badge: string | null;
  featured: boolean;
  adopted: boolean;
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
  mention: string | null;
  ctaPrimary: SharedCta;
  ctaSecondary: SharedCta | null;
}

export interface DonReassuranceBand {
  id: number;
  items: SharedFeatureCard[];
}

export interface DonMontant {
  id: number;
  valeur: number;
  impactText: string | null;
  defaut: boolean;
}

export interface DonWidget {
  id: number;
  titre: string;
  frequenceLabel: string | null;
  frequenceUniqueLabel: string;
  frequenceMensuelLabel: string;
  montantLabel: string | null;
  montants: DonMontant[];
  placeholderMontantLibre: string | null;
  labelMontantLibre: string | null;
  exempleImpactLabel: string | null;
  exempleImpactTexte: string | null;
  helloAssoUrlUnique: string;
  helloAssoUrlMensuel: string | null;
  ctaSubmit: SharedCta | null;
}

export interface DonUtiliteItem {
  id: number;
  iconName: IconName;
  titre: string;
  description: string;
  sousTexte: string | null;
}

export interface DonUtiliteBlock {
  id: number;
  titre: string;
  note: string | null;
  items: DonUtiliteItem[];
}

export interface DonCampagne {
  id: number;
  titre: string;
  description: string | null;
  objectifEUR: number;
  collecteEUR: number | null;
  progressionPct: number | null;
  actif: boolean;
  ctaDetails: SharedCta | null;
  ctaContribuer: SharedCta;
}

export interface DonCampagnesBlock {
  id: number;
  titre: string;
  intro: string | null;
  campagnes: DonCampagne[];
}

export interface DonAutresActions {
  id: number;
  titre: string;
  intro: string | null;
  actions: SharedActionCard[];
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
  campagnes: DonCampagnesBlock | null;
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

export type StrapiRole = "public" | "authenticated" | "benevole";

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
}

export type DemandeStatut = "en_attente" | "en_cours" | "acceptee" | "refusee";

export interface DemandeAdoption {
  id: number;
  documentId: string;
  message: string;
  dateRencontreSouhaitee: string | null;
  statut: DemandeStatut;
  reponseBenevole: string | null;
  repondueAt: string | null;
  assigneeAt: string | null;
  chat: Chat;
  createdAt: string;
  updatedAt: string;
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
