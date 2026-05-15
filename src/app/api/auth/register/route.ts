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

  await setAuthCookie(data.jwt);
  return NextResponse.json({ user: data.user });
}
