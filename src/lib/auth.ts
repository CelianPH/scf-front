import { redirect } from "next/navigation";
import { getAuthToken } from "./cookies";
import { ROLE_MEMBRE } from "@/types/strapi";
import type { AuthUser } from "@/types/strapi";

const STRAPI = process.env.STRAPI_INTERNAL_URL ?? "http://localhost:1337";

export async function getCurrentUser(): Promise<AuthUser | null> {
  const token = await getAuthToken();
  if (!token) return null;

  const res = await fetch(`${STRAPI}/api/users/me?populate[role]=true`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export async function requireUser(redirectTo = "/connexion"): Promise<AuthUser> {
  const user = await getCurrentUser();
  if (!user) redirect(redirectTo);
  return user;
}

export async function requireBenevole(): Promise<AuthUser> {
  const user = await requireUser();
  if (user.role?.type !== ROLE_MEMBRE) redirect("/compte");
  return user;
}
