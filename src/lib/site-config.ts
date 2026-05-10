/**
 * Configuration centralisée du site SCF.
 *
 * Pour changer le logo : remplacez le fichier public/logo.svg
 * Pour changer les couleurs : modifiez les tokens dans globals.css (@theme inline)
 * Pour changer le nom / liens : modifiez ce fichier
 */

export const siteConfig = {
  /** Nom complet de l'association */
  name: "Sans Croquettes Fixes",

  /** Nom court (affiché dans la navbar mobile) */
  shortName: "SCF",

  /** Description courte */
  description: "Association de protection et de sauvetage animal",

  /** Chemin vers le logo, remplacez le fichier pour changer le logo */
  logo: "/logo.svg",

  /** Liens de navigation principale */
  nav: [
    { href: "#histoire", label: "Notre Histoire" },
    { href: "#missions", label: "Missions" },
    { href: "#equipe", label: "L'équipe" },
    { href: "#partenaires", label: "Partenaires" },
  ],

  /** Liens affichés dans le footer */
  footer: [
    { href: "#histoire", label: "Notre Histoire" },
    { href: "#missions", label: "Missions" },
    { href: "#equipe", label: "L'équipe" },
    { href: "#partenaires", label: "Partenaires" },
  ],
} as const;
