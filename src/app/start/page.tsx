import type { Metadata } from "next";
import { Suspense } from "react";
import { content } from "@/content";
import { Container, Eyebrow } from "@/components/ui";
import { EnquiryForm } from "@/components/form/EnquiryForm";

export const metadata: Metadata = {
  title: content.form.pageTitle,
  description: content.form.pageIntro,
  alternates: { canonical: "/start" },
};

export default function StartPage() {
  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-2xl">
        <Eyebrow>{content.form.pageTitle}</Eyebrow>
        <p className="mb-10 max-w-xl leading-relaxed text-stone">{content.form.pageIntro}</p>
        <Suspense fallback={<div className="h-96" aria-hidden="true" />}>
          <EnquiryForm />
        </Suspense>
      </Container>
    </section>
  );
}
