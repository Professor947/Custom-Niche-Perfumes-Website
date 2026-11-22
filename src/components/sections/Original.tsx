import { content } from "@/content";
import { Container, Eyebrow, SectionTitle } from "../ui";
import { Reveal } from "../Reveal";

export function Original() {
  const o = content.original;
  return (
    <section id="original" aria-labelledby="original-title" className="bg-paper py-20 sm:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{o.eyebrow}</Eyebrow>
          <SectionTitle id="original-title">{o.title}</SectionTitle>
          <p className="mt-6 text-lg leading-relaxed text-stone">{o.intro}</p>
        </Reveal>

        {/* Desktop: table */}
        <Reveal className="mt-14 hidden md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{o.tableCaption}</caption>
            <thead>
              <tr className="border-b border-ink">
                <th scope="col" className="w-1/4 py-4 pr-6">
                  <span className="sr-only">Aspect</span>
                </th>
                <th scope="col" className="w-[37.5%] py-4 pr-6 text-xs font-medium tracking-[0.2em] text-stone uppercase">
                  {o.replicaHeading}
                </th>
                <th scope="col" className="w-[37.5%] bg-ink px-6 py-4 text-xs font-medium tracking-[0.2em] text-gold-light uppercase">
                  {o.bespokeHeading}
                </th>
              </tr>
            </thead>
            <tbody>
              {o.rows.map((r) => (
                <tr key={r.label} className="border-b border-line">
                  <th scope="row" className="py-5 pr-6 font-serif text-xl font-medium">
                    {r.label}
                  </th>
                  <td className="py-5 pr-6 text-stone">{r.replica}</td>
                  <td className="bg-ink px-6 py-5 text-ivory">{r.bespoke}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Mobile: stacked cards */}
        <ul className="mt-12 space-y-4 md:hidden" aria-label={o.tableCaption}>
          {o.rows.map((r) => (
            <Reveal as="li" key={r.label} className="border border-line bg-ivory">
              <h3 className="border-b border-line px-5 py-3 font-serif text-xl font-medium">{r.label}</h3>
              <dl>
                <div className="px-5 py-4">
                  <dt className="text-[0.7rem] font-medium tracking-[0.2em] text-stone uppercase">{o.replicaHeading}</dt>
                  <dd className="mt-1 text-stone">{r.replica}</dd>
                </div>
                <div className="bg-ink px-5 py-4">
                  <dt className="text-[0.7rem] font-medium tracking-[0.2em] text-gold-light uppercase">{o.bespokeHeading}</dt>
                  <dd className="mt-1 text-ivory">{r.bespoke}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="mt-10 max-w-2xl border-l-2 border-gold pl-5 font-serif text-xl leading-snug font-medium text-ink italic">
            {o.referenceNote}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
