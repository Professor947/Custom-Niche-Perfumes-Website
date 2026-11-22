import { content, whatsappLink } from "@/content";
import { ButtonLink, Container, Ornament } from "../ui";
import { Reveal } from "../Reveal";

export function FinalCta() {
  const c = content.finalCta;
  return (
    <section aria-labelledby="cta-title" className="border-t border-line bg-paper py-20 text-center sm:py-28">
      <Container>
        <Reveal className="mx-auto max-w-2xl">
          <Ornament className="mx-auto mb-8" />
          <h2 id="cta-title" className="font-serif text-4xl leading-tight font-medium text-balance sm:text-5xl">
            {c.title}
          </h2>
          <p className="mt-5 text-lg text-stone">{c.body}</p>
          <div className="mt-9 flex flex-col items-center gap-5">
            <ButtonLink href="/start">{c.cta}</ButtonLink>
            <a
              href={whatsappLink(content.whatsapp.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ink underline decoration-gold underline-offset-4 hover:decoration-2"
            >
              {c.whatsapp}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
