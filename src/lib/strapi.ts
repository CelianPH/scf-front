import qs from "qs";
import type {
  AboutPageResponse,
  AdoptionPageResponse,
  ArticleResponse,
  ArticlesResponse,
  ChatResponse,
  ChatsResponse,
  DonPageResponse,
  HomePageResponse,
  SiteSettingsResponse,
  TagsResponse,
} from "@/types/strapi";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

const DEFAULT_REVALIDATE = 3600;

export const CACHE_TAGS = {
  home: "home-page",
  about: "about-page",
  don: "don-page",
  adoption: "adoption-page",
  settings: "site-settings",
  chats: "chats",
  articles: "articles",
  tags: "tags",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

export function getStrapiURL(path = "") {
  return `${STRAPI_URL}${path}`;
}

export function getStrapiMedia(url: string | null | undefined) {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${STRAPI_URL}${url}`;
}

interface FetchOptions {
  tags: CacheTag[];
  revalidate?: number;
}

async function fetchAPI<T>(
  path: string,
  params: Record<string, unknown>,
  { tags, revalidate = DEFAULT_REVALIDATE }: FetchOptions
): Promise<T> {
  const queryString = qs.stringify(params, { encodeValuesOnly: true });
  const url = getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`);

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (STRAPI_TOKEN) headers.Authorization = `Bearer ${STRAPI_TOKEN}`;

  const response = await fetch(url, {
    headers,
    next: { tags, revalidate },
  });

  if (!response.ok) {
    throw new Error(
      `Erreur Strapi ${response.status} ${response.statusText} sur ${path}`
    );
  }

  return response.json();
}

// ---------- populate presets ----------

const mediaFields = ["url", "alternativeText", "width", "height", "mime", "name", "formats"];

const ctaPopulate = { populate: "*" } as const;

const seoPopulate = {
  populate: {
    ogImage: { fields: mediaFields },
  },
};

const chatPopulate = {
  populate: {
    image: { fields: mediaFields },
  },
};

const articlePopulate = {
  populate: {
    image: { fields: mediaFields },
    tags: { fields: ["nom", "slug"] },
  },
};

// ---------- Home page ----------

export async function getHomePage(): Promise<HomePageResponse> {
  const params = {
    populate: {
      hero: {
        populate: {
          image: { fields: mediaFields },
          ctaPrimary: ctaPopulate,
          ctaSecondary: ctaPopulate,
        },
      },
      statsBlock: {
        populate: { stats: true },
      },
      chatsBlock: {
        populate: {
          chats: chatPopulate,
          ctaSeeAll: ctaPopulate,
        },
      },
      quiSommesNous: {
        populate: {
          image: { fields: mediaFields },
          cta: ctaPopulate,
        },
      },
      distributionBandeau: {
        populate: {
          infos: true,
          ctaLink: ctaPopulate,
        },
      },
      gesteCompte: {
        populate: {
          actions: {
            populate: { cta: ctaPopulate },
          },
        },
      },
      actualitesBlock: {
        populate: {
          articles: articlePopulate,
          ctaSeeAll: ctaPopulate,
        },
      },
      ctaFinal: {
        populate: {
          ctaPrimary: ctaPopulate,
          ctaSecondary: ctaPopulate,
          chatFeatured: chatPopulate,
        },
      },
      seo: seoPopulate,
    },
  };

  return fetchAPI<HomePageResponse>("/home-page", params, {
    tags: [CACHE_TAGS.home],
  });
}

// ---------- About page ----------

export async function getAboutPage(): Promise<AboutPageResponse> {
  const params = {
    populate: {
      hero: {
        populate: { image: { fields: mediaFields } },
      },
      missions: {
        populate: {
          signature: {
            populate: {
              infos: true,
              image: { fields: mediaFields },
            },
          },
          autres: {
            populate: { cta: ctaPopulate },
          },
        },
      },
      histoire: {
        populate: { jalons: true },
      },
      valeurs: {
        populate: { valeurs: true },
      },
      felinsOmbre: {
        populate: {
          image: { fields: mediaFields },
          ctaHelloAsso: ctaPopulate,
        },
      },
      statsBand: {
        populate: { stats: true },
      },
      temoignages: {
        populate: {
          items: {
            populate: { photo: { fields: mediaFields } },
          },
        },
      },
      ctaFinal: {
        populate: {
          ctaPrimary: ctaPopulate,
          ctaSecondary: ctaPopulate,
        },
      },
      seo: seoPopulate,
    },
  };

  return fetchAPI<AboutPageResponse>("/about-page", params, {
    tags: [CACHE_TAGS.about],
  });
}

// ---------- Don page ----------

export async function getDonPage(): Promise<DonPageResponse> {
  const params = {
    populate: {
      hero: {
        populate: {
          ctaPrimary: ctaPopulate,
          ctaSecondary: ctaPopulate,
        },
      },
      reassurance: {
        populate: {
          items: { populate: "*" },
        },
      },
      widget: {
        populate: {
          montants: true,
          ctaSubmit: ctaPopulate,
        },
      },
      utilite: {
        populate: { items: true },
      },
      campagnes: {
        populate: {
          campagnes: {
            populate: {
              ctaDetails: ctaPopulate,
              ctaContribuer: ctaPopulate,
            },
          },
        },
      },
      autresActions: {
        populate: {
          actions: {
            populate: { cta: ctaPopulate },
          },
        },
      },
      seo: seoPopulate,
    },
  };

  return fetchAPI<DonPageResponse>("/don-page", params, {
    tags: [CACHE_TAGS.don],
  });
}

// ---------- Adoption page ----------

export async function getAdoptionPage(): Promise<AdoptionPageResponse> {
  const params = {
    populate: {
      hero: true,
      matchingCta: {
        populate: { cta: ctaPopulate },
      },
      seo: seoPopulate,
    },
  };

  return fetchAPI<AdoptionPageResponse>("/adoption-page", params, {
    tags: [CACHE_TAGS.adoption],
  });
}

// ---------- Site settings ----------

export async function getSiteSettings(): Promise<SiteSettingsResponse> {
  const params = {
    populate: {
      navLinks: true,
      navCta: ctaPopulate,
      footerHelloAssoCta: ctaPopulate,
      footerLinks: true,
      legalLinks: true,
      contact: true,
      socials: true,
      defaultSeo: seoPopulate,
    },
  };

  return fetchAPI<SiteSettingsResponse>("/site-settings", params, {
    tags: [CACHE_TAGS.settings],
  });
}

// ---------- Chats ----------

export async function getChats(opts: {
  featured?: boolean;
  includeAdopted?: boolean;
  pageSize?: number;
} = {}): Promise<ChatsResponse> {
  const filters: Record<string, unknown> = {};
  if (opts.featured) filters.featured = { $eq: true };
  if (!opts.includeAdopted) filters.adopted = { $eq: false };

  const params = {
    filters,
    populate: { image: { fields: mediaFields } },
    pagination: { pageSize: opts.pageSize ?? 25 },
    sort: ["createdAt:desc"],
  };

  return fetchAPI<ChatsResponse>("/chats", params, {
    tags: [CACHE_TAGS.chats],
  });
}

export async function getChatBySlug(slug: string): Promise<ChatResponse | null> {
  const params = {
    filters: { slug: { $eq: slug } },
    populate: {
      image: { fields: mediaFields },
      gallery: { fields: mediaFields },
      infos: true,
      referent: {
        fields: ["nom", "slug", "role", "bio"],
        populate: { photo: { fields: mediaFields } },
      },
    },
  };

  const res = await fetchAPI<ChatsResponse>("/chats", params, {
    tags: [CACHE_TAGS.chats],
  });
  if (!res.data[0]) return null;
  return { data: res.data[0], meta: {} };
}

// ---------- Articles ----------

export async function getArticles(opts: {
  pageSize?: number;
  page?: number;
  search?: string;
  tagSlug?: string;
} = {}): Promise<ArticlesResponse> {
  const filters: Record<string, unknown> = {};
  const search = opts.search?.trim();
  if (search) {
    filters.$or = [
      { titre: { $containsi: search } },
      { resume: { $containsi: search } },
      { contenu: { $containsi: search } },
    ];
  }
  if (opts.tagSlug) {
    filters.tags = { slug: { $eq: opts.tagSlug } };
  }

  const params = {
    populate: {
      image: { fields: mediaFields },
      tags: { fields: ["nom", "slug"] },
    },
    pagination: {
      page: opts.page ?? 1,
      pageSize: opts.pageSize ?? 12,
    },
    sort: ["date:desc"],
    ...(Object.keys(filters).length > 0 ? { filters } : {}),
  };

  return fetchAPI<ArticlesResponse>("/articles", params, {
    tags: [CACHE_TAGS.articles],
  });
}

export async function getArticleBySlug(slug: string): Promise<ArticleResponse> {
  const params = {
    filters: { slug: { $eq: slug } },
    populate: {
      image: { fields: mediaFields },
      tags: { fields: ["nom", "slug"] },
      seo: seoPopulate,
    },
  };

  const res = await fetchAPI<ArticlesResponse>("/articles", params, {
    tags: [CACHE_TAGS.articles],
  });
  if (!res.data[0]) {
    throw new Error(`Article introuvable: ${slug}`);
  }
  return { data: res.data[0], meta: {} };
}

// ---------- Tags ----------

export async function getTags(): Promise<TagsResponse> {
  const params = {
    fields: ["nom", "slug"],
    sort: ["nom:asc"],
    pagination: { pageSize: 100 },
  };

  return fetchAPI<TagsResponse>("/tags", params, {
    tags: [CACHE_TAGS.tags],
  });
}
