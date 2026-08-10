import type { Transporter } from "nodemailer";
import nodemailer from "nodemailer";
import { getEnv } from "../config.js";

const BRAND_NAME = "Telal Al Qema Building Contracting";
const CONTACT_PHONE = "+971555983192";
const CONTACT_EMAIL = "info@telal-contracting.com";
const OFFICE = "Al Reem Tower, Office 1301, Dubai-UAE";

export interface LeadMailData {
  source: "QUOTE" | "CONTACT";
  name: string;
  email: string;
  phone: string;
  services: string;
  message?: string | null;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (ch) => {
    switch (ch) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

function escapeHtmlLines(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br>");
}

function buildTransporter(): Transporter | null {
  const env = getEnv();
  if (!env.SMTP_HOST || !env.SMTP_USER || !env.SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    // STARTTLS on 587 (SRS FR-4). No opportunistic downgrade for the app
    // account password; `secure:false` + port 587 is the Gmail-style setup.
    secure: false,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  });
}

function customerTemplate(data: LeadMailData): { subject: string; html: string } {
  const isQuote = data.source === "QUOTE";
  const subject = isQuote
    ? "Thank you for your quote request!"
    : "Thank you for contacting us!";
  const messageHtml = data.message
    ? `<p>Your message:</p><blockquote style="border-left:3px solid #4CAF50;margin:8px 0;padding:4px 12px;color:#444;">${escapeHtmlLines(data.message)}</blockquote>`
    : "";
  return {
    subject,
    html: `
      <div style="font-family:Segoe UI,Arial,sans-serif;background:#f6f9fc;padding:30px;border-radius:10px;border:1px solid #ddd;max-width:600px;margin:auto;">
        <h2 style="color:#4CAF50;margin:0 0 8px;">Thank You, ${escapeHtml(data.name)}!</h2>
        <p>We have received your request for <strong>${BRAND_NAME}</strong>. Our team will contact you soon.</p>
        ${messageHtml}
        <hr style="border:none;border-top:1px solid #ddd;">
        <p>Contact: <a href="tel:${CONTACT_PHONE}">+971 55 598 3192</a></p>
        <p>Email: <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>
        <p>Office: ${OFFICE}</p>
        <p style="font-size:12px;color:#999;">Sent on ${new Date().toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
      </div>`,
  };
}

function adminTemplate(data: LeadMailData): { subject: string; html: string } {
  const isQuote = data.source === "QUOTE";
  const subject = isQuote ? "New Customer Quote Request" : "New Contact Form Submission";
  const messageHtml = data.message
    ? `<li>Message: ${escapeHtmlLines(data.message)}</li>`
    : "";
  return {
    subject,
    html: `
      <div style="font-family:Segoe UI,Arial,sans-serif;background:#fffefc;padding:30px;border:1px solid #ccc;border-radius:10px;max-width:600px;margin:auto;">
        <h2 style="margin:0 0 8px;">${isQuote ? "New Quote Request Received" : "New Contact Request"}</h2>
        <ul style="line-height:1.8;">
          <li>Name: ${escapeHtml(data.name)}</li>
          <li>Email: <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></li>
          <li>Phone: ${escapeHtml(data.phone)}</li>
          <li>Services: ${escapeHtml(data.services)}</li>
          ${messageHtml}
        </ul>
        <p style="font-size:12px;color:#999;">Submitted on ${new Date().toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}</p>
      </div>`,
  };
}

// Both senders catch and log every failure (SRS FR-4): a lead email must never
// break the HTTP 200 the visitor already earned.

export async function sendCustomerConfirmation(data: LeadMailData): Promise<void> {
  const transporter = buildTransporter();
  if (!transporter) {
    console.log("[mailer] SMTP not configured — skipping customer confirmation email.");
    return;
  }
  try {
    const { subject, html } = customerTemplate(data);
    await transporter.sendMail({
      from: `"${BRAND_NAME}" <${getEnv().SMTP_USER}>`,
      to: data.email,
      subject,
      html,
    });
  } catch (err) {
    console.error("[mailer] customer email failed:", err instanceof Error ? err.message : String(err));
  }
}

export async function sendAdminNotification(data: LeadMailData): Promise<void> {
  const transporter = buildTransporter();
  if (!transporter) {
    console.log("[mailer] SMTP not configured — skipping admin notification email.");
    return;
  }
  try {
    const { subject, html } = adminTemplate(data);
    await transporter.sendMail({
      from: `"Contact Form" <${getEnv().SMTP_USER}>`,
      to: getEnv().SMTP_USER,
      replyTo: `"${data.name}" <${data.email}>`,
      subject,
      html,
    });
  } catch (err) {
    console.error("[mailer] admin email failed:", err instanceof Error ? err.message : String(err));
  }
}