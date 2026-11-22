import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "light" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-ivory hover:bg-ink-soft",
  secondary: "border border-ink/80 text-ink hover:bg-ink hover:text-ivory",
  light: "bg-ivory text-ink hover:bg-sand",
  ghost: "text-ink underline decoration-gold underline-offset-4 hover:decoration-2",
};

export const buttonClass = (variant: Variant = "primary", extra = "") =>
  `inline-flex min-h-12 items-center justify-center gap-2 px-6 text-sm font-medium tracking-[0.08em] uppercase transition-colors duration-300 ${variants[variant]} ${extra}`;

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`mb-4 text-xs font-medium tracking-[0.25em] uppercase ${light ? "text-gold-light" : "text-gold-deep"}`}
    >
      {children}
    </p>
  );
}

export function SectionTitle({ children, id, light = false }: { children: ReactNode; id?: string; light?: boolean }) {
  return (
    <h2
      id={id}
      className={`font-serif text-4xl leading-[1.1] font-medium text-balance sm:text-5xl ${light ? "text-ivory" : "text-ink"}`}
    >
      {children}
    </h2>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 12" className={`h-3 w-28 text-gold ${className}`}>
      <path d="M0 6h50M70 6h50" stroke="currentColor" strokeWidth="0.75" />
      <path d="M60 1l5 5-5 5-5-5z" fill="none" stroke="currentColor" strokeWidth="0.75" />
    </svg>
  );
}
