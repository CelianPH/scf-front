import { NextResponse } from "next/server";
import { getAuthToken } from "@/lib/cookies";

const STRAPI = process.env.STRAPI_INTERNAL_URL ?? "http://localhost:1337";

export async function POST(req: Request) {
  const token = await getAuthToken();
  if (!token) return NextResponse.json({ error: "Auth requise" }, { status: 401 });

  const { chatSlug } = await req.json();
  const res = await fetch(`${STRAPI}/api/auth-favoris/toggle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ chatSlug }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function GET() {
  const token = await getAuthToken();
  if (!token) return NextResponse.json({ data: [] });

  const res = await fetch(`${STRAPI}/api/auth-favoris/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const data = await res.json();
  return NextResponse.json(data);
}
