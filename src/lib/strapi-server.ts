import "server-only";

import { getAuthToken } from "./cookies";
import type {
  Benevole,
  Chat,
  DemandeAdoption,
  DemandeATraiter,
  ProfilAdoptant,
} from "@/types/strapi";

const INTERNAL =
  process.env.STRAPI_INTERNAL_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export async function getProfilAdoptant(): Promise<{ data: ProfilAdoptant }> {
  const token = await getAuthToken();
  if (!token) throw new Error("Auth required");
  const res = await fetch(`${INTERNAL}/api/profils-adoptants/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`getProfilAdoptant: ${res.status}`);
  return res.json();
}

export async function updateProfilAdoptant(
  data: Partial<ProfilAdoptant>
): Promise<{ data: ProfilAdoptant }> {
  const token = await getAuthToken();
  if (!token) throw new Error("Auth required");
  const res = await fetch(`${INTERNAL}/api/profils-adoptants/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`updateProfilAdoptant: ${res.status}`);
  return res.json();
}

export async function getMesDemandes(): Promise<{ data: DemandeAdoption[] }> {
  const token = await getAuthToken();
  if (!token) throw new Error("Auth required");
  const res = await fetch(`${INTERNAL}/api/demandes-adoption/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`getMesDemandes: ${res.status}`);
  return res.json();
}

/** Demandes que le membre connecté a la charge de traiter. */
export async function getDemandesATraiter(): Promise<{
  data: DemandeATraiter[];
}> {
  const token = await getAuthToken();
  if (!token) throw new Error("Auth required");
  const res = await fetch(`${INTERNAL}/api/demandes-adoption/a-traiter`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`getDemandesATraiter: ${res.status}`);
  return res.json();
}

/** Fiche bénévole du membre connecté (chats suivis, état d'absence). */
export async function getBenevoleMe(): Promise<{ data: Benevole | null }> {
  const token = await getAuthToken();
  if (!token) throw new Error("Auth required");
  const res = await fetch(`${INTERNAL}/api/benevoles/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return { data: null };
  return res.json();
}

export async function getMesFavoris(): Promise<{ data: Chat[] }> {
  const token = await getAuthToken();
  if (!token) return { data: [] };
  const res = await fetch(`${INTERNAL}/api/auth-favoris/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return { data: [] };
  return res.json();
}
