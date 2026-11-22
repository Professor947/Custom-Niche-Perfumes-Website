import Image from "next/image";
import { content } from "@/content";
import { Container, Eyebrow, SectionTitle } from "../ui";
import { Reveal } from "../Reveal";

export function Bottles() {
  const b = content.bottles;
  return (
    <section id="bottles" aria-labelledby="bottles-title" className="bg-sand/60 py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{b.eyebrow}</Eyebrow>
          <SectionTitle id="bottles-title">{b.title}</SectionTitle>
          <p className="mt-6 text-lg leading-relaxed text-stone">{b.intro}</p>
        </Reveal>
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {b.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={(i % 3) * 90}>
              <figure>
                <div className="relative aspect-[4/5] overflow-hidden bg-paper">
                  {/* REPLACE: swap the files in /public/placeholders with real photography (keep the names, or edit src in content/en.ts). */}
                  <Image src={item.src} alt="" fill unoptimized={item.src.endsWith(".svg")} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                  <span className="absolute top-3 left-3 bg-ivory/90 px-2 py-1 text-[0.65rem] tracking-[0.15em] text-stone uppercase">
                    {b.placeholderBadge}
                  </span>
                </div>
                <figcaption className="mt-4">
                  <p className="font-serif text-2xl font-medium">{item.title}</p>
                  <p className="mt-1 text-stone">{item.body}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
