import { NextResponse } from "next/server";
import { setAuthCookie } from "@/lib/cookies";

const STRAPI = process.env.STRAPI_INTERNAL_URL ?? "http://localhost:1337";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 });
  }

  const res = await fetch(`${STRAPI}/api/auth/local`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier: email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    return NextResponse.json(
      { error: data?.error?.message ?? "Identifiants invalides" },
      { status: 401 }
    );
  }

  await setAuthCookie(data.jwt);
  return NextResponse.json({ user: data.user });
}
