import { NextResponse } from "next/server";
import { setAuthCookie } from "@/lib/cookies";

const STRAPI = process.env.STRAPI_INTERNAL_URL ?? "http://localhost:1337";

export async function POST(req: Request) {
  const { code, password, passwordConfirmation } = await req.json();
  if (!code || !password || password !== passwordConfirmation) {
    return NextResponse.json({ error: "Champs invalides" }, { status: 400 });
  }

  const res = await fetch(`${STRAPI}/api/auth/reset-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, password, passwordConfirmation }),
  });
  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json(
      { error: data?.error?.message ?? "Lien expiré ou invalide" },
      { status: 400 }
    );
  }

  await setAuthCookie(data.jwt);
  return NextResponse.json({ user: data.user });
}
