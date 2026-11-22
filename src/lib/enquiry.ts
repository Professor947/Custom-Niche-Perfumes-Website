/**
 * Enquiry schema — shared by the client form (per-step validation) and the API
 * route (full server-side validation).
 *
 * The base shape is intentionally permissive (just types) and every rule lives
 * in one superRefine, so issues are always reported with exact field paths no
 * matter which other fields are still empty. Each step validates by filtering
 * those issues to its own fields.
 */
import { z } from "zod";
import { content, site } from "@/content";

const E = content.form.errors;

export const PURPOSES = ["individual", "event", "corporate"] as const;
export type Purpose = (typeof PURPOSES)[number];

export function isPurpose(v: unknown): v is Purpose {
  return typeof v === "string" && (PURPOSES as readonly string[]).includes(v);
}

const str = z.string().default("");
const strArr = z.array(z.string()).default([]);

export const enquiryBaseSchema = z.object({
  // Step 1
  fullName: str,
  about: str,
  city: str,
  heardFrom: str,
  // Step 2
  purpose: str,
  brandName: str,
  audience: str,
  launchPlan: str,
  eventType: str,
  eventTypeOther: str,
  eventDate: str,
  guestCount: str,
  companyName: str,
  corporateUse: str,
  corporateUseOther: str,
  recipientCount: str,
  // Step 3
  knowsNotes: z.boolean().default(true),
  likedNotes: strArr,
  specificNotes: str,
  dislikedNotes: str,
  usesReferences: z.boolean().default(false),
  references: z.array(z.object({ name: str, liked: str })).default([]),
  intensity: str,
  wearTimes: strArr,
  avoidIngredients: str,
  // Step 4
  bottles: z.array(z.object({ size: str, customSize: str, quantity: str })).default([]),
  packaging: strArr,
  // Step 5
  requiredBy: str,
  flexibility: str,
  // Step 6
  email: str,
  phone: str,
  contactMethod: str,
  consent: z.boolean().default(false),
  // Spam honeypot — must stay empty
  website: str,
});

export type EnquiryValues = z.infer<typeof enquiryBaseSchema>;

export const defaultValues: EnquiryValues = enquiryBaseSchema.parse({
  bottles: [{ size: "50", customSize: "", quantity: "1" }],
  references: [{ name: "", liked: "" }],
});

/* ---------------- helpers ---------------- */

const PHONE_RE = /^(?:\+92|92|0)(3\d{9})$/;
export function normalisePkPhone(input: string): string | null {
  const cleaned = input.replace(/[\s\-().]/g, "");
  const m = cleaned.match(PHONE_RE);
  return m ? `+92${m[1]}` : null;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function todayISO(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function isISODate(v: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(v) && !Number.isNaN(Date.parse(v));
}

export function weeksFromToday(dateISO: string): number {
  const ms = Date.parse(dateISO) - Date.parse(todayISO());
  return ms / (7 * 24 * 60 * 60 * 1000);
}

export function isRushed(dateISO: string): boolean {
  return isISODate(dateISO) && weeksFromToday(dateISO) < site.minLeadTimeWeeks;
}

const isWholeNumber = (v: string) => /^\d+$/.test(v.trim());

export function totalBottles(bottles: EnquiryValues["bottles"]): number {
  return bottles.reduce((sum, b) => sum + (isWholeNumber(b.quantity) ? Number(b.quantity) : 0), 0);
}

const allowed = <T extends { value: string }>(opts: readonly T[]) => opts.map((o) => o.value);
const F = content.form;

/* ---------------- rules ---------------- */

export const enquirySchema = enquiryBaseSchema.superRefine((v, ctx) => {
  const add = (path: (string | number)[], message: string) =>
    ctx.addIssue({ code: "custom", path, message });
  const req = (key: keyof EnquiryValues, message: string = E.required) => {
    if (!String(v[key] ?? "").trim()) add([key], message);
  };
  const maxLen = (key: keyof EnquiryValues, n: number) => {
    if (String(v[key] ?? "").length > n) add([key], E.tooLong);
  };
  const oneOf = (key: keyof EnquiryValues, values: string[], message: string = E.required) => {
    if (!values.includes(String(v[key] ?? ""))) add([key], message);
  };

  // Step 1
  if (v.fullName.trim().length < 2) add(["fullName"], E.fullName);
  maxLen("fullName", 120);
  const aboutLen = v.about.trim().length;
  if (aboutLen < 20) add(["about"], E.aboutMin);
  else if (aboutLen > 600) add(["about"], E.aboutMax);
  req("city");
  maxLen("city", 80);
  if (v.heardFrom && !allowed(F.step1.heardFromOptions).includes(v.heardFrom)) add(["heardFrom"], E.required);

  // Step 2
  if (!isPurpose(v.purpose)) add(["purpose"], E.purpose);
  if (v.purpose === "individual") {
    maxLen("brandName", 120);
    req("audience");
    maxLen("audience", 1000);
    oneOf("launchPlan", allowed(F.step2.launchPlanOptions));
  }
  if (v.purpose === "event") {
    oneOf("eventType", allowed(F.step2.eventTypeOptions));
    if (v.eventType === "other") req("eventTypeOther");
    maxLen("eventTypeOther", 300);
    if (!isISODate(v.eventDate)) add(["eventDate"], E.date);
    if (!isWholeNumber(v.guestCount)) add(["guestCount"], E.number);
  }
  if (v.purpose === "corporate") {
    req("companyName");
    maxLen("companyName", 160);
    oneOf("corporateUse", allowed(F.step2.corporateUseOptions));
    if (v.corporateUse === "other") req("corporateUseOther");
    if (!isWholeNumber(v.recipientCount)) add(["recipientCount"], E.number);
  }

  // Step 3
  const filledRefs = v.usesReferences ? v.references.filter((r) => r.name.trim() || r.liked.trim()) : [];
  const hasNotes = v.knowsNotes && (v.likedNotes.length > 0 || v.specificNotes.trim().length > 0);
  if (!hasNotes && filledRefs.length === 0) add(["notesPath"], F.step3.pathRequired);
  if (v.usesReferences) {
    if (v.references.length > 5) add(["references"], E.tooLong);
    v.references.forEach((r, i) => {
      if (r.liked.trim() && !r.name.trim()) add(["references", i, "name"], E.referenceName);
      if (r.name.trim() && !r.liked.trim()) add(["references", i, "liked"], E.referenceLiked);
    });
  }
  maxLen("specificNotes", 600);
  maxLen("dislikedNotes", 600);
  maxLen("avoidIngredients", 600);
  oneOf("intensity", allowed(F.step3.intensityOptions));
  if (v.wearTimes.length === 0) add(["wearTimes"], E.atLeastOne);

  // Step 4
  const sizes = allowed(F.step4.sizeOptions);
  if (v.bottles.length === 0) add(["bottlesTotal"], E.required);
  v.bottles.forEach((b, i) => {
    if (!sizes.includes(b.size)) add(["bottles", i, "size"], E.required);
    if (b.size === "custom" && !b.customSize.trim()) add(["bottles", i, "customSize"], E.required);
    if (!isWholeNumber(b.quantity) || Number(b.quantity) < 1) add(["bottles", i, "quantity"], E.quantity);
  });
  if (site.minOrderQty > 0 && totalBottles(v.bottles) < site.minOrderQty) {
    add(["bottlesTotal"], F.step4.minOrder(site.minOrderQty));
  }
  if (v.packaging.length === 0) add(["packaging"], E.atLeastOne);

  // Step 5
  if (!isISODate(v.requiredBy)) add(["requiredBy"], E.date);
  else if (v.requiredBy < todayISO()) add(["requiredBy"], E.pastDate);
  oneOf("flexibility", allowed(F.step5.flexibilityOptions));

  // Step 6
  if (!EMAIL_RE.test(v.email.trim())) add(["email"], E.email);
  if (!normalisePkPhone(v.phone)) add(["phone"], E.phone);
  oneOf("contactMethod", allowed(F.step6.contactMethodOptions));
  if (v.consent !== true) add(["consent"], E.consent);
});

/** Which top-level keys belong to which step (0-based). Virtual keys included. */
export const STEP_FIELDS: string[][] = [
  ["fullName", "about", "city", "heardFrom"],
  ["purpose", "brandName", "audience", "launchPlan", "eventType", "eventTypeOther", "eventDate", "guestCount", "companyName", "corporateUse", "corporateUseOther", "recipientCount"],
  ["notesPath", "knowsNotes", "likedNotes", "specificNotes", "dislikedNotes", "usesReferences", "references", "intensity", "wearTimes", "avoidIngredients"],
  ["bottles", "bottlesTotal", "packaging"],
  ["requiredBy", "flexibility"],
  ["email", "phone", "contactMethod", "consent"],
  [],
];

export type StepIssue = { path: string; message: string };

/** Validate one step; returns issues with dotted paths (e.g. "bottles.0.quantity"). */
export function validateStep(values: EnquiryValues, step: number): StepIssue[] {
  const res = enquirySchema.safeParse(values);
  if (res.success) return [];
  const keys = new Set(STEP_FIELDS[step]);
  return res.error.issues
    .filter((i) => keys.has(String(i.path[0])))
    .map((i) => ({ path: i.path.join("."), message: i.message }));
}

/** Clean, server-ready payload: drop fields that don't apply to the chosen purpose/path. */
export function toSubmission(v: EnquiryValues) {
  const clean = { ...v, phone: normalisePkPhone(v.phone) ?? v.phone, email: v.email.trim() };
  if (!v.knowsNotes) Object.assign(clean, { likedNotes: [], specificNotes: "", dislikedNotes: "" });
  clean.references = v.usesReferences ? v.references.filter((r) => r.name.trim()) : [];
  if (v.purpose !== "individual") Object.assign(clean, { brandName: "", audience: "", launchPlan: "" });
  if (v.purpose !== "event") Object.assign(clean, { eventType: "", eventTypeOther: "", eventDate: "", guestCount: "" });
  if (v.purpose !== "corporate")
    Object.assign(clean, { companyName: "", corporateUse: "", corporateUseOther: "", recipientCount: "" });
  clean.bottles = v.bottles.map((b) => ({ ...b, customSize: b.size === "custom" ? b.customSize : "" }));
  return clean;
}

export type Submission = ReturnType<typeof toSubmission>;
