import type { ChatStatut, Entente } from "@/types/strapi";

const STATUT_LABELS: Record<ChatStatut, string> = {
  en_refuge: "Disponible",
  famille_accueil: "En famille d'accueil",
  en_soins: "En soins",
  reserve: "Réservé",
  adopte: "Adopté",
};

/** Libellé affichable du statut ; tolère un statut absent (donnée ancienne). */
export function statutLabel(statut: ChatStatut | null | undefined): string {
  return statut ? STATUT_LABELS[statut] ?? "Disponible" : "Disponible";
}

/**
 * Un chat est adoptable tant qu'il n'est ni réservé ni adopté : un chat en
 * soins ou en famille d'accueil reste visible et peut recevoir des demandes.
 */
export function estAdoptable(statut: ChatStatut | null | undefined): boolean {
  return statut !== "reserve" && statut !== "adopte";
}

const ENTENTE_LABELS: Record<Entente, string> = {
  ok: "OK",
  pas_ok: "Pas OK",
  inconnu: "À tester",
};

export function ententeLabel(entente: Entente | null | undefined): string {
  return entente ? ENTENTE_LABELS[entente] ?? "À tester" : "À tester";
}
