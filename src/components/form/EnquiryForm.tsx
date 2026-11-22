"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FormProvider, useForm, type FieldPath } from "react-hook-form";
import { content, whatsappLink } from "@/content";
import { defaultValues, isPurpose, STEP_FIELDS, validateStep, type EnquiryValues } from "@/lib/enquiry";
import { purposeShort } from "@/lib/summary";
import { buttonClass } from "../ui";
import { fieldId } from "./fields";
import { Progress } from "./Progress";
import { StepAbout, StepContact, StepHeading, StepNotes, StepPurpose, StepQuantity, StepReview, StepTimeline } from "./steps";
import { Success, type SuccessInfo } from "./Success";

const F = content.form;
const STORAGE_KEY = "bespoke-brief-draft-v1";
const TOTAL = F.stepTitles.length;
const REVIEW = TOTAL - 1;

type Draft = { values: Partial<EnquiryValues>; step: number };

function loadDraft(): Draft | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Draft;
    return parsed && typeof parsed === "object" && parsed.values ? parsed : null;
  } catch {
    return null;
  }
}
function saveDraft(d: Draft) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
  } catch {
    /* storage full or blocked — the form still works, just without persistence */
  }
}
function clearDraft() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

type Status = "idle" | "submitting" | "error";

export function EnquiryForm() {
  const params = useSearchParams();
  const methods = useForm<EnquiryValues>({ defaultValues, shouldUnregister: false });
  const { getValues, setValue, setError, clearErrors, reset, watch, handleSubmit } = methods;

  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const [attempted, setAttempted] = useState<Set<number>>(() => new Set());
  const [prefilledDate, setPrefilledDate] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [success, setSuccess] = useState<SuccessInfo | null>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef(step);
  stepRef.current = step;

  /* Restore draft + apply ?purpose= on first load. */
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      reset({ ...defaultValues, ...draft.values, website: "" });
      setStep(Math.min(Math.max(0, draft.step | 0), REVIEW));
    }
    const p = params.get("purpose");
    if (isPurpose(p)) setValue("purpose", p);
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Persist on every change. */
  useEffect(() => {
    if (!ready || success) return;
    saveDraft({ values: getValues(), step });
    const sub = watch((values) => saveDraft({ values: values as Partial<EnquiryValues>, step: stepRef.current }));
    return () => sub.unsubscribe();
  }, [ready, step, success, watch, getValues]);

  /** Validate a step and push issues into RHF errors. Returns true when valid. */
  const applyStep = useCallback(
    (s: number): boolean => {
      const issues = validateStep(getValues(), s);
      clearErrors(STEP_FIELDS[s] as FieldPath<EnquiryValues>[]);
      for (const i of issues) setError(i.path as FieldPath<EnquiryValues>, { type: "custom", message: i.message });
      return issues.length === 0;
    },
    [getValues, clearErrors, setError],
  );

  /* After a failed attempt, re-validate live so errors clear as the user fixes them. */
  useEffect(() => {
    if (!attempted.has(step)) return;
    const sub = watch(() => applyStep(step));
    return () => sub.unsubscribe();
  }, [attempted, step, watch, applyStep]);

  const focusFirstError = (s: number) => {
    const issues = validateStep(getValues(), s);
    const first = issues[0];
    if (!first) return;
    requestAnimationFrame(() => {
      const el =
        document.getElementById(fieldId(first.path)) ??
        document.querySelector<HTMLElement>(`[name="${first.path}"]`) ??
        document.getElementById(fieldId(first.path.split(".")[0]));
      el?.focus({ preventScroll: true });
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  };

  const goTo = (next: number) => {
    // Prefill "required by" from the event date when arriving at the timeline step.
    if (next === 4) {
      const v = getValues();
      if (!v.requiredBy && v.purpose === "event" && v.eventDate) {
        setValue("requiredBy", v.eventDate);
        setPrefilledDate(true);
      }
    }
    setStep(next);
    setStatus((s) => (s === "error" ? "idle" : s));
    requestAnimationFrame(() => {
      headingRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
      headingRef.current?.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
    });
  };

  const onNext = () => {
    if (applyStep(step)) {
      goTo(step + 1);
    } else {
      setAttempted((a) => new Set(a).add(step));
      focusFirstError(step);
    }
  };

  const onBack = () => step > 0 && goTo(step - 1);

  const submit = async (values: EnquiryValues) => {
    // Re-check every step in case something was edited after review.
    for (let s = 0; s < REVIEW; s++) {
      if (!applyStep(s)) {
        setAttempted((a) => new Set(a).add(s));
        goTo(s);
        setTimeout(() => focusFirstError(s), 50);
        return;
      }
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      clearDraft();
      setSuccess({
        name: values.fullName.trim(),
        email: values.email.trim(),
        purpose: purposeShort(values),
        requiredBy: values.requiredBy,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("error");
    }
  };

  if (success) return <Success info={success} />;

  const steps = [
    <StepAbout key="about" />,
    <StepPurpose key="purpose" />,
    <StepNotes key="notes" />,
    <StepQuantity key="qty" />,
    <StepTimeline key="time" prefilled={prefilledDate} />,
    <StepContact key="contact" />,
    <StepReview key="review" onEdit={goTo} />,
  ];

  const stepTitles = [F.step1.title, F.step2.title, F.step3.title, F.step4.title, F.step5.title, F.step6.title, F.step7.title];

  return (
    <FormProvider {...methods}>
      <div ref={headingRef} className="scroll-mt-24">
        <Progress current={step} />
      </div>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (step < REVIEW) onNext();
          else void handleSubmit(submit)(e);
        }}
        aria-labelledby="step-heading"
        className={`mt-10 transition-opacity ${ready ? "opacity-100" : "opacity-0"}`}
      >
        {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Website
            <input type="text" tabIndex={-1} autoComplete="off" {...methods.register("website")} />
          </label>
        </div>

        <div className="mb-8">
          <StepHeading id="step-heading">{stepTitles[step]}</StepHeading>
          {attempted.has(step) && Object.keys(methods.formState.errors).length > 0 && (
            <p className="mt-3 text-sm text-error">{F.errorSummary}</p>
          )}
        </div>

        {steps[step]}

        {status === "error" && (
          <div role="alert" className="mt-8 border border-error/40 bg-error/5 p-5">
            <p className="text-ink">{F.step7.submitError}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button type="submit" className={buttonClass("primary")}>
                {F.step7.retry}
              </button>
              <a className={buttonClass("secondary")} href={whatsappLink(content.whatsapp.defaultMessage)} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </div>
          </div>
        )}

        <div className="mt-12 flex items-center justify-between gap-3 border-t border-line pt-6 pr-16 sm:pr-0">
          {step > 0 ? (
            <button type="button" onClick={onBack} className={buttonClass("secondary", "min-w-28")}>
              ← {F.back}
            </button>
          ) : (
            <span />
          )}
          {step < REVIEW ? (
            <button type="submit" className={buttonClass("primary", "min-w-36")}>
              {F.next} →
            </button>
          ) : (
            status !== "error" && (
              <button type="submit" disabled={status === "submitting"} aria-busy={status === "submitting"} className={buttonClass("primary", "min-w-36 disabled:opacity-60")}>
                {status === "submitting" ? F.submitting : F.submit}
              </button>
            )
          )}
        </div>
      </form>
    </FormProvider>
  );
}
