import type { ReactNode } from "react";
import { headers } from "next/headers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { requireUser } from "@/lib/auth";

export default async function CompteLayout({ children }: { children: ReactNode }) {
  const hdrs = await headers();
  const path = hdrs.get("x-invoke-path") ?? hdrs.get("next-url") ?? "/compte";
  await requireUser(`/connexion?next=${encodeURIComponent(path)}`);

  return (
    <>
      <Navbar />
      <main className="bg-bg">{children}</main>
      <Footer />
    </>
  );
}
