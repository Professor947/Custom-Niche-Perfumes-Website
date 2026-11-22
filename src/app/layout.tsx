import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { content, site } from "@/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LocalBusinessJsonLd } from "@/components/JsonLd";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: { default: content.meta.title, template: `%s | ${site.brandName}` },
  description: content.meta.description,
  keywords: content.meta.keywords,
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: site.brandName,
    title: content.meta.title,
    description: content.meta.description,
  },
  twitter: { card: "summary_large_image", title: content.meta.title, description: content.meta.description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#1c1915",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`} suppressHydrationWarning>
      <head>
        {/* Flags JS availability so scroll-reveal never hides content for no-JS visitors. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh bg-ivory text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory"
        >
          {content.nav.skipToContent}
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
