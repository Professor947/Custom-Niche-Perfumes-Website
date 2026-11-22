import { content } from "@/content";
import { Container, Eyebrow, SectionTitle } from "../ui";
import { Reveal } from "../Reveal";

export function HowItWorks() {
  const h = content.howItWorks;
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{h.eyebrow}</Eyebrow>
          <SectionTitle id="how-title">{h.title}</SectionTitle>
        </Reveal>
        <ol className="relative mt-14 grid gap-10 md:grid-cols-5 md:gap-6">
          <span aria-hidden="true" className="absolute top-0 bottom-0 left-5 w-px bg-line md:top-5 md:right-0 md:bottom-auto md:left-0 md:h-px md:w-full" />
          {h.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 90} className="relative pl-16 md:pl-0 md:pt-16">
              <span className="absolute top-0 left-0 flex h-10 w-10 items-center justify-center rounded-full border border-gold bg-ivory font-serif text-lg text-gold-deep">
                {i + 1}
              </span>
              <h3 className="font-serif text-2xl font-medium">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-stone">{s.body}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <p className="mt-14 inline-block border-y border-line py-3 text-sm tracking-wide text-ink">
            {h.leadTime}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
