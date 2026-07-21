import { NextResponse } from "next/server";
import { setAuthCookie } from "@/lib/cookies";

const STRAPI = process.env.STRAPI_INTERNAL_URL ?? "http://localhost:1337";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 });
  }

  let res: Response;
  try {
    res = await fetch(`${STRAPI}/api/auth/local`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier: email, password }),
    });
  } catch {
    // Strapi injoignable : sans ce garde, l'exception remonte en 500 au corps
    // vide et le formulaire échoue sur un message incompréhensible.
    return NextResponse.json(
      { error: "Service d'authentification indisponible." },
      { status: 503 }
    );
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    return NextResponse.json(
      { error: data?.error?.message ?? "Identifiants invalides" },
      { status: 401 }
    );
  }

  if (!data?.jwt) {
    return NextResponse.json(
      { error: "Réponse inattendue du service d'authentification." },
      { status: 502 }
    );
  }

  await setAuthCookie(data.jwt);
  return NextResponse.json({ user: data.user });
}
