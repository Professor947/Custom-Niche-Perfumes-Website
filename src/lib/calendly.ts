import { site } from "@/content";
import { formatDate } from "./summary";

export type CalendlyPrefill = { name: string; email: string; purpose: string; requiredBy: string };

/**
 * Calendly booking URL with prefill. `a1`/`a2` map to the event's 1st and 2nd
 * custom questions, in order (see README → "Calendly setup").
 */
export function calendlyUrl(p: CalendlyPrefill): string {
  const params: Record<string, string> = {
    name: p.name,
    email: p.email,
    a1: p.purpose,
    a2: formatDate(p.requiredBy) || p.requiredBy,
    hide_gdpr_banner: "1",
    background_color: "fbf8f3",
    text_color: "1c1915",
    primary_color: "7a5a22",
  };
  // encodeURIComponent (spaces → %20), not URLSearchParams (spaces → "+"), because
  // Calendly's embed re-encodes the query and would otherwise show literal "+" signs.
  const qs = Object.entries(params)
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join("&");
  return `${site.calendlyUrl}${site.calendlyUrl.includes("?") ? "&" : "?"}${qs}`;
}
