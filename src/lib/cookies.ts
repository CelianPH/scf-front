import { cookies } from "next/headers";

export const AUTH_COOKIE_NAME = "scf-token";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 jours

export async function setAuthCookie(token: string) {
  const store = await cookies();
  store.set(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function clearAuthCookie() {
  const store = await cookies();
  store.delete(AUTH_COOKIE_NAME);
}

export async function getAuthToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(AUTH_COOKIE_NAME)?.value ?? null;
}
