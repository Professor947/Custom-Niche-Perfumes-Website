/**
 * Business settings — the ONE place to replace the brief's placeholders.
 *
 * Each value can be set via an environment variable (see .env.example) or by
 * editing the fallback string here. NEXT_PUBLIC_* values are safe to expose to
 * the browser; never put secrets in them.
 */

function num(value: string | undefined, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) && value !== undefined && value !== "" ? n : fallback;
}

export const site = {
  /** [BRAND_NAME] */
  brandName: process.env.NEXT_PUBLIC_BRAND_NAME || "Atelier Noor",
  /** [CITY] */
  city: process.env.NEXT_PUBLIC_CITY || "Lahore",
  country: "Pakistan",
  /** Public contact email shown in the footer. [OWNER_EMAIL] is set server-side via OWNER_EMAIL. */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "hello@example.com",
  /** [WHATSAPP_NUMBER] — +92 format, e.g. +923001234567 */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "+923000000000",
  /** [CALENDLY_URL] */
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/your-handle/consultation",
  /** [MIN_LEAD_TIME_WEEKS] */
  minLeadTimeWeeks: num(process.env.NEXT_PUBLIC_MIN_LEAD_TIME_WEEKS, 6),
  /** [MIN_ORDER_QTY] — 0 means no minimum */
  minOrderQty: num(process.env.NEXT_PUBLIC_MIN_ORDER_QTY, 0),
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/your-handle",
  instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "@your-handle",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;

/** wa.me wants digits only, no plus sign. */
export function whatsappLink(message?: string): string {
  const digits = site.whatsappNumber.replace(/\D/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${digits}${text}`;
}
