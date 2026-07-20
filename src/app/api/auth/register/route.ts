import { NextResponse } from "next/server";
import { setAuthCookie } from "@/lib/cookies";

const STRAPI = process.env.STRAPI_INTERNAL_URL ?? "http://localhost:1337";

export async function POST(req: Request) {
  const body = await req.json();
  const { prenom, nom, email, password, cguAccepted } = body ?? {};

  if (!prenom || !nom || !email || !password || !cguAccepted) {
    return NextResponse.json(
      { error: "Champs manquants" },
      { status: 400 }
    );
  }

  const res = await fetch(`${STRAPI}/api/auth/local/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prenom, nom, email, password, cguAccepted }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { error: data?.error?.message ?? "Erreur d'inscription" },
      { status: res.status }
    );
  }

  // On ne renvoie au client que les champs utiles (jamais l'objet Strapi brut)
  const user = {
    id: data.user?.id,
    prenom: data.user?.prenom,
    nom: data.user?.nom,
    email: data.user?.email,
    confirmed: data.user?.confirmed,
  };

  // Si la confirmation email est activée côté Strapi, il n'y a pas de jwt :
  // le compte doit d'abord être confirmé via le lien reçu par email.
  if (!data.jwt) {
    return NextResponse.json({ user, loggedIn: false });
  }

  await setAuthCookie(data.jwt);
  return NextResponse.json({ user, loggedIn: true });
}
