import { content } from "@/content";
import { ButtonLink, Container, Eyebrow, Ornament } from "../ui";

function BottleArt() {
  return (
    <svg aria-hidden="true" viewBox="0 0 240 320" className="h-full w-full text-ink">
      <defs>
        <linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d1ad6b" stopOpacity="0.35" />
          <stop offset="1" stopColor="#9a7432" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect x="98" y="30" width="44" height="34" rx="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="108" y="64" width="24" height="18" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M60 110c0-16 12-28 28-28h64c16 0 28 12 28 28v160c0 12-10 22-22 22H82c-12 0-22-10-22-22z" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M66 170h108v98c0 9-7 16-16 16H82c-9 0-16-7-16-16z" fill="url(#liquid)" />
      <path d="M84 120v40" stroke="currentColor" strokeOpacity="0.25" strokeWidth="6" strokeLinecap="round" />
      <rect x="90" y="200" width="60" height="44" fill="#fbf8f3" stroke="currentColor" strokeWidth="0.8" />
      <path d="M102 222h36" stroke="#9a7432" strokeWidth="0.8" />
      <circle cx="120" cy="212" r="2" fill="#9a7432" />
    </svg>
  );
}

export function Hero() {
  const h = content.hero;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <Container className="grid items-center gap-10 pt-14 pb-20 sm:pt-20 md:grid-cols-[1.3fr_1fr] md:pb-28">
        <div>
          <Eyebrow>{h.eyebrow}</Eyebrow>
          <h1
            id="hero-title"
            className="font-serif text-[2.9rem] leading-[1.02] font-medium text-balance sm:text-6xl lg:text-7xl"
          >
            {h.title}
          </h1>
          <Ornament className="my-7" />
          <p className="max-w-xl text-lg leading-relaxed text-stone">{h.subtitle}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/start">{h.primaryCta}</ButtonLink>
            <ButtonLink href="#how-it-works" variant="secondary">
              {h.secondaryCta}
            </ButtonLink>
          </div>
        </div>
        <div className="relative mx-auto hidden aspect-[3/4] w-full max-w-sm md:block">
          <div className="absolute inset-6 rounded-t-full bg-sand" />
          <div className="relative h-full p-10">
            <BottleArt />
          </div>
        </div>
      </Container>
    </section>
  );
}
