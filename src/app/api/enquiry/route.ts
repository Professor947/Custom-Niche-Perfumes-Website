import { NextResponse, type NextRequest } from "next/server";
import { enquirySchema, toSubmission } from "@/lib/enquiry";
import { getEmailProvider } from "@/lib/email";
import { clientEmail, ownerEmail } from "@/lib/email/templates";
import { rateLimit } from "@/lib/rateLimit";
import { appendToSheet } from "@/lib/sheets";
import { calendlyUrl } from "@/lib/calendly";
import { purposeShort } from "@/lib/summary";

export const runtime = "nodejs";

function ip(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  if (!rateLimit(ip(req))) {
    return NextResponse.json({ ok: false, error: "rate_limited", message: "Too many submissions. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json", message: "Malformed request." }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation",
        message: "Some answers need attention.",
        issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })),
      },
      { status: 422 },
    );
  }

  // Honeypot filled → pretend success so bots learn nothing.
  if (parsed.data.website.trim()) return NextResponse.json({ ok: true });

  const owner = process.env.OWNER_EMAIL;
  const provider = getEmailProvider();
  if (!provider || !owner) {
    console.error("[enquiry] Email not configured: set RESEND_API_KEY, EMAIL_FROM and OWNER_EMAIL.");
    return NextResponse.json({ ok: false, error: "not_configured", message: "We couldn't send your brief right now." }, { status: 503 });
  }

  const s = toSubmission(parsed.data);

  try {
    const o = ownerEmail(s);
    await provider.send({ to: owner, replyTo: s.email, ...o });
  } catch (e) {
    console.error("[enquiry] Owner email failed:", e);
    return NextResponse.json({ ok: false, error: "send_failed", message: "We couldn't send your brief right now." }, { status: 502 });
  }

  // The brief has reached the owner; the rest must not fail the request.
  const link = calendlyUrl({ name: s.fullName, email: s.email, purpose: purposeShort(s), requiredBy: s.requiredBy });
  await Promise.allSettled([
    provider.send({ to: s.email, replyTo: owner, ...clientEmail(s, link) }).catch((e) => console.error("[enquiry] Client email failed:", e)),
    appendToSheet(s),
  ]);

  return NextResponse.json({ ok: true });
}
