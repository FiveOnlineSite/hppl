import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  return transporter;
}

function formatLabel(key: string) {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

function formatValue(value: unknown) {
  if (Array.isArray(value)) return value.join(", ") || "-";
  if (value === undefined || value === null || value === "") return "-";
  return String(value);
}

function buildHtmlTable(data: Record<string, unknown>) {
  const rows = Object.entries(data)
    .map(
      ([key, value]) =>
        `<tr>` +
        `<td style="padding:8px 12px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:600;white-space:nowrap;">${formatLabel(key)}</td>` +
        `<td style="padding:8px 12px;border:1px solid #e2e8f0;">${formatValue(value)}</td>` +
        `</tr>`,
    )
    .join("");
  return `<table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px;">${rows}</table>`;
}

export async function sendInquiryEmails({
  formName,
  data,
  recipientEmail,
  recipientName,
}: {
  formName: string;
  data: Record<string, unknown>;
  recipientEmail?: string;
  recipientName?: string;
}) {
  const mail = getTransporter();
  const from = process.env.MAIL_FROM ?? process.env.SMTP_USER ?? "";
  const adminEmail = process.env.ADMIN_EMAIL;
  const table = buildHtmlTable(data);

  const sends: Promise<unknown>[] = [];

  if (adminEmail) {
    sends.push(
      mail.sendMail({
        from,
        to: adminEmail,
        replyTo: recipientEmail,
        subject: `New ${formName} Submission`,
        html: `<h2>New ${formName} Submission</h2>${table}`,
      }),
    );
  }

  if (recipientEmail) {
    sends.push(
      mail.sendMail({
        from,
        to: recipientEmail,
        subject: `We received your ${formName}`,
        html:
          `<p>Dear ${recipientName || "Sir/Madam"},</p>` +
          `<p>Thank you for submitting your ${formName.toLowerCase()} to Hindustan Pencils. ` +
          `Our team has received the following details and will get back to you soon.</p>${table}`,
      }),
    );
  }

  await Promise.all(sends);
}
