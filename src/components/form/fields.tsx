"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { content } from "@/content";

const inputBase =
  "block w-full min-h-12 border bg-paper px-4 py-3 text-base text-ink placeholder:text-stone/70 transition-colors focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-gold-deep aria-[invalid=true]:border-error";

export const fieldId = (name: string) => `f-${name.replace(/\./g, "-")}`;
export const errorId = (name: string) => `${fieldId(name)}-error`;
const hintId = (name: string) => `${fieldId(name)}-hint`;

export function describedBy(name: string, hasHint: boolean, hasError: boolean) {
  return [hasHint ? hintId(name) : null, hasError ? errorId(name) : null].filter(Boolean).join(" ") || undefined;
}

export function ErrorText({ name, message }: { name: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={errorId(name)} className="mt-2 flex items-start gap-2 text-sm text-error" role="alert">
      <span aria-hidden="true">●</span>
      {message}
    </p>
  );
}

export function Field({
  name,
  label,
  hint,
  error,
  optional,
  children,
}: {
  name: string;
  label: ReactNode;
  hint?: ReactNode;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={fieldId(name)} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {optional && <span className="ml-2 font-normal text-stone">({content.form.optional})</span>}
      </label>
      {children}
      {hint && (
        <p id={hintId(name)} className="mt-2 text-sm text-stone">
          {hint}
        </p>
      )}
      <ErrorText name={name} message={error} />
    </div>
  );
}

type Common = { name: string; error?: string; hasHint?: boolean };

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & Common>(
  function TextInput({ name, error, hasHint = false, className = "", ...rest }, ref) {
    return (
      <input
        ref={ref}
        id={fieldId(name)}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, hasHint, !!error)}
        className={`${inputBase} ${error ? "border-error" : "border-line"} ${className}`}
        {...rest}
      />
    );
  },
);

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & Common>(
  function TextArea({ name, error, hasHint = false, className = "", ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        id={fieldId(name)}
        name={name}
        rows={4}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, hasHint, !!error)}
        className={`${inputBase} ${error ? "border-error" : "border-line"} resize-y leading-relaxed ${className}`}
        {...rest}
      />
    );
  },
);

export const Select = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & Common & { options: readonly { value: string; label: string }[]; placeholder?: string }
>(function Select({ name, error, hasHint = false, options, placeholder, className = "", ...rest }, ref) {
  return (
    <div className="relative">
      <select
        ref={ref}
        id={fieldId(name)}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, hasHint, !!error)}
        className={`${inputBase} ${error ? "border-error" : "border-line"} appearance-none pr-10 ${className}`}
        {...rest}
      >
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span aria-hidden="true" className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-stone">
        ▾
      </span>
    </div>
  );
});

/** Fieldset wrapper for radio/checkbox groups. */
export function Group({
  name,
  legend,
  error,
  hint,
  optional,
  children,
}: {
  name: string;
  legend: ReactNode;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <fieldset id={fieldId(name)} aria-describedby={error ? errorId(name) : undefined} tabIndex={-1} className="focus:outline-none">
      <legend className="mb-3 text-sm font-medium text-ink">
        {legend}
        {optional && <span className="ml-2 font-normal text-stone">({content.form.optional})</span>}
      </legend>
      {hint && <p className="-mt-1 mb-3 text-sm text-stone">{hint}</p>}
      {children}
      <ErrorText name={name} message={error} />
    </fieldset>
  );
}

/** Styled checkbox/radio "chip" — real input underneath for a11y and keyboard use. */
export const Choice = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { label: ReactNode; hint?: ReactNode; variant?: "chip" | "card" }
>(function Choice({ label, hint, variant = "chip", className = "", ...rest }, ref) {
  const box =
    variant === "card"
      ? "flex min-h-16 w-full flex-col justify-center border px-5 py-4 text-left"
      : "inline-flex min-h-11 items-center border px-4 py-2 text-sm";
  return (
    <label className={`group relative cursor-pointer ${variant === "card" ? "block" : "inline-block"} ${className}`}>
      <input ref={ref} className="peer sr-only" {...rest} />
      <span
        className={`${box} border-line bg-paper text-ink transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-ivory peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-deep hover:border-ink`}
      >
        <span className={variant === "card" ? "font-medium" : ""}>{label}</span>
        {hint && <span className="mt-1 text-sm opacity-75">{hint}</span>}
      </span>
    </label>
  );
});

export const Checkbox = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { label: ReactNode; error?: string }>(
  function Checkbox({ label, error, name = "", ...rest }, ref) {
    return (
      <div>
        <label className="flex min-h-12 cursor-pointer items-start gap-3 py-2">
          <input
            ref={ref}
            type="checkbox"
            id={fieldId(name)}
            name={name}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errorId(name) : undefined}
            className="mt-0.5 h-6 w-6 shrink-0 cursor-pointer accent-ink"
            {...rest}
          />
          <span className="text-base leading-relaxed">{label}</span>
        </label>
        <ErrorText name={name} message={error} />
      </div>
    );
  },
);
