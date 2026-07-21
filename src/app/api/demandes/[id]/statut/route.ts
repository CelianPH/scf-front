import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { getAuthToken } from "@/lib/cookies";
import { CACHE_TAGS } from "@/lib/strapi";

const STRAPI = process.env.STRAPI_INTERNAL_URL ?? "http://localhost:1337";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = await getAuthToken();
  if (!token) {
    return NextResponse.json({ error: "Auth requise" }, { status: 401 });
  }

  const { id } = await params;
  // L'id vient de l'URL : on le borne à un entier avant de le réinjecter dans
  // l'appel Strapi.
  if (!/^\d+$/.test(id)) {
    return NextResponse.json({ error: "Identifiant invalide" }, { status: 400 });
  }

  const body = await req.json();

  const res = await fetch(`${STRAPI}/api/demandes-adoption/${id}/statut`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data: body }),
  });

  const data = await res.json();

  // Une acceptation fait passer le chat en « adopté » côté Strapi. Sans purge,
  // les pages publiques continueraient de le proposer à l'adoption pendant
  // toute la durée du cache (1 h).
  if (res.ok && body?.statut === "acceptee") {
    revalidateTag(CACHE_TAGS.chats, "max");
  }

  return NextResponse.json(data, { status: res.status });
}
