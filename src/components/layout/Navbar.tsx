"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, LogOut, Menu, PawPrint, User as UserIcon, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuthState } from "@/lib/use-auth-state";
import { ROLE_MEMBRE } from "@/types/strapi";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/adoption", label: "Adopter" },
  { href: "/conseils", label: "Conseils" },
  { href: "/actualites", label: "Actualités" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user } = useAuthState();
  // Un membre de l'association n'a pas d'espace adoptant : son prénom mène
  // directement à son espace de travail.
  const espaceUrl =
    user?.role?.type === ROLE_MEMBRE ? "/espace-membre" : "/compte";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-display text-base font-bold text-primary transition hover:text-primary-dark md:text-lg"
          aria-label="Sans Croquettes Fixes, accueil"
        >
          <PawPrint className="h-5 w-5" aria-hidden="true" />
          Sans Croquettes Fixes
        </Link>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map(({ href, label }) => {
              const active = isActive(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-flex items-center px-3 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
                      active
                        ? "text-primary"
                        : "text-text-secondary hover:text-text"
                    }`}
                  >
                    {label}
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full bg-primary"
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <>
              <Link
                href={espaceUrl}
                className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:text-text"
              >
                <UserIcon className="h-4 w-4" aria-hidden="true" />
                {user.prenom}
              </Link>
              <form
                action="/api/auth/logout"
                method="post"
                onSubmit={(e) => {
                  e.preventDefault();
                  fetch("/api/auth/logout", { method: "POST" }).then(() =>
                    window.location.reload()
                  );
                }}
              >
                <button
                  type="submit"
                  aria-label="Se déconnecter"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md text-text-secondary hover:bg-primary-50 hover:text-primary"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/connexion"
              className="rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:text-text"
            >
              Se connecter
            </Link>
          )}
          <Button href="/don" variant="secondary" size="sm" iconLeft={Heart}>
            Faire un don
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label="Ouvrir le menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-text transition hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:hidden"
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] md:hidden" id="mobile-nav" role="dialog" aria-modal="true" aria-label="Menu principal">
          <button
            type="button"
            aria-label="Fermer le menu"
            className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-full max-w-sm flex-col bg-bg shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <span className="inline-flex items-center gap-2 font-display text-base font-bold text-primary">
                <PawPrint className="h-5 w-5" aria-hidden="true" />
                Sans Croquettes Fixes
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-text transition hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Navigation mobile" className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="flex flex-col gap-1">
                {links.map(({ href, label }) => {
                  const active = isActive(href);
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between rounded-md px-4 py-3 text-base font-medium transition ${
                          active
                            ? "bg-primary-50 text-primary"
                            : "text-text hover:bg-primary-50/60"
                        }`}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="border-t border-border px-5 pt-4 pb-2">
              {user ? (
                <div className="flex items-center justify-between">
                  <Link
                    href={espaceUrl}
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:text-text"
                  >
                    <UserIcon className="h-4 w-4" aria-hidden="true" />
                    {user.prenom}
                  </Link>
                  <form
                    action="/api/auth/logout"
                    method="post"
                    onSubmit={(e) => {
                      e.preventDefault();
                      fetch("/api/auth/logout", { method: "POST" }).then(() =>
                        window.location.reload()
                      );
                    }}
                  >
                    <button
                      type="submit"
                      aria-label="Se déconnecter"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md text-text-secondary hover:bg-primary-50 hover:text-primary"
                    >
                      <LogOut className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </form>
                </div>
              ) : (
                <Link
                  href="/connexion"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:text-text"
                >
                  Se connecter
                </Link>
              )}
            </div>

            <div className="border-t border-border p-5">
              <Button href="/don" variant="secondary" size="md" iconLeft={Heart} fullWidth>
                Faire un don
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
