import { NextResponse } from "next/server";

const STRAPI = process.env.STRAPI_INTERNAL_URL ?? "http://localhost:1337";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email requis" }, { status: 400 });

  // Strapi répond toujours 200 même si l'email n'existe pas (anti-énumération)
  await fetch(`${STRAPI}/api/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  return NextResponse.json({ ok: true });
}
