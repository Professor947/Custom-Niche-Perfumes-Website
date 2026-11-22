# Bespoke Niche Perfume — website

A marketing site and guided brief form for a bespoke perfume house in Pakistan. The home page explains the approach: original compositions, never copies. The `/start` form collects a structured brief, emails it to the owner and sends the client on to book a consultation in Calendly.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · react-hook-form · zod · Resend

---

## 1. Run it locally

```bash
npm install
cp .env.example .env.local   # then edit the values
npm run dev                  # http://localhost:3000
```

In development, if `RESEND_API_KEY` is empty, emails are **printed to the terminal** rather than sent, so you can test the whole form without an email account. You still need `OWNER_EMAIL` set.

Other scripts: `npm run build`, `npm start`, `npm run lint`.

## 2. Environment variables

All variables are listed and explained in [`.env.example`](./.env.example).

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_BRAND_NAME` | Business name `[BRAND_NAME]` |
| `NEXT_PUBLIC_CITY` | Base city `[CITY]` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email shown in the footer |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `[WHATSAPP_NUMBER]` in `+92…` format; powers every WhatsApp link |
| `NEXT_PUBLIC_CALENDLY_URL` | `[CALENDLY_URL]` — the consultation event link |
| `NEXT_PUBLIC_MIN_LEAD_TIME_WEEKS` | `[MIN_LEAD_TIME_WEEKS]` — shown on the site; dates sooner than this trigger a soft warning |
| `NEXT_PUBLIC_MIN_ORDER_QTY` | `[MIN_ORDER_QTY]` — `0` means no minimum; otherwise the form enforces it |
| `NEXT_PUBLIC_INSTAGRAM_URL` / `_HANDLE` | Footer Instagram link |
| `NEXT_PUBLIC_SITE_URL` | Your live domain (canonical, Open Graph, JSON-LD) |
| `OWNER_EMAIL` | `[OWNER_EMAIL]` — where new briefs are sent (server-only) |
| `RESEND_API_KEY` | Resend API key (server-only) |
| `EMAIL_FROM` | Sender, e.g. `Atelier Noor <briefs@yourdomain.pk>`. The domain must be verified in Resend. |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Optional. Leave empty to skip. |

`NEXT_PUBLIC_*` values are baked in at build time, so **redeploy after changing them**. As an alternative to env vars, you can edit the fallback values directly in `src/content/site.ts`.

## 3. Calendly setup (prefill)

After someone submits a brief, the thank-you screen embeds your Calendly event with these fields filled in:

| URL param | Fills | Example value |
|---|---|---|
| `name` | Invitee name | `Ayesha Khan` |
| `email` | Invitee email | `ayesha@example.com` |
| `a1` | **1st** custom question | `Event — Wedding — Mehndi` / `Own brand` / `Corporate — Acme Ltd` |
| `a2` | **2nd** custom question | `6 December 2026` |

In Calendly, open the event type and go to **Booking questions**. Then:

1. Keep the default **Name** and **Email** questions.
2. Add a question **"What is the perfume for?"** (one line) and make it the **first** custom question.
3. Add a question **"When do you need it by?"** (one line) and make it the **second** custom question.

Calendly matches `a1`, `a2`… to custom questions **by position**, so if you reorder them, update `src/lib/calendly.ts`. The same prefilled link is used for the "open in a new tab" fallback and in the client's confirmation email.

## 4. Email (Resend)

1. Create an account at resend.com, verify your sending domain, and create an API key.
2. Set `RESEND_API_KEY`, `EMAIL_FROM` (on the verified domain) and `OWNER_EMAIL`.

Each submission sends:
- **To the owner:** subject `New brief — {purpose} — {name} — needed by {date}`, with every answer laid out in sections. Reply-To is set to the client, so you can just hit reply.
- **To the client:** a short confirmation with the booking link.

If the owner email fails, the API returns an error. The form then shows a retry message and keeps every answer. Failures of the client email or the Sheet webhook are logged but don't fail the submission.

**Swapping providers:** the provider sits behind a small interface in `src/lib/email/`. Implement `EmailProvider` (one `send()` method), then return your class from `getEmailProvider()` in `src/lib/email/index.ts`.

## 5. Optional: Google Sheet log

In a Google Sheet, go to **Extensions → Apps Script** and paste:

```js
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  const data = JSON.parse(e.postData.contents);
  if (sheet.getLastRow() === 0) sheet.appendRow(Object.keys(data));
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  sheet.appendRow(headers.map((h) => data[h] ?? ""));
  return ContentService.createTextOutput("ok");
}
```

Then choose **Deploy → New deployment → Web app**, set "Who has access" to **Anyone**, and put the URL in `GOOGLE_SHEETS_WEBHOOK_URL`.

## 6. Deploy to Vercel

1. Push this repo to GitHub and import it at vercel.com/new (the framework is detected automatically).
2. In **Settings → Environment Variables**, add every variable from `.env.example` with real values.
3. Deploy. Add your domain under **Settings → Domains** and set `NEXT_PUBLIC_SITE_URL` to it, then redeploy.

## 7. Where to edit things

| What | Where |
|---|---|
| **All copy** (every heading, paragraph, FAQ, form label, option, error and email text) | `src/content/en.ts` |
| Business details / placeholders | `.env.local`, or fallbacks in `src/content/site.ts` |
| Fragrance families & note chips | `families` in `src/content/en.ts` (used by the home page and the form) |
| Bottle & packaging images | Replace files in `public/placeholders/` (keep the names, or change the `src` paths in `bottles.items` in `en.ts`). JPG/PNG/WebP all work. |
| Favicon | `src/app/icon.svg` (placeholder) |
| Social share image | `src/app/opengraph-image.tsx` generates a placeholder. To use a photo, delete it and add `src/app/opengraph-image.jpg` (1200×630). |
| Colours & fonts | `@theme` block in `src/app/globals.css`; fonts in `src/app/layout.tsx` |
| Form rules (required fields, limits) | `src/lib/enquiry.ts` — shared by the form and the API |

### Adding Urdu later
Components never hardcode text. To add Urdu, copy `src/content/en.ts` to `ur.ts` and translate the values, keeping keys and option `value`s unchanged. Then switch the export in `src/content/index.ts`, or select a locale per route. For RTL, set `dir="rtl"` and `lang="ur"` on `<html>` in `layout.tsx` and add an Urdu font such as Noto Nastaliq Urdu.

## 8. How the pieces fit

```
src/
  app/
    page.tsx               home (sections in order)
    start/page.tsx         multi-step brief form
    api/enquiry/route.ts   validate → honeypot → rate limit → email owner → email client → sheet
  components/
    sections/              Hero, Original, HowItWorks, WhoItsFor, Notes, Bottles, Faq, FinalCta
    form/                  EnquiryForm (state, steps, draft, submit), steps, fields, Progress, Success (Calendly)
    Header, Footer, WhatsAppButton, JsonLd, Reveal, ui
  content/                 site.ts (settings) · en.ts (copy) · index.ts (active locale)
  lib/
    enquiry.ts             zod schema + per-step validation + phone normalisation
    summary.ts             labelled summary used by the Review step and both emails
    calendly.ts            prefilled booking URL
    email/                 provider adapter (Resend, console) + templates
    rateLimit.ts, sheets.ts
```

- **Draft persistence:** answers and the current step are saved to `localStorage` on every change and restored on reload. The draft is cleared only after a successful submission.
- **`?purpose=individual|event|corporate`** pre-selects step 2. The "Who it's for" cards link this way.
- **Spam:** a hidden honeypot field (bots that fill it get a fake success), plus an in-memory limit of 5 submissions per IP per 10 minutes. The limit is per server instance; for heavier traffic, use a shared store such as Upstash Redis.
- **Phone numbers:** `03XXXXXXXXX`, `923XXXXXXXXX` and `+923XXXXXXXXX` (spaces and dashes allowed) are accepted and stored as `+923XXXXXXXXX`.
- **No real brands:** the comparison section and all copy are deliberately brand-free. Please keep it that way when editing.
