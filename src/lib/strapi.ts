import qs from "qs";
import type { PageAccueilResponse } from "@/types/strapi";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export function getStrapiURL(path = "") {
  return `${STRAPI_URL}${path}`;
}

export function getStrapiMedia(url: string | null | undefined) {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${STRAPI_URL}${url}`;
}

async function fetchAPI<T>(
  path: string,
  urlParamsObject: Record<string, unknown> = {}
): Promise<T> {
  const queryString = qs.stringify(urlParamsObject, {
    encodeValuesOnly: true,
  });

  const requestUrl = getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  );

  const response = await fetch(requestUrl, {
    next: { revalidate: 60 },
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Erreur Strapi: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getPageAccueil(): Promise<PageAccueilResponse> {
  const query = {
    populate: {
      Hero_image: {
        fields: ["url", "alternativeText", "width", "height"],
      },
      Missions: true,
      Chiffres: {
        populate: {
          Image: {
            fields: ["url", "alternativeText", "width", "height"],
          },
        },
      },
      Equipe: {
        populate: {
          Photo: {
            fields: ["url", "alternativeText", "width", "height"],
          },
        },
      },
      Partenaires: {
        populate: {
          Logo: {
            fields: ["url", "alternativeText", "width", "height"],
          },
        },
      },
    },
  };

  return fetchAPI<PageAccueilResponse>("/page-accueil", query);
}
