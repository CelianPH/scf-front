interface ActualitesHrefParams {
  page?: number | null;
  q?: string | null;
  tag?: string | null;
}

export function buildActualitesHref(params: ActualitesHrefParams = {}): string {
  const sp = new URLSearchParams();
  if (params.page && params.page > 1) sp.set("page", String(params.page));
  if (params.q) sp.set("q", params.q);
  if (params.tag) sp.set("tag", params.tag);
  const qs = sp.toString();
  return qs ? `/actualites?${qs}` : "/actualites";
}
