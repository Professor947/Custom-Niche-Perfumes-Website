import { content } from "@/content";
import { Container, Eyebrow, SectionTitle } from "../ui";
import { Reveal } from "../Reveal";

export function Notes() {
  const n = content.notes;
  return (
    <section id="notes" aria-labelledby="notes-title" className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <Eyebrow>{n.eyebrow}</Eyebrow>
            <SectionTitle id="notes-title">{n.title}</SectionTitle>
            <p className="mt-6 text-lg leading-relaxed text-stone">{n.intro}</p>
          </Reveal>
          <ol className="space-y-0 border-t border-ink">
            {n.pyramid.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 90} className="grid gap-1 border-b border-line py-6 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <div>
                  <h3 className="font-serif text-2xl font-medium">{p.name}</h3>
                  <p className="text-xs tracking-[0.15em] text-gold-deep uppercase">{p.timing}</p>
                </div>
                <p className="leading-relaxed text-stone">{p.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal>
          <h3 className="mt-20 mb-6 text-xs font-medium tracking-[0.25em] text-stone uppercase">{n.familiesTitle}</h3>
        </Reveal>
        <ul className="grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
          {content.families.map((f) => (
            <li key={f.value} className="bg-ivory p-5 sm:p-6">
              <p className="font-serif text-2xl font-medium">{f.name}</p>
              <p className="mt-1 text-sm text-stone">{f.body}</p>
              <p className="mt-3 text-xs leading-relaxed text-gold-deep">{f.notes.slice(0, 3).join(" · ")}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
