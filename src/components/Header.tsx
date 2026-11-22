import Link from "next/link";
import { content, site } from "@/content";
import { ButtonLink, Container } from "./ui";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-ivory/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={content.nav.home}
          className="font-serif text-2xl font-medium tracking-wide text-ink"
        >
          {site.brandName}
        </Link>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {content.nav.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm tracking-wide text-stone transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ButtonLink href="/start" className="min-h-11 px-4 text-xs sm:px-5">
          {content.nav.cta}
        </ButtonLink>
      </Container>
    </header>
  );
}
