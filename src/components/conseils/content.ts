import {
  Home,
  Utensils,
  HeartPulse,
  Sparkles,
  Cat,
  ShieldAlert,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export interface Conseil {
  titre: string;
  texte: string;
}

export interface GuideSection {
  /** Ancre utilisée par le sommaire et le lien de section. */
  id: string;
  titre: string;
  /** Libellé court pour le sommaire. */
  navLabel: string;
  icon: LucideIcon;
  chapo: string;
  conseils: Conseil[];
  /** Encart « bon à savoir ». */
  astuce?: string;
  /** Encart d'avertissement (danger réel pour l'animal). */
  danger?: string;
}

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    id: "arrivee",
    titre: "L'arrivée à la maison",
    navLabel: "L'arrivée",
    icon: Home,
    chapo:
      "Les premiers jours conditionnent la confiance de votre chat. On mise sur le calme, un espace à lui, et surtout aucune précipitation.",
    conseils: [
      {
        titre: "Préparez une pièce refuge",
        texte:
          "Avant l'arrivée, installez dans une pièce calme tout ce dont il a besoin : eau, nourriture, litière (éloignée des gamelles), un couchage et une cachette. Ce petit territoire sécurisant l'aide à prendre ses marques sans être submergé.",
      },
      {
        titre: "Laissez-le explorer à son rythme",
        texte:
          "Ouvrez la caisse de transport et laissez-le sortir seul. Ne le forcez jamais au contact : c'est lui qui vient vers vous. Élargissez son accès au reste du logement progressivement, sur plusieurs jours.",
      },
      {
        titre: "Ne changez pas son alimentation tout de suite",
        texte:
          "Gardez la même nourriture que celle qu'il avait avant, au moins la première semaine. Un changement brutal ajouté au stress du déménagement provoque souvent des troubles digestifs.",
      },
      {
        titre: "Proposez un griffoir dès le départ",
        texte:
          "Un arbre à chat ou un griffoir présent immédiatement l'aide à marquer son territoire de façon saine et à se percher en hauteur pour observer, ce qui est très rassurant pour lui.",
      },
    ],
    astuce:
      "Un diffuseur de phéromones apaisantes (type Feliway) branché dans la pièce refuge peut nettement faciliter l'acclimatation des chats anxieux.",
    danger:
      "Ne laissez jamais sortir un chat qui vient d'arriver : il faut plusieurs semaines d'acclimatation avant qu'il sache retrouver son chez-lui, sinon il risque de fuir et de se perdre.",
  },
  {
    id: "alimentation",
    titre: "Bien le nourrir",
    navLabel: "Alimentation",
    icon: Utensils,
    chapo:
      "Le chat est un carnivore strict : son organisme est conçu pour vivre presque exclusivement de protéines animales. Son alimentation ne s'improvise pas.",
    conseils: [
      {
        titre: "Des protéines animales avant tout",
        texte:
          "Choisissez une alimentation de qualité, riche en protéines animales et pauvre en céréales. Le chat a besoin de nutriments qu'il ne trouve que dans la viande, comme la taurine, essentielle à son cœur et à sa vue.",
      },
      {
        titre: "De l'eau fraîche en permanence",
        texte:
          "L'hydratation est cruciale, surtout pour les reins et les voies urinaires. Laissez de l'eau propre à volonté, dans un récipient éloigné de la litière et si possible de la gamelle.",
      },
      {
        titre: "Fractionnez les repas",
        texte:
          "À l'état naturel, le chat fait une dizaine de petits repas par jour. Répartissez sa ration en plusieurs prises, ou utilisez un distributeur, plutôt qu'un seul gros repas.",
      },
      {
        titre: "Surveillez le poids",
        texte:
          "Le surpoids est fréquent chez le chat d'intérieur et favorise diabète et problèmes articulaires. Adaptez les quantités à son âge, son poids et son activité, et pesez-le régulièrement.",
      },
    ],
    astuce:
      "Une fontaine à eau incite beaucoup de chats à boire davantage : l'eau qui coule les attire, ce qui aide à prévenir les problèmes urinaires.",
    danger:
      "Plusieurs aliments courants sont toxiques : chocolat, oignon, ail, raisin et raisins secs, alcool, caféine, os cuits, et le lait de vache que la plupart des chats adultes digèrent mal. En cas d'ingestion, contactez un vétérinaire sans attendre.",
  },
  {
    id: "sante",
    titre: "Santé & prévention",
    navLabel: "Santé",
    icon: HeartPulse,
    chapo:
      "Un suivi vétérinaire régulier et quelques gestes de prévention permettent d'éviter la majorité des problèmes graves, ou de les prendre à temps.",
    conseils: [
      {
        titre: "Vaccins et rappels",
        texte:
          "Les vaccins de base protègent du typhus et du coryza ; la leucose est recommandée pour les chats ayant accès à l'extérieur. Respectez le calendrier de rappels indiqué par votre vétérinaire.",
      },
      {
        titre: "Vermifuge et antiparasitaires",
        texte:
          "Vermifugez votre chat plusieurs fois par an et protégez-le contre les puces et les tiques, même s'il vit en intérieur : les parasites s'invitent facilement via nos vêtements ou d'autres animaux.",
      },
      {
        titre: "Stérilisation et identification",
        texte:
          "La stérilisation protège la santé de l'animal, évite les portées non désirées et apaise de nombreux comportements (marquage, fugues, bagarres). L'identification par puce électronique est par ailleurs obligatoire en France.",
      },
      {
        titre: "Une visite de contrôle par an",
        texte:
          "Même en pleine forme, un bilan annuel permet de détecter tôt les soucis dentaires, rénaux ou de poids. Chez le chat âgé, deux visites par an sont conseillées.",
      },
    ],
    astuce:
      "Apprenez à repérer les signes qui doivent alerter : refus de manger plus de 24 h, abattement inhabituel, vomissements ou diarrhées répétés, ou changement brutal de comportement.",
    danger:
      "Un chat, en particulier un mâle, qui se rend souvent à la litière sans réussir à uriner et qui semble douloureux est une URGENCE VITALE (obstruction urinaire). Filez chez le vétérinaire immédiatement.",
  },
  {
    id: "litiere",
    titre: "Litière & propreté",
    navLabel: "Litière",
    icon: Sparkles,
    chapo:
      "La propreté est naturelle chez le chat. Quand elle se dégrade, c'est presque toujours un message : problème de bac, de stress ou de santé.",
    conseils: [
      {
        titre: "La bonne règle : un bac par chat, plus un",
        texte:
          "Dans un foyer avec deux chats, prévoyez trois bacs. Placez-les dans des endroits calmes, faciles d'accès, à l'écart des gamelles et des zones de passage.",
      },
      {
        titre: "Un entretien quotidien",
        texte:
          "Retirez les souillures chaque jour et changez la litière régulièrement. Un chat très propre peut bouder un bac sale et aller faire ailleurs.",
      },
      {
        titre: "Choisissez une litière qui lui convient",
        texte:
          "Beaucoup de chats préfèrent une litière fine et agglomérante, sans parfum. Une profondeur de quelques centimètres et un bac assez grand pour qu'il s'y retourne font la différence.",
      },
      {
        titre: "Ne bouleversez pas ses repères",
        texte:
          "Évitez de déplacer le bac ou de changer brutalement de type de litière. Toute modification se fait en douceur pour ne pas le perturber.",
      },
    ],
    astuce:
      "Un chat propre qui se met soudain à faire ses besoins hors du bac exprime souvent un mal-être ou un problème de santé : mieux vaut consulter plutôt que gronder.",
  },
  {
    id: "comportement",
    titre: "Comportement & bien-être",
    navLabel: "Comportement",
    icon: Cat,
    chapo:
      "Comprendre ce que votre chat exprime et répondre à ses besoins naturels, c'est la clé d'une cohabitation sereine — et d'un chat épanoui.",
    conseils: [
      {
        titre: "Jouer, tous les jours",
        texte:
          "Le jeu reproduit la chasse et canalise son énergie, surtout en intérieur. Quelques séances quotidiennes avec une canne à plume ou une balle préviennent l'ennui, le surpoids et bien des bêtises.",
      },
      {
        titre: "Les griffades sont un besoin",
        texte:
          "Faire ses griffes entretient les ongles et marque le territoire : c'est indispensable. Offrez-lui des griffoirs adaptés plutôt que de le punir, et placez-les aux endroits stratégiques (près des zones de repos).",
      },
      {
        titre: "Apprenez son langage",
        texte:
          "Un clignement lent des yeux traduit la confiance, une queue dressée un bonjour amical, des oreilles couchées de l'agacement. Observer sa posture évite bien des malentendus.",
      },
      {
        titre: "Respectez son besoin de calme et de hauteur",
        texte:
          "Le chat a besoin de perchoirs pour observer et de coins tranquilles pour se retirer. Ne le dérangez pas quand il dort ou mange, et laissez-lui toujours une échappatoire.",
      },
    ],
    astuce:
      "Le clignement lent des yeux est un véritable « je t'aime » en langage félin. Adressez-le à votre chat, tout doucement : il vous le rendra souvent.",
    danger:
      "Ne punissez jamais un chat physiquement ni en criant : il n'associe pas la punition à son acte, ne comprend que la peur, et cela abîme durablement votre relation. Privilégiez toujours le renforcement positif.",
  },
  {
    id: "securite",
    titre: "Un habitat sécurisé",
    navLabel: "Sécurité",
    icon: ShieldAlert,
    chapo:
      "Notre intérieur est plein de dangers invisibles pour un chat curieux. Quelques précautions simples évitent des accidents parfois dramatiques.",
    conseils: [
      {
        titre: "Sécurisez fenêtres et balcons",
        texte:
          "Contrairement à une idée reçue, le chat ne « retombe pas toujours sur ses pattes » : les chutes d'étage sont fréquentes et graves. Posez des filets ou des grilles sur les fenêtres oscillo-battantes et les balcons.",
      },
      {
        titre: "Éloignez les plantes toxiques",
        texte:
          "De nombreuses plantes d'intérieur sont dangereuses : lys, dieffenbachia, poinsettia, muguet, laurier-rose. Renseignez-vous avant d'en adopter une, et placez-la hors de portée.",
      },
      {
        titre: "Rangez produits et petits objets",
        texte:
          "Produits ménagers, médicaments humains, fils électriques, élastiques, ficelles et petites pièces peuvent être ingérés ou provoquer des occlusions. Rangez-les et protégez les câbles.",
      },
      {
        titre: "Attention aux pièges du quotidien",
        texte:
          "Vérifiez toujours le lave-linge et le sèche-linge avant de les fermer, ainsi que les recoins où un chat aime se cacher. Fermez les toilettes et surveillez les portes.",
      },
    ],
    danger:
      "Le lys est mortel pour le chat, même en très petite quantité (pollen, feuille, eau du vase). Si vous avez un chat, bannissez purement et simplement les lys de votre maison.",
  },
  {
    id: "cohabitation",
    titre: "Vivre à plusieurs",
    navLabel: "Cohabitation",
    icon: Users,
    chapo:
      "Enfants, autres chats, chiens… l'harmonie se construit avec des présentations progressives et le respect du rythme de chacun.",
    conseils: [
      {
        titre: "Présentez les animaux en douceur",
        texte:
          "Ne mettez jamais deux animaux face à face du jour au lendemain. Commencez par séparer les espaces et échanger les odeurs (couvertures), puis organisez des rencontres courtes et supervisées, de plus en plus longues.",
      },
      {
        titre: "Apprenez aux enfants à le respecter",
        texte:
          "Un chat n'est pas une peluche. Montrez aux enfants à ne pas le déranger quand il mange, dort ou se cache, à le caresser doucement et à reconnaître les signes qui disent « laisse-moi ».",
      },
      {
        titre: "Multipliez les ressources",
        texte:
          "Dans un foyer à plusieurs chats, multipliez gamelles, points d'eau, litières et couchages, répartis à différents endroits. Cela évite les tensions liées au partage des ressources.",
      },
    ],
    astuce:
      "Chaque chat a son tempérament et son rythme : certaines cohabitations prennent quelques jours, d'autres plusieurs semaines. La patience est votre meilleure alliée.",
  },
  {
    id: "budget",
    titre: "Budget & engagement",
    navLabel: "Budget",
    icon: Wallet,
    chapo:
      "Adopter un chat, c'est un engagement de toute une vie — la sienne. Mieux vaut anticiper le coût réel avant de se lancer.",
    conseils: [
      {
        titre: "Le coût de départ",
        texte:
          "Au-delà de la participation à l'adoption, prévoyez l'équipement initial : gamelles, bac et litière, griffoir ou arbre à chat, caisse de transport, couchage et jouets.",
      },
      {
        titre: "Les dépenses récurrentes",
        texte:
          "Chaque mois : alimentation de qualité, litière, et une réserve pour les soins. Comptez aussi les frais vétérinaires annuels (vaccins, vermifuge, contrôle).",
      },
      {
        titre: "Anticipez les imprévus",
        texte:
          "Une maladie ou un accident peut représenter plusieurs centaines d'euros. Une épargne dédiée ou une assurance santé animale évite d'avoir à choisir entre son budget et la santé de son chat.",
      },
      {
        titre: "Un compagnon pour 15 à 20 ans",
        texte:
          "Un chat bien soigné vit couramment quinze à vingt ans. C'est un engagement long : pensez aux vacances, aux déménagements et aux changements de vie à venir.",
      },
    ],
    astuce:
      "En rythme de croisière, on estime souvent le coût d'un chat entre 30 et 60 € par mois, hors frais vétérinaires exceptionnels.",
  },
];

export interface FaqItem {
  question: string;
  reponse: string;
}

export const GUIDE_FAQ: FaqItem[] = [
  {
    question: "Un chat peut-il vivre heureux uniquement en intérieur ?",
    reponse:
      "Oui, tout à fait, à condition de lui offrir assez de stimulation : jeux quotidiens, griffoirs, perchoirs, fenêtres avec vue et un peu d'attention. Un intérieur bien pensé est même plus sûr que l'extérieur (voiture, maladies, prédateurs).",
  },
  {
    question: "Combien de temps un chat peut-il rester seul ?",
    reponse:
      "Un chat adulte peut rester seul une journée s'il a de l'eau, de la nourriture, une litière propre et de quoi s'occuper. Au-delà d'une journée, prévoyez le passage d'une personne. Les chatons, eux, ne doivent pas rester seuls longtemps.",
  },
  {
    question: "Vaut-il mieux adopter un ou deux chats ?",
    reponse:
      "Deux chats, surtout jeunes et vivant en intérieur, se tiennent souvent compagnie et s'ennuient moins. Ce n'est pas une règle absolue : certains adultes préfèrent être seuls. En cas de doute, demandez conseil à l'association.",
  },
  {
    question: "Mon chat griffe le canapé, que faire ?",
    reponse:
      "Ne le punissez pas : il répond à un besoin naturel. Placez un griffoir attractif juste à côté de la zone qu'il abîme, récompensez-le quand il l'utilise, et rendez le canapé moins intéressant (protection temporaire). La stérilisation aide aussi à réduire le marquage.",
  },
  {
    question: "Le ronronnement signifie-t-il toujours qu'il est content ?",
    reponse:
      "Le plus souvent, oui. Mais le chat ronronne aussi parfois pour s'apaiser lorsqu'il a mal ou peur. C'est l'ensemble de sa posture et du contexte qui donne le sens : un ronron accompagné de signes de douleur doit alerter.",
  },
  {
    question: "Faut-il baigner son chat ?",
    reponse:
      "En principe non : le chat fait sa toilette seul et le bain le stresse. On ne le lave que sur recommandation vétérinaire (traitement, salissure importante). Un brossage régulier suffit à l'entretien de son pelage.",
  },
];

export interface ChecklistItem {
  label: string;
  detail: string;
}

export const KIT_DEPART: ChecklistItem[] = [
  { label: "Gamelles eau + nourriture", detail: "Inox ou céramique, faciles à nettoyer" },
  { label: "Bac à litière + litière", detail: "Un bac par chat, plus un" },
  { label: "Griffoir ou arbre à chat", detail: "Pour griffer et se percher" },
  { label: "Caisse de transport", detail: "Solide, pour le véto et les trajets" },
  { label: "Couchage douillet", detail: "Dans un coin calme et en hauteur si possible" },
  { label: "Jouets variés", detail: "Canne à plume, balles, jouets d'occupation" },
  { label: "Brosse adaptée", detail: "Selon la longueur du poil" },
  { label: "Nourriture de qualité", detail: "La même qu'avant l'adoption au début" },
  { label: "Coordonnées d'un vétérinaire", detail: "Repéré à l'avance, avec les urgences" },
  { label: "Diffuseur de phéromones", detail: "Optionnel, utile pour les plus stressés" },
];
