import { content, site } from "@/content";
import type { Submission } from "../enquiry";
import { buildSummary, formatDate, purposeShort } from "../summary";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const nl2br = (s: string) => esc(s).replace(/\n/g, "<br>");

const wrap = (inner: string) => `<!doctype html><html><body style="margin:0;background:#f7f2ea;padding:24px 12px;font-family:Helvetica,Arial,sans-serif;color:#1c1915">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;margin:0 auto;background:#fbf8f3;border:1px solid #d9cfbf">
<tr><td style="padding:28px 28px 8px;font-family:Georgia,serif;font-size:24px">${esc(site.brandName)}</td></tr>
${inner}
</table></body></html>`;

export function ownerEmail(s: Submission) {
  const sections = buildSummary(s);
  const subject = content.email.ownerSubject(purposeShort(s), s.fullName, formatDate(s.requiredBy) || s.requiredBy);

  const html = wrap(
    sections
      .map(
        (sec) => `<tr><td style="padding:20px 28px 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7a5a22">${esc(sec.title)}</td></tr>
<tr><td style="padding:0 28px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #d9cfbf">
${sec.rows
  .map(
    (r) => `<tr><td valign="top" style="padding:8px 12px 8px 0;width:38%;font-size:13px;color:#5e564b;border-bottom:1px solid #ebe3d6">${esc(r.label)}</td>
<td valign="top" style="padding:8px 0;font-size:14px;border-bottom:1px solid #ebe3d6">${r.value?.trim() ? nl2br(r.value) : "—"}</td></tr>`,
  )
  .join("")}
</table></td></tr>`,
      )
      .join("") + `<tr><td style="padding:24px 28px;font-size:12px;color:#5e564b">Reply to this email to answer ${esc(s.fullName)} directly.</td></tr>`,
  );

  const text = sections
    .map((sec) => `== ${sec.title} ==\n${sec.rows.map((r) => `${r.label}: ${r.value?.trim() || "—"}`).join("\n")}`)
    .join("\n\n");

  return { subject, html, text };
}

export function clientEmail(s: Submission, calendlyLink: string) {
  const E = content.email;
  const html = wrap(`<tr><td style="padding:12px 28px 28px;font-size:15px;line-height:1.6">
<p>${esc(E.clientGreeting(s.fullName.split(" ")[0] || s.fullName))}</p>
${E.clientBody.map((p) => `<p>${esc(p)}</p>`).join("")}
<p style="margin:24px 0"><a href="${esc(calendlyLink)}" style="display:inline-block;background:#1c1915;color:#f7f2ea;padding:14px 22px;text-decoration:none;letter-spacing:1px;font-size:13px;text-transform:uppercase">${esc(E.clientBook)}</a></p>
<p>${nl2br(E.clientSignoff)}</p>
</td></tr>`);
  const text = `${E.clientGreeting(s.fullName.split(" ")[0] || s.fullName)}\n\n${E.clientBody.join("\n\n")}\n\n${E.clientBook}: ${calendlyLink}\n\n${E.clientSignoff}`;
  return { subject: E.clientSubject, html, text };
}
