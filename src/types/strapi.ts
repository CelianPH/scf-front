export interface StrapiMedia {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface Mission {
  id: number;
  Titre: string;
  Description: string;
}

export interface Chiffre {
  id: number;
  Valeur: string;
  Label: string;
  Image: StrapiMedia | null;
}

export interface Membre {
  id: number;
  Nom: string;
  Role: string;
  Photo: StrapiMedia;
}

export interface Partenaire {
  id: number;
  Nom: string;
  Logo: StrapiMedia;
  Lien: string | null;
}

export interface PageAccueil {
  id: number;
  documentId: string;
  Hero_titre: string;
  Hero_description: string;
  Hero_image: StrapiMedia;
  Notre_histoire: string;
  Missions: Mission[];
  Chiffres: Chiffre[];
  Equipe: Membre[];
  Partenaires: Partenaire[];
  Cta_titre: string;
  Cta_bouton_1: string;
  Cta_bouton_2: string;
}

export interface PageAccueilResponse {
  data: PageAccueil;
  meta: Record<string, unknown>;
}
