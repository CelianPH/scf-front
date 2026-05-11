export const dateLongFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Paris",
});

// Parse a Strapi date-only string ("YYYY-MM-DD") as local midnight to avoid
// the UTC-shift that displays the previous day in positive timezones.
export function formatArticleDate(isoDate: string): string {
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(isoDate);
  const date = new Date(dateOnly ? `${isoDate}T00:00:00` : isoDate);
  return dateLongFormatter.format(date);
}
