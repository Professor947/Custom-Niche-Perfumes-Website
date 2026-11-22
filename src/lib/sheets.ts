import type { Submission } from "./enquiry";
import { purposeShort } from "./summary";

/** Optional: append a flat row to a Google Sheet via an Apps Script web-app URL. Silent no-op if unset. */
export async function appendToSheet(s: Submission): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) return;
  const row = {
    submittedAt: new Date().toISOString(),
    name: s.fullName,
    email: s.email,
    phone: s.phone,
    contactMethod: s.contactMethod,
    city: s.city,
    heardFrom: s.heardFrom,
    purpose: purposeShort(s),
    requiredBy: s.requiredBy,
    flexibility: s.flexibility,
    totalBottles: s.bottles.reduce((n, b) => n + (Number(b.quantity) || 0), 0),
    bottles: s.bottles.map((b) => `${b.quantity}x${b.size === "custom" ? b.customSize : b.size + "ml"}`).join(", "),
    packaging: s.packaging.join(", "),
    intensity: s.intensity,
    notes: s.likedNotes.join(", "),
    references: s.references.map((r) => r.name).join(", "),
    about: s.about,
    json: JSON.stringify(s),
  };
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(row),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.warn(`[sheets] webhook responded ${res.status}`);
  } catch (e) {
    console.warn("[sheets] webhook failed:", e);
  }
}
