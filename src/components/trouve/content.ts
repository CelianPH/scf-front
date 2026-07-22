import {
  Eye,
  Search,
  Stethoscope,
  Cat,
  Leaf,
  PhoneCall,
  type LucideIcon,
} from "lucide-react";

export interface Etape {
  titre: string;
  texte: string;
}

export interface Situation {
  /** Ancre utilisée par le sommaire. */
  id: string;
  titre: string;
  navLabel: string;
  icon: LucideIcon;
  chapo: string;
  etapes: Etape[];
  /** Encart « bon à savoir ». */
  astuce?: string;
  /** Encart d'avertissement. */
  danger?: string;
}

export const SITUATIONS: Situation[] = [
  {
    id: "reflexes",
    titre: "Les premiers réflexes",
    navLabel: "Premiers réflexes",
    icon: Eye,
    chapo:
      "Avant tout : ne vous précipitez pas. Beaucoup de chats croisés dehors ont un foyer et rentrent chez eux. Prenez le temps d'observer avant d'agir.",
    etapes: [
      {
        titre: "Observez avant d'intervenir",
        texte:
          "Le chat a-t-il l'air en bonne santé, propre, à l'aise ? Revient-il au même endroit ? Un chat détendu qui a ses habitudes dans le quartier a très probablement une maison. Un chat maigre, sale, apeuré ou blessé, lui, a sans doute besoin d'aide.",
      },
      {
        titre: "Cherchez un signe d'identification",
        texte:
          "S'il se laisse approcher, regardez s'il porte un collier avec une médaille ou un numéro de téléphone. Ne forcez jamais le contact avec un chat qui recule ou feule.",
      },
      {
        titre: "Proposez de l'eau, pas n'importe quoi",
        texte:
          "Si vous décidez de l'aider, laissez-lui de l'eau fraîche. Évitez de le nourrir aussitôt avec ce que vous avez sous la main : une mauvaise alimentation peut aggraver les choses.",
      },
    ],
    danger:
      "Ne donnez jamais de lait de vache à un chat : la plupart le digèrent mal et cela provoque des diarrhées, dangereuses pour un animal déjà affaibli. De l'eau, uniquement.",
  },
  {
    id: "proprietaire",
    titre: "Retrouver son propriétaire",
    navLabel: "Son propriétaire",
    icon: Search,
    chapo:
      "En France, l'identification est obligatoire. Un chat trouvé a souvent une famille qui le cherche : quelques démarches simples permettent de les réunir.",
    etapes: [
      {
        titre: "Faites lire sa puce chez un vétérinaire",
        texte:
          "C'est le réflexe n°1. N'importe quel vétérinaire lit gratuitement la puce électronique (ou repère un tatouage) et peut retrouver le propriétaire via le fichier national d'identification (i-CAD).",
      },
      {
        titre: "Diffusez sur les sites de perdus-trouvés",
        texte:
          "Publiez une annonce avec une photo et le lieu sur les plateformes dédiées (Filalapat / i-CAD, Pet Alert) et dans les groupes d'entraide locaux. Consultez aussi les annonces de chats perdus du secteur.",
      },
      {
        titre: "Alertez le voisinage",
        texte:
          "Affichettes dans les commerces et boîtes aux lettres, bouche-à-oreille : le propriétaire habite souvent tout près. Une photo bien visible fait la différence.",
      },
      {
        titre: "Déclarez l'animal trouvé en mairie",
        texte:
          "Signaler un animal trouvé à la mairie ou à la police municipale est une démarche légale : on ne peut pas garder un chat trouvé comme si c'était le sien sans ces étapes.",
      },
    ],
    astuce:
      "La lecture de puce est gratuite et prend quelques secondes : la plupart des vétérinaires l'acceptent même sans rendez-vous. C'est le moyen le plus rapide de retrouver une famille.",
  },
  {
    id: "urgence",
    titre: "Le chat est blessé ou en détresse",
    navLabel: "Blessé / urgence",
    icon: Stethoscope,
    chapo:
      "Face à un chat visiblement blessé, très affaibli ou percuté, chaque minute compte. La priorité est de le mettre en sécurité et de joindre un professionnel.",
    etapes: [
      {
        titre: "Contactez un vétérinaire sans attendre",
        texte:
          "Appelez un vétérinaire (ou le service de garde en dehors des horaires) et prévenez l'association. Décrivez l'état de l'animal pour qu'on vous guide sur la marche à suivre.",
      },
      {
        titre: "Manipulez-le avec précaution",
        texte:
          "Un chat qui souffre ou a peur peut griffer et mordre par réflexe. Utilisez une serviette épaisse ou une caisse/un carton pour le contenir, en douceur, sans le brusquer.",
      },
      {
        titre: "Ne donnez ni médicament ni nourriture",
        texte:
          "N'administrez jamais de médicament humain (souvent toxique pour le chat) et ne le nourrissez pas avant l'avis du vétérinaire, surtout s'il doit être examiné ou opéré.",
      },
    ],
    danger:
      "Un chat qui ne peut plus se déplacer, qui saigne, respire difficilement ou vient d'être percuté par une voiture est une urgence vitale : direction le vétérinaire le plus proche, immédiatement.",
  },
  {
    id: "chatons",
    titre: "J'ai trouvé des chatons",
    navLabel: "Des chatons",
    icon: Cat,
    chapo:
      "C'est la situation la plus délicate : par bonne intention, on « sauve » souvent des chatons qui n'avaient pas besoin de l'être. La règle d'or est d'observer avant de toucher.",
    etapes: [
      {
        titre: "Ne les enlevez pas tout de suite",
        texte:
          "Des chatons propres, au chaud et regroupés signifient presque toujours que leur mère est là et s'en occupe : elle s'absente pour chasser et revient. La mère reste leur meilleure chance de survie.",
      },
      {
        titre: "Observez à distance plusieurs heures",
        texte:
          "Éloignez-vous et surveillez discrètement pendant plusieurs heures. Trop de présence humaine peut empêcher la mère de revenir. Notez si elle réapparaît.",
      },
      {
        titre: "Sachez quand intervenir",
        texte:
          "Intervenez si les chatons sont en danger immédiat, s'ils sont froids, sales, faibles et pleurent sans cesse, ou si la mère est absente depuis de longues heures ou retrouvée morte.",
      },
      {
        titre: "Appelez l'association avant d'agir",
        texte:
          "L'élevage de chatons orphelins au biberon est technique et exigeant. Contactez-nous : nous vous conseillerons et pourrons organiser une prise en charge adaptée.",
      },
    ],
    danger:
      "Retirer des chatons à leur mère trop tôt réduit fortement leurs chances de survie. Dans le doute, observez et demandez conseil plutôt que d'agir dans la précipitation.",
  },
  {
    id: "errant",
    titre: "Un chat qui vit dehors",
    navLabel: "Chat libre",
    icon: Leaf,
    chapo:
      "Tous les chats des rues ne sont pas des chats perdus. Certains sont des « chats libres », nés et habitués à vivre dehors, et ne cherchent pas de foyer.",
    etapes: [
      {
        titre: "Chat perdu ou chat libre ?",
        texte:
          "Un chat perdu est en général sociable, cherche le contact et semble désorienté. Un chat libre est plutôt craintif, garde ses distances et fuit l'humain : il n'est pas malheureux pour autant.",
      },
      {
        titre: "Le rôle des campagnes de stérilisation",
        texte:
          "Les chats libres relèvent des programmes de capture, stérilisation puis relâche sur leur lieu de vie. Cela stabilise les populations et améliore leur bien-être, sans chercher à les faire adopter de force.",
      },
      {
        titre: "Ne nourrissez pas au hasard",
        texte:
          "Nourrir sans plan peut aggraver les regroupements et les portées non désirées. Si vous repérez une colonie, contactez-nous : nous pouvons intervenir dans un cadre organisé.",
      },
    ],
    astuce:
      "Signaler une colonie de chats non stérilisés est très utile : c'est souvent le point de départ d'une campagne de stérilisation qui évite des dizaines de naissances.",
  },
];

export interface InfoAPreparer {
  label: string;
  detail: string;
}

export const INFOS_A_PREPARER: InfoAPreparer[] = [
  { label: "Le lieu précis", detail: "Adresse ou quartier où vous avez vu le chat" },
  { label: "Une ou deux photos", detail: "De face et de profil si possible" },
  { label: "Son état apparent", detail: "Blessé, maigre, craintif, sociable…" },
  { label: "Collier ou puce", detail: "Présence d'un collier, résultat d'une lecture de puce" },
  { label: "Depuis quand", detail: "Première fois ou présence répétée dans le secteur" },
  { label: "Vos coordonnées", detail: "Pour qu'on puisse vous recontacter rapidement" },
];

export const CONTACT_EMAIL = "contact@sanscroquettesfixes.fr";
