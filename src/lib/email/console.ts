import type { EmailMessage, EmailProvider } from "./types";

/** Development fallback: prints emails to the server console instead of sending. */
export class ConsoleProvider implements EmailProvider {
  readonly name = "console";
  async send(m: EmailMessage): Promise<void> {
    console.info(`\n[email:console] To: ${m.to}\nSubject: ${m.subject}\nReply-To: ${m.replyTo ?? "-"}\n\n${m.text}\n`);
  }
}
