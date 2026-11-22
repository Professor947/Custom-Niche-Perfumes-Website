import { content } from "@/content";
import { Container, Eyebrow, SectionTitle } from "../ui";
import { Reveal } from "../Reveal";

export function Faq() {
  const f = content.faq;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: f.items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 sm:py-28">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <Eyebrow>{f.eyebrow}</Eyebrow>
          <SectionTitle id="faq-title">{f.title}</SectionTitle>
        </Reveal>
        <div className="border-t border-ink">
          {f.items.map((item) => (
            <details key={item.q} className="group border-b border-line">
              <summary className="block cursor-pointer list-none py-5 font-serif text-xl font-medium [&::-webkit-details-marker]:hidden">
                <span className="flex min-h-8 items-center justify-between gap-6">
                  {item.q}
                  <span aria-hidden="true" className="text-2xl leading-none text-gold transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </span>
              </summary>
              <p className="pb-6 leading-relaxed text-stone">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </section>
  );
}
