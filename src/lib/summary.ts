/**
 * Turns form values into labelled, human-readable sections.
 * Used by the Review step and by both email templates, so they always match.
 */
import { content } from "@/content";
import { normalisePkPhone, totalBottles, type EnquiryValues } from "./enquiry";

const F = content.form;

type Opt = { value: string; label: string };
const label = (opts: readonly Opt[], v: string) => opts.find((o) => o.value === v)?.label ?? v;
const labels = (opts: readonly Opt[], vs: string[]) => vs.map((v) => label(opts, v)).join(", ");

export type SummaryRow = { label: string; value: string };
export type SummarySection = { key: string; title: string; step: number; rows: SummaryRow[] };

export function purposeLabel(v: string): string {
  return label(F.step2.purposes, v);
}

/** Short form for subjects and Calendly ("Event — Wedding — Mehndi"). */
export function purposeShort(v: EnquiryValues): string {
  if (v.purpose === "individual") return "Own brand";
  if (v.purpose === "event")
    return v.eventType === "other" && v.eventTypeOther
      ? `Event — ${v.eventTypeOther}`
      : `Event — ${label(F.step2.eventTypeOptions, v.eventType)}`;
  if (v.purpose === "corporate") return `Corporate — ${v.companyName}`;
  return v.purpose;
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function buildSummary(v: EnquiryValues): SummarySection[] {
  const S = F.step7.sections;
  const purposeRows: SummaryRow[] = [{ label: F.step2.purposeLegend, value: purposeLabel(v.purpose) }];
  if (v.purpose === "individual") {
    purposeRows.push(
      { label: F.step2.brandName, value: v.brandName },
      { label: F.step2.audience, value: v.audience },
      { label: F.step2.launchPlan, value: label(F.step2.launchPlanOptions, v.launchPlan) },
    );
  } else if (v.purpose === "event") {
    purposeRows.push(
      { label: F.step2.eventType, value: label(F.step2.eventTypeOptions, v.eventType) },
      ...(v.eventType === "other" ? [{ label: F.step2.eventTypeOther, value: v.eventTypeOther }] : []),
      { label: F.step2.eventDate, value: formatDate(v.eventDate) },
      { label: F.step2.guestCount, value: v.guestCount },
    );
  } else if (v.purpose === "corporate") {
    purposeRows.push(
      { label: F.step2.companyName, value: v.companyName },
      { label: F.step2.corporateUse, value: label(F.step2.corporateUseOptions, v.corporateUse) },
      ...(v.corporateUse === "other" ? [{ label: F.step2.corporateUseOther, value: v.corporateUseOther }] : []),
      { label: F.step2.recipientCount, value: v.recipientCount },
    );
  }

  const notesRows: SummaryRow[] = [];
  if (v.knowsNotes) {
    notesRows.push(
      { label: F.step7.labels.notes, value: v.likedNotes.join(", ") },
      { label: F.step3.specificNotes, value: v.specificNotes },
      { label: F.step3.dislikedNotes, value: v.dislikedNotes },
    );
  }
  if (v.usesReferences) {
    const refs = v.references.filter((r) => r.name.trim());
    notesRows.push({
      label: F.step7.labels.references,
      value: refs.map((r) => `${r.name} — ${r.liked}`).join("\n"),
    });
  }
  notesRows.push(
    { label: F.step3.intensity, value: label(F.step3.intensityOptions, v.intensity) },
    { label: F.step3.wearTimes, value: labels(F.step3.wearTimeOptions, v.wearTimes) },
    { label: F.step3.avoid, value: v.avoidIngredients },
  );

  const bottleLines = v.bottles.map((b) => {
    const size = b.size === "custom" ? b.customSize || "Custom" : label(F.step4.sizeOptions, b.size);
    return `${b.quantity} × ${size}`;
  });

  return [
    {
      key: "about",
      title: S.about,
      step: 0,
      rows: [
        { label: F.step1.fullName, value: v.fullName },
        { label: F.step1.about, value: v.about },
        { label: F.step1.city, value: v.city },
        { label: F.step1.heardFrom, value: label(F.step1.heardFromOptions, v.heardFrom) },
      ],
    },
    { key: "purpose", title: S.purpose, step: 1, rows: purposeRows },
    { key: "notes", title: S.notes, step: 2, rows: notesRows },
    {
      key: "quantity",
      title: S.quantity,
      step: 3,
      rows: [
        { label: F.step4.bottlesLegend, value: `${bottleLines.join("\n")}\n${F.step4.total(totalBottles(v.bottles))}` },
        { label: F.step4.packagingLegend, value: labels(F.step4.packagingOptions, v.packaging) },
      ],
    },
    {
      key: "timeline",
      title: S.timeline,
      step: 4,
      rows: [
        { label: F.step5.requiredBy, value: formatDate(v.requiredBy) },
        { label: F.step5.flexibility, value: label(F.step5.flexibilityOptions, v.flexibility) },
      ],
    },
    {
      key: "contact",
      title: S.contact,
      step: 5,
      rows: [
        { label: F.step6.email, value: v.email },
        { label: F.step6.phone, value: normalisePkPhone(v.phone) ?? v.phone },
        { label: F.step6.contactMethod, value: label(F.step6.contactMethodOptions, v.contactMethod) },
      ],
    },
  ];
}
