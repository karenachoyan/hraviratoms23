import nodemailer from "nodemailer";
import type { RsvpEntry } from "./types";
import { buildRsvpWorkbookBuffer } from "./excel";

function getSmtpConfig() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.RSVP_NOTIFY_EMAIL;
  const from = process.env.SMTP_FROM ?? user;

  if (!host || !user || !pass || !to || !from) {
    throw new Error(
      "Email is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, RSVP_NOTIFY_EMAIL.",
    );
  }

  return { host, port, user, pass, to, from };
}

export async function sendRsvpExcelEmail(
  entries: RsvpEntry[],
  latest: RsvpEntry,
): Promise<void> {
  const { host, port, user, pass, to, from } = getSmtpConfig();
  // Port 465 = implicit TLS (secure: true). Port 587 = STARTTLS (secure: false).
  const secure = port === 465;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    requireTLS: !secure,
    auth: { user, pass },
  });

  const fileBuffer = buildRsvpWorkbookBuffer(entries);
  const fileName = `rsvp-armen-diana-${entries.length}-hyurolner.xlsx`;
  const subject = `Նոր RSVP · ${latest.name} · ընդամենը ${entries.length}`;

  await transporter.sendMail({
    from,
    to,
    subject,
    text: [
      "Նոր RSVP գրանցում",
      "",
      `Կողմ: ${latest.side}`,
      `Անուն: ${latest.name}`,
      `Ներկայություն: ${latest.attendance}`,
      `Հյուրերի թիվ: ${latest.guestCount || "—"}`,
      "",
      `Ընդամենը գրանցումներ: ${entries.length}`,
      "",
      "Կից Excel ֆայլում ամբողջ թարմացված ցուցակն է։",
    ].join("\n"),
    attachments: [
      {
        filename: fileName,
        content: fileBuffer,
        contentType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ],
  });
}

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.RSVP_NOTIFY_EMAIL,
  );
}
