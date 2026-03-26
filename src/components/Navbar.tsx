"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/85 backdrop-blur-xl shadow-[0_1px_24px_rgba(214,24,110,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="px-5 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span
            className={`font-display text-lg font-semibold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-text" : "text-white"
            }`}
          >
            {siteConfig.shortName}
          </span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-10 h-10 flex flex-col items-center justify-center gap-[6px]"
          aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={isOpen}
        >
          <span
            className={`block w-6 h-[2px] rounded-full transition-all duration-300 origin-center ${
              scrolled || isOpen ? "bg-text" : "bg-white"
            } ${isOpen ? "rotate-45 translate-y-[8px]" : ""}`}
          />
          <span
            className={`block w-6 h-[2px] rounded-full transition-all duration-300 ${
              scrolled || isOpen ? "bg-text" : "bg-white"
            } ${isOpen ? "opacity-0 scale-x-0" : ""}`}
          />
          <span
            className={`block w-6 h-[2px] rounded-full transition-all duration-300 origin-center ${
              scrolled || isOpen ? "bg-text" : "bg-white"
            } ${isOpen ? "-rotate-45 -translate-y-[8px]" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-6 bg-surface/95 backdrop-blur-xl border-t border-border-light">
          <div className="flex flex-col gap-1 pt-3">
            {siteConfig.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-3 px-4 text-text-secondary font-medium rounded-xl transition-all duration-200 hover:bg-primary-50 hover:text-primary active:scale-[0.98]"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#rejoindre"
              className="mt-2 py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl text-center transition-all duration-200 active:scale-[0.98]"
              onClick={() => setIsOpen(false)}
            >
              Nous rejoindre
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
