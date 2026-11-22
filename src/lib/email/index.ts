import { ConsoleProvider } from "./console";
import { ResendProvider } from "./resend";
import type { EmailProvider } from "./types";

export type { EmailMessage, EmailProvider } from "./types";

/**
 * Picks the email provider from env vars.
 * - RESEND_API_KEY set → Resend
 * - otherwise, in development → console logger
 * - otherwise (production without a key) → null, so the API returns an error instead of silently dropping briefs
 */
export function getEmailProvider(): EmailProvider | null {
  const key = process.env.RESEND_API_KEY;
  if (key) {
    const from = process.env.EMAIL_FROM || "Briefs <onboarding@resend.dev>";
    return new ResendProvider(key, from);
  }
  if (process.env.NODE_ENV !== "production") return new ConsoleProvider();
  return null;
}
