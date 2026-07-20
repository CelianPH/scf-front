import { NextResponse } from "next/server";
import { getAuthToken } from "@/lib/cookies";

const STRAPI = process.env.STRAPI_INTERNAL_URL ?? "http://localhost:1337";

export async function PUT(req: Request) {
  const token = await getAuthToken();
  if (!token) {
    return NextResponse.json({ error: "Auth requise" }, { status: 401 });
  }

  const body = await req.json();

  const res = await fetch(`${STRAPI}/api/benevoles/me/absence`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data: body }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
