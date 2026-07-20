import { NextResponse } from "next/server";
import { getAuthToken } from "@/lib/cookies";

const STRAPI = process.env.STRAPI_INTERNAL_URL ?? "http://localhost:1337";

/**
 * Compatibilité des chats pour l'adoptant connecté. Consommé côté client
 * (badges de la liste / fiche), d'où le proxy : le token httpOnly n'est pas
 * lisible depuis le navigateur.
 *
 * Un visiteur non connecté n'est pas une erreur : on renvoie `data: null` pour
 * que l'UI reste identique à aujourd'hui (aucun badge), sans lever d'exception.
 */
export async function GET(req: Request) {
  const token = await getAuthToken();
  if (!token) return NextResponse.json({ data: null });

  const slug = new URL(req.url).searchParams.get("slug");
  const qs = slug ? `?slug=${encodeURIComponent(slug)}` : "";

  const res = await fetch(`${STRAPI}/api/chats/compatibilite${qs}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);
  return NextResponse.json(data ?? { data: null }, { status: res.status });
}
