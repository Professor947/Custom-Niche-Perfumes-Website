import Link from "next/link";
import { content, site, whatsappLink } from "@/content";
import { Container, Ornament } from "./ui";

export function Footer() {
  const f = content.footer;
  return (
    <footer className="bg-ink pt-16 pb-24 text-ivory/80 sm:pb-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-serif text-3xl text-ivory">{site.brandName}</p>
            <p className="mt-3 max-w-sm text-ivory/70">{f.tagline}</p>
            <Ornament className="mt-6 text-gold-light" />
          </div>
          <div>
            <h2 className="mb-5 text-xs font-medium tracking-[0.25em] text-gold-light uppercase">
              {f.contactHeading}
            </h2>
            <dl className="space-y-3 text-sm">
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 text-ivory/60">{f.emailLabel}</dt>
                <dd>
                  <a className="text-ivory hover:text-gold-light" href={`mailto:${site.contactEmail}`}>
                    {site.contactEmail}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 text-ivory/60">{f.whatsappLabel}</dt>
                <dd>
                  <a className="text-ivory hover:text-gold-light" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                    {site.whatsappNumber}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 text-ivory/60">{f.instagramLabel}</dt>
                <dd>
                  <a className="text-ivory hover:text-gold-light" href={site.instagramUrl} target="_blank" rel="noopener noreferrer">
                    {site.instagramHandle}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-24 shrink-0 text-ivory/60">{f.locationLabel}</dt>
                <dd className="text-ivory">{f.location}</dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-4 border-t border-ivory/15 pt-6 text-xs text-ivory/60 sm:flex-row sm:items-center sm:justify-between">
          <p>{f.rights}</p>
          <Link href="/start" className="hover:text-gold-light">
            {content.nav.cta} →
          </Link>
        </div>
      </Container>
    </footer>
  );
}
