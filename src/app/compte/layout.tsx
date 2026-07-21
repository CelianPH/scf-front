import type { ReactNode } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { requireUser } from "@/lib/auth";
import { ROLE_MEMBRE } from "@/types/strapi";

export default async function CompteLayout({ children }: { children: ReactNode }) {
  const hdrs = await headers();
  const path = hdrs.get("x-invoke-path") ?? hdrs.get("next-url") ?? "/compte";
  const user = await requireUser(`/connexion?next=${encodeURIComponent(path)}`);

  // Un membre de l'association n'a pas d'espace adoptant : on l'envoie
  // directement sur son espace de travail.
  if (user.role?.type === ROLE_MEMBRE) redirect("/espace-membre");

  return (
    <>
      <Navbar />
      <main className="bg-bg">{children}</main>
      <Footer />
    </>
  );
}
