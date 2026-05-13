"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { getStrapiMedia } from "@/lib/strapi";
import type { StrapiMedia } from "@/types/strapi";

interface ChatGalleryProps {
  main: StrapiMedia;
  gallery: StrapiMedia[] | null;
  catName: string;
}

export default function ChatGallery({ main, gallery, catName }: ChatGalleryProps) {
  const photos = [main, ...(gallery ?? [])].filter(Boolean);
  const [activeIdx, setActiveIdx] = useState(0);
  const active = photos[activeIdx] ?? main;
  const activeUrl = getStrapiMedia(active?.url);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-primary-50 via-bg-alt to-secondary-50 ring-1 ring-border">
        {activeUrl ? (
          <Image
            src={activeUrl}
            alt={
              active?.alternativeText ??
              `${catName}, photo ${activeIdx + 1} sur ${photos.length}`
            }
            fill
            sizes="(min-width:1024px) 60vw, 100vw"
            className="object-cover transition-opacity duration-200"
            priority={activeIdx === 0}
            key={active.url}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-primary/40">
            <ImageOff className="h-16 w-16" aria-hidden="true" />
          </div>
        )}
      </div>

      {photos.length > 1 ? (
        <ul
          className="grid grid-cols-4 gap-3 sm:gap-4"
          role="tablist"
          aria-label="Galerie de photos"
        >
          {photos.map((p, i) => {
            const url = getStrapiMedia(p.url);
            const isActive = i === activeIdx;
            return (
              <li key={p.url ?? i}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Voir la photo ${i + 1}`}
                  onClick={() => setActiveIdx(i)}
                  className={`relative aspect-square w-full overflow-hidden rounded-xl ring-2 transition duration-200 ${
                    isActive
                      ? "ring-primary"
                      : "ring-transparent hover:ring-primary/40"
                  }`}
                >
                  {url ? (
                    <Image
                      src={url}
                      alt={p.alternativeText ?? ""}
                      fill
                      sizes="(min-width:640px) 15vw, 25vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-bg-alt text-primary/40">
                      <ImageOff className="h-5 w-5" aria-hidden="true" />
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
