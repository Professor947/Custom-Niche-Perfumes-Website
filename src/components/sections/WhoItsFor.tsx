import Link from "next/link";
import { content } from "@/content";
import { Container, Eyebrow, SectionTitle } from "../ui";
import { Reveal } from "../Reveal";

const icons: Record<string, React.ReactNode> = {
  individual: <path d="M12 3v3m0 0c-3 0-5 2-5 5v8a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-8c0-3-2-5-5-5Zm-3 9h6" />,
  event: <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10Z" />,
  corporate: <path d="M4 8h16v11H4zM9 8V5h6v3M4 13h16" />,
};

export function WhoItsFor() {
  const w = content.whoItsFor;
  return (
    <section id="who-its-for" aria-labelledby="who-title" className="bg-ink py-20 text-ivory sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow light>{w.eyebrow}</Eyebrow>
          <SectionTitle id="who-title" light>
            {w.title}
          </SectionTitle>
        </Reveal>
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {w.cards.map((c, i) => (
            <Reveal as="li" key={c.purpose} delay={i * 100}>
              <Link
                href={`/start?purpose=${c.purpose}`}
                className="group flex h-full flex-col border border-ivory/15 p-7 transition-colors duration-300 hover:border-gold-light hover:bg-ink-soft"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-8 w-8 text-gold-light" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                  {icons[c.purpose]}
                </svg>
                <h3 className="mt-6 font-serif text-3xl font-medium text-ivory">{c.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-ivory/75">{c.body}</p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm tracking-[0.08em] text-gold-light uppercase">
                  {c.cta}
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
