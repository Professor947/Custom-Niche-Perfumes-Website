import { ImageResponse } from "next/og";
import { content, site } from "@/content";

/* PLACEHOLDER Open Graph image, generated at build time.
   To use a photo instead, delete this file and add src/app/opengraph-image.jpg (1200×630). */
export const alt = content.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#1c1915",
          color: "#f7f2ea",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 8, color: "#d1ad6b", textTransform: "uppercase" }}>
          {`${site.brandName} · ${site.city}`}
        </div>
        <div style={{ fontSize: 84, marginTop: 24, lineHeight: 1.05 }}>{content.hero.title}</div>
        <div style={{ fontSize: 30, marginTop: 32, color: "#cfc6b8" }}>Original bespoke perfume · Pakistan</div>
      </div>
    ),
    size,
  );
}
