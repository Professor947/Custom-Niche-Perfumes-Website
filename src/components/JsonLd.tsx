import { content, site } from "@/content";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.siteUrl}/#business`,
    name: site.brandName,
    description: content.meta.description,
    url: site.siteUrl,
    email: site.contactEmail,
    telephone: site.whatsappNumber,
    image: `${site.siteUrl}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressCountry: "PK",
    },
    areaServed: { "@type": "Country", name: "Pakistan" },
    sameAs: [site.instagramUrl],
    knowsAbout: content.meta.keywords,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
