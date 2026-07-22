"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Heart,
  LogOut,
  Menu,
  User as UserIcon,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuthState } from "@/lib/use-auth-state";
import { ROLE_MEMBRE } from "@/types/strapi";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/adoption", label: "Adopter" },
  { href: "/actualites", label: "Actualités" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement | null>(null);
  const { user } = useAuthState();
  // Un membre de l'association n'a pas d'espace adoptant : son prénom mène
  // directement à son espace de travail.
  const espaceUrl =
    user?.role?.type === ROLE_MEMBRE ? "/espace-membre" : "/compte";

  useEffect(() => {
    setOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Fermeture du menu compte au clic extérieur et à l'Échap.
  useEffect(() => {
    if (!accountOpen) return;
    function onPointerDown(e: MouseEvent) {
      if (!accountRef.current?.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setAccountOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [accountOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-50 flex w-full items-stretch overflow-visible border-b border-border bg-bg/90 backdrop-blur-md lg:relative">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 py-3.5 pl-4 lg:justify-start lg:py-5 lg:pl-8">
          <Link
            href="/"
            className="inline-flex items-center transition hover:opacity-80"
            aria-label="Sans Croquettes Fixes, accueil"
          >
            <Image
              src="/images/favicon.png"
              alt=""
              width={64}
              height={64}
              className="h-11 w-11 rounded-full lg:h-14 lg:w-14"
              priority
            />
          </Link>

          <nav
            aria-label="Navigation principale"
            className="hidden lg:absolute lg:left-1/2 lg:top-1/2 lg:block lg:-translate-x-1/2 lg:-translate-y-1/2"
          >
            <ul className="flex items-center gap-1">
              {links.map(({ href, label }) => {
                const active = isActive(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`relative inline-flex items-center px-3.5 py-2 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
                        active
                          ? "text-primary"
                          : "text-text-secondary hover:text-text"
                      }`}
                    >
                      {label}
                      {active && (
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-0.5 left-3.5 right-3.5 h-0.5 rounded-full bg-primary"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Ouvrir le menu"
            className="mr-4 inline-flex h-10 w-10 items-center justify-center rounded-md text-text transition hover:bg-primary-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 hidden items-stretch lg:flex">
          <div className="flex items-center gap-6 pr-6">
            {user ? (
              <div className="relative" ref={accountRef}>
                <button
                  type="button"
                  onClick={() => setAccountOpen((v) => !v)}
                  aria-expanded={accountOpen}
                  aria-haspopup="menu"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition hover:text-text"
                >
                  <UserIcon className="h-4 w-4" aria-hidden="true" />
                  {user.prenom}
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${accountOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>

                {accountOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-md border border-border bg-surface py-1 text-sm shadow-lg"
                  >
                    <Link
                      href={espaceUrl}
                      role="menuitem"
                      onClick={() => setAccountOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 font-medium text-text transition hover:bg-primary-50 hover:text-primary"
                    >
                      <UserIcon className="h-4 w-4" aria-hidden="true" />
                      Mon espace
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
                        role="menuitem"
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-left font-medium text-text transition hover:bg-primary-50 hover:text-primary"
                      >
                        <LogOut className="h-4 w-4" aria-hidden="true" />
                        Se déconnecter
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/connexion"
                className="text-sm font-medium text-text-secondary transition hover:text-text"
              >
                Se connecter
              </Link>
            )}

            <span aria-hidden="true" className="w-px self-stretch bg-border" />
          </div>

          <Link
            href="/don"
            className="-mb-5 inline-flex shrink-0 flex-col items-center justify-center gap-1.5 bg-secondary px-6 text-base font-bold uppercase tracking-widest text-white shadow-lg shadow-secondary/30 transition hover:bg-secondary-dark"
          >
            Donation
            <Heart className="h-6 w-6" aria-hidden="true" />
          </Link>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" id="mobile-nav" role="dialog" aria-modal="true" aria-label="Menu principal">
          <button
            type="button"
            aria-label="Fermer le menu"
            className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-full max-w-sm flex-col bg-bg shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <Image
                src="/images/favicon.png"
                alt="Sans Croquettes Fixes"
                width={40}
                height={40}
                className="h-9 w-9 rounded-full"
              />
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
