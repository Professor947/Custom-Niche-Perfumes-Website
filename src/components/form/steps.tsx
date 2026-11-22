"use client";

import { get, useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { content, site } from "@/content";
import { isRushed, todayISO, totalBottles, type EnquiryValues } from "@/lib/enquiry";
import { buildSummary } from "@/lib/summary";
import { Checkbox, Choice, ErrorText, Field, Group, Select, TextArea, TextInput } from "./fields";

const F = content.form;

function useErr() {
  const {
    formState: { errors },
  } = useFormContext<EnquiryValues>();
  return (path: string): string | undefined => (get(errors, path) as { message?: string } | undefined)?.message;
}

export function StepHeading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <h2 id={id} tabIndex={-1} className="font-serif text-3xl leading-tight font-medium focus:outline-none sm:text-4xl">
      {children}
    </h2>
  );
}

const stack = "space-y-7";

/* ---------------- Step 1 ---------------- */
export function StepAbout() {
  const { register, control } = useFormContext<EnquiryValues>();
  const err = useErr();
  const about = useWatch({ control, name: "about" }) ?? "";
  const s = F.step1;
  return (
    <div className={stack}>
      <Field name="fullName" label={s.fullName} error={err("fullName")}>
        <TextInput autoComplete="name" error={err("fullName")} {...register("fullName")} />
      </Field>
      <Field name="about" label={s.about} hint={s.aboutHint(about.trim().length)} error={err("about")}>
        <TextArea rows={5} maxLength={600} placeholder={s.aboutPlaceholder} hasHint error={err("about")} {...register("about")} />
      </Field>
      <Field name="city" label={s.city} error={err("city")}>
        <TextInput autoComplete="address-level2" error={err("city")} {...register("city")} />
      </Field>
      <Field name="heardFrom" label={s.heardFrom} optional error={err("heardFrom")}>
        <Select options={s.heardFromOptions} placeholder={s.heardFromPlaceholder} error={err("heardFrom")} {...register("heardFrom")} />
      </Field>
    </div>
  );
}

/* ---------------- Step 2 ---------------- */
export function StepPurpose() {
  const { register, control } = useFormContext<EnquiryValues>();
  const err = useErr();
  const [purpose, eventType, corporateUse] = useWatch({ control, name: ["purpose", "eventType", "corporateUse"] });
  const s = F.step2;
  return (
    <div className={stack}>
      <Group name="purpose" legend={s.purposeLegend} error={err("purpose")}>
        <div className="grid gap-3">
          {s.purposes.map((p) => (
            <Choice key={p.value} type="radio" variant="card" value={p.value} label={p.label} hint={p.hint} {...register("purpose")} />
          ))}
        </div>
      </Group>

      {purpose === "individual" && (
        <div className={`${stack} border-l-2 border-gold pl-5`}>
          <Field name="brandName" label={s.brandName} optional error={err("brandName")}>
            <TextInput error={err("brandName")} {...register("brandName")} />
          </Field>
          <Field name="audience" label={s.audience} error={err("audience")}>
            <TextArea rows={3} placeholder={s.audiencePlaceholder} error={err("audience")} {...register("audience")} />
          </Field>
          <Field name="launchPlan" label={s.launchPlan} error={err("launchPlan")}>
            <Select options={s.launchPlanOptions} placeholder={s.selectPlaceholder} error={err("launchPlan")} {...register("launchPlan")} />
          </Field>
        </div>
      )}

      {purpose === "event" && (
        <div className={`${stack} border-l-2 border-gold pl-5`}>
          <Field name="eventType" label={s.eventType} error={err("eventType")}>
            <Select options={s.eventTypeOptions} placeholder={s.selectPlaceholder} error={err("eventType")} {...register("eventType")} />
          </Field>
          {eventType === "other" && (
            <Field name="eventTypeOther" label={s.eventTypeOther} error={err("eventTypeOther")}>
              <TextInput error={err("eventTypeOther")} {...register("eventTypeOther")} />
            </Field>
          )}
          <Field name="eventDate" label={s.eventDate} error={err("eventDate")}>
            <TextInput type="date" min={todayISO()} error={err("eventDate")} {...register("eventDate")} />
          </Field>
          <Field name="guestCount" label={s.guestCount} error={err("guestCount")}>
            <TextInput type="text" inputMode="numeric" pattern="[0-9]*" error={err("guestCount")} {...register("guestCount")} />
          </Field>
        </div>
      )}

      {purpose === "corporate" && (
        <div className={`${stack} border-l-2 border-gold pl-5`}>
          <Field name="companyName" label={s.companyName} error={err("companyName")}>
            <TextInput autoComplete="organization" error={err("companyName")} {...register("companyName")} />
          </Field>
          <Field name="corporateUse" label={s.corporateUse} error={err("corporateUse")}>
            <Select options={s.corporateUseOptions} placeholder={s.selectPlaceholder} error={err("corporateUse")} {...register("corporateUse")} />
          </Field>
          {corporateUse === "other" && (
            <Field name="corporateUseOther" label={s.corporateUseOther} error={err("corporateUseOther")}>
              <TextInput error={err("corporateUseOther")} {...register("corporateUseOther")} />
            </Field>
          )}
          <Field name="recipientCount" label={s.recipientCount} error={err("recipientCount")}>
            <TextInput type="text" inputMode="numeric" pattern="[0-9]*" error={err("recipientCount")} {...register("recipientCount")} />
          </Field>
        </div>
      )}
    </div>
  );
}

/* ---------------- Step 3 ---------------- */
export function StepNotes() {
  const { register, control } = useFormContext<EnquiryValues>();
  const err = useErr();
  const [knowsNotes, usesReferences] = useWatch({ control, name: ["knowsNotes", "usesReferences"] });
  const refs = useFieldArray({ control, name: "references" });
  const s = F.step3;

  return (
    <div className={stack}>
      <p className="text-stone">{s.intro}</p>
      <div id="f-notesPath" tabIndex={-1} className="grid gap-3 focus:outline-none sm:grid-cols-2">
        <Choice type="checkbox" variant="card" label={s.knowsNotesToggle} {...register("knowsNotes")} />
        <Choice type="checkbox" variant="card" label={s.referencesToggle} {...register("usesReferences")} />
      </div>
      <ErrorText name="notesPath" message={err("notesPath")} />

      {knowsNotes && (
        <div className={`${stack} border-l-2 border-gold pl-5`}>
          <Group name="likedNotes" legend={s.familiesLegend} error={err("likedNotes")}>
            <div className="space-y-5">
              {content.families.map((fam) => (
                <div key={fam.value}>
                  <p className="mb-2 text-xs font-medium tracking-[0.18em] text-gold-deep uppercase">{fam.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {fam.notes.map((note) => (
                      <Choice key={note} type="checkbox" value={note} label={note} {...register("likedNotes")} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Group>
          <Field name="specificNotes" label={s.specificNotes} optional error={err("specificNotes")}>
            <TextInput placeholder={s.specificNotesPlaceholder} error={err("specificNotes")} {...register("specificNotes")} />
          </Field>
          <Field name="dislikedNotes" label={s.dislikedNotes} optional error={err("dislikedNotes")}>
            <TextInput placeholder={s.dislikedNotesPlaceholder} error={err("dislikedNotes")} {...register("dislikedNotes")} />
          </Field>
        </div>
      )}

      {usesReferences && (
        <div className={`${stack} border-l-2 border-gold pl-5`}>
          <p className="font-serif text-lg font-medium text-ink italic">{s.referencesHelper}</p>
          {refs.fields.map((f, i) => (
            <fieldset key={f.id} className="space-y-4 border border-line bg-paper/60 p-4">
              <legend className="px-1 text-xs font-medium tracking-[0.18em] text-stone uppercase">{s.referenceLabel(i + 1)}</legend>
              <Field name={`references.${i}.name`} label={s.referenceName} error={err(`references.${i}.name`)}>
                <TextInput error={err(`references.${i}.name`)} {...register(`references.${i}.name`)} />
              </Field>
              <Field name={`references.${i}.liked`} label={s.referenceLiked} error={err(`references.${i}.liked`)}>
                <TextArea rows={2} placeholder={s.referenceLikedPlaceholder} error={err(`references.${i}.liked`)} {...register(`references.${i}.liked`)} />
              </Field>
              {refs.fields.length > 1 && (
                <button type="button" onClick={() => refs.remove(i)} className="min-h-11 text-sm text-stone underline underline-offset-4 hover:text-ink">
                  {s.removeReference}
                </button>
              )}
            </fieldset>
          ))}
          {refs.fields.length < 5 && (
            <button
              type="button"
              onClick={() => refs.append({ name: "", liked: "" })}
              className="min-h-12 border border-dashed border-ink/50 px-5 text-sm tracking-wide hover:border-ink"
            >
              + {s.addReference}
            </button>
          )}
        </div>
      )}

      <Group name="intensity" legend={s.intensity} error={err("intensity")}>
        <div className="grid grid-cols-3 gap-2">
          {s.intensityOptions.map((o) => (
            <Choice key={o.value} type="radio" variant="card" value={o.value} label={o.label} hint={o.hint} {...register("intensity")} />
          ))}
        </div>
      </Group>

      <Group name="wearTimes" legend={s.wearTimes} error={err("wearTimes")}>
        <div className="flex flex-wrap gap-2">
          {s.wearTimeOptions.map((o) => (
            <Choice key={o.value} type="checkbox" value={o.value} label={o.label} {...register("wearTimes")} />
          ))}
        </div>
      </Group>

      <Field name="avoidIngredients" label={s.avoid} optional error={err("avoidIngredients")}>
        <TextInput placeholder={s.avoidPlaceholder} error={err("avoidIngredients")} {...register("avoidIngredients")} />
      </Field>
    </div>
  );
}

/* ---------------- Step 4 ---------------- */
export function StepQuantity() {
  const { register, control } = useFormContext<EnquiryValues>();
  const err = useErr();
  const rows = useFieldArray({ control, name: "bottles" });
  const bottles = useWatch({ control, name: "bottles" }) ?? [];
  const total = totalBottles(bottles);
  const s = F.step4;
  const belowMin = site.minOrderQty > 0 && total < site.minOrderQty;

  return (
    <div className={stack}>
      <fieldset id="f-bottlesTotal" tabIndex={-1} className="space-y-4 focus:outline-none">
        <legend className="mb-3 text-sm font-medium">{s.bottlesLegend}</legend>
        {rows.fields.map((f, i) => (
          <div key={f.id} className="border border-line bg-paper/60 p-4">
            <p className="mb-3 text-xs font-medium tracking-[0.18em] text-stone uppercase">{s.rowLabel(i + 1)}</p>
            <div className="grid grid-cols-[1fr_7rem] gap-3">
              <Field name={`bottles.${i}.size`} label={s.size} error={err(`bottles.${i}.size`)}>
                <Select options={s.sizeOptions} error={err(`bottles.${i}.size`)} {...register(`bottles.${i}.size`)} />
              </Field>
              <Field name={`bottles.${i}.quantity`} label={s.quantity} error={err(`bottles.${i}.quantity`)}>
                <TextInput type="text" inputMode="numeric" pattern="[0-9]*" error={err(`bottles.${i}.quantity`)} {...register(`bottles.${i}.quantity`)} />
              </Field>
            </div>
            {bottles[i]?.size === "custom" && (
              <div className="mt-3">
                <Field name={`bottles.${i}.customSize`} label={s.customSize} error={err(`bottles.${i}.customSize`)}>
                  <TextInput placeholder={s.customSizePlaceholder} error={err(`bottles.${i}.customSize`)} {...register(`bottles.${i}.customSize`)} />
                </Field>
              </div>
            )}
            {rows.fields.length > 1 && (
              <button type="button" onClick={() => rows.remove(i)} className="mt-2 min-h-11 text-sm text-stone underline underline-offset-4 hover:text-ink">
                {s.removeRow}
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => rows.append({ size: "50", customSize: "", quantity: "1" })}
          className="min-h-12 border border-dashed border-ink/50 px-5 text-sm tracking-wide hover:border-ink"
        >
          + {s.addRow}
        </button>
        <p className="border-t border-line pt-4 font-serif text-2xl" aria-live="polite">
          {s.total(total)}
        </p>
        {belowMin && !err("bottlesTotal") && <p className="text-sm text-stone">{s.minOrder(site.minOrderQty)}</p>}
        <ErrorText name="bottlesTotal" message={err("bottlesTotal")} />
      </fieldset>

      <Group name="packaging" legend={s.packagingLegend} error={err("packaging")}>
        <div className="flex flex-wrap gap-2">
          {s.packagingOptions.map((o) => (
            <Choice key={o.value} type="checkbox" value={o.value} label={o.label} {...register("packaging")} />
          ))}
        </div>
      </Group>
    </div>
  );
}

/* ---------------- Step 5 ---------------- */
export function StepTimeline({ prefilled }: { prefilled: boolean }) {
  const { register, control } = useFormContext<EnquiryValues>();
  const err = useErr();
  const requiredBy = useWatch({ control, name: "requiredBy" });
  const s = F.step5;
  return (
    <div className={stack}>
      <Field name="requiredBy" label={s.requiredBy} hint={prefilled ? s.prefilledHint : undefined} error={err("requiredBy")}>
        <TextInput type="date" min={todayISO()} hasHint={prefilled} error={err("requiredBy")} {...register("requiredBy")} />
      </Field>
      {requiredBy && requiredBy >= todayISO() && isRushed(requiredBy) && (
        <p role="status" className="border-l-2 border-gold bg-sand/70 px-4 py-3 text-sm leading-relaxed text-ink">
          {s.rushWarning(site.minLeadTimeWeeks)}
        </p>
      )}
      <Group name="flexibility" legend={s.flexibility} error={err("flexibility")}>
        <div className="grid grid-cols-3 gap-2">
          {s.flexibilityOptions.map((o) => (
            <Choice key={o.value} type="radio" variant="card" value={o.value} label={o.label} className="text-center" {...register("flexibility")} />
          ))}
        </div>
      </Group>
    </div>
  );
}

/* ---------------- Step 6 ---------------- */
export function StepContact() {
  const { register } = useFormContext<EnquiryValues>();
  const err = useErr();
  const s = F.step6;
  return (
    <div className={stack}>
      <Field name="email" label={s.email} error={err("email")}>
        <TextInput type="email" autoComplete="email" inputMode="email" error={err("email")} {...register("email")} />
      </Field>
      <Field name="phone" label={s.phone} hint={s.phoneHint} error={err("phone")}>
        <TextInput type="tel" autoComplete="tel" inputMode="tel" hasHint error={err("phone")} {...register("phone")} />
      </Field>
      <Group name="contactMethod" legend={s.contactMethod} error={err("contactMethod")}>
        <div className="grid grid-cols-3 gap-2">
          {s.contactMethodOptions.map((o) => (
            <Choice key={o.value} type="radio" variant="card" value={o.value} label={o.label} className="text-center" {...register("contactMethod")} />
          ))}
        </div>
      </Group>
      <Checkbox label={s.consent} error={err("consent")} {...register("consent")} />
    </div>
  );
}

/* ---------------- Step 7 ---------------- */
export function StepReview({ onEdit }: { onEdit: (step: number) => void }) {
  const { control } = useFormContext<EnquiryValues>();
  const values = useWatch({ control }) as EnquiryValues;
  const s = F.step7;
  return (
    <div className="space-y-6">
      <p className="text-stone">{s.intro}</p>
      {buildSummary(values).map((sec) => (
        <section key={sec.key} aria-labelledby={`review-${sec.key}`} className="border border-line bg-paper/60">
          <div className="flex items-center justify-between border-b border-line px-5 py-3">
            <h3 id={`review-${sec.key}`} className="font-serif text-xl font-medium">
              {sec.title}
            </h3>
            <button
              type="button"
              onClick={() => onEdit(sec.step)}
              className="min-h-11 px-2 text-sm text-gold-deep underline underline-offset-4 hover:text-ink"
              aria-label={`${s.edit}: ${sec.title}`}
            >
              {s.edit}
            </button>
          </div>
          <dl className="divide-y divide-line/70">
            {sec.rows.map((r) => (
              <div key={r.label} className="grid gap-1 px-5 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4">
                <dt className="text-sm text-stone">{r.label}</dt>
                <dd className="break-words whitespace-pre-line">{r.value?.trim() ? r.value : s.empty}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
