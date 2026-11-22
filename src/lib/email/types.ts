export type EmailMessage = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

/** Swap providers by implementing this interface and returning it from getEmailProvider(). */
export interface EmailProvider {
  readonly name: string;
  send(message: EmailMessage): Promise<void>;
}
