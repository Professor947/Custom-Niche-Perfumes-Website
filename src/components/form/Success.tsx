"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { content, whatsappLink } from "@/content";
import { buttonClass, Ornament } from "../ui";
import { calendlyUrl, type CalendlyPrefill } from "@/lib/calendly";

const S = content.form.success;

export type SuccessInfo = CalendlyPrefill;

declare global {
  interface Window {
    Calendly?: { initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void };
  }
}

export function Success({ info }: { info: SuccessInfo }) {
  const ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const url = calendlyUrl(info);

  const init = () => {
    if (ref.current && window.Calendly && !ref.current.childElementCount) {
      window.Calendly.initInlineWidget({ url, parentElement: ref.current });
    }
  };

  useEffect(() => {
    headingRef.current?.focus();
    init(); // script may already be loaded from an earlier visit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Ornament />
      <h2 ref={headingRef} tabIndex={-1} className="mt-6 font-serif text-4xl leading-tight font-medium focus:outline-none sm:text-5xl">
        {S.title(info.name.split(" ")[0] || info.name)}
      </h2>
      <p className="mt-4 max-w-xl text-lg leading-relaxed text-stone">{S.body}</p>

      <h3 className="mt-12 mb-4 text-xs font-medium tracking-[0.25em] text-gold-deep uppercase">{S.calendlyTitle}</h3>
      <div ref={ref} className="min-h-[700px] w-full border border-line bg-paper" aria-label={S.calendlyTitle} />
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="afterInteractive" onReady={init} />

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a href={url} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
          {S.calendlyFallback} ↗
        </a>
        <a href={whatsappLink(content.whatsapp.defaultMessage)} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary")}>
          {S.whatsapp}
        </a>
      </div>
      <Link href="/" className="mt-8 inline-block text-sm text-stone underline underline-offset-4 hover:text-ink">
        {S.backHome}
      </Link>
    </div>
  );
}
