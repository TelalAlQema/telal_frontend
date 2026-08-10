import { Router, type Request, type Response } from "express";
import { z } from "zod";
import { SubmissionSource } from "../generated/prisma/enums.js";
import { AppError } from "../lib/http-error.js";
import { maskIp } from "../lib/ip.js";
import { sendAdminNotification, sendCustomerConfirmation, type LeadMailData } from "../lib/mailer.js";
import { prisma } from "../lib/prisma.js";
import { verifyRecaptcha } from "../lib/recaptcha.js";
import { submissionRateLimiter } from "../middleware/rate-limit.js";
import {
  contactSchema,
  HONEYPOT_FIELD,
  quoteSchema,
  RECAPTCHA_FIELD,
  zodFieldErrors,
  type ContactInput,
  type QuoteInput,
} from "../validation/lead.js";

export interface LeadRouterOptions {
  rateLimit?: number;
}

type LeadInput = ContactInput | QuoteInput;

async function handleSubmission(
  req: Request,
  res: Response,
  source: "QUOTE" | "CONTACT",
  schema: z.ZodType<LeadInput>,
): Promise<void> {
  const body = (req.body ?? {}) as Record<string, unknown>;

  // Honeypot must stay empty: bots that fill it are silently dropped while the
  // request still "succeeds" so the bot learns nothing.
  if (typeof body[HONEYPOT_FIELD] === "string" && body[HONEYPOT_FIELD].trim().length > 0) {
    res.json({ ok: true });
    return;
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    throw new AppError(400, "validation_error", "Validation failed.", zodFieldErrors(parsed.error));
  }

  const data = parsed.data;

  const verified = await verifyRecaptcha(data[RECAPTCHA_FIELD]);
  if (!verified) {
    throw new AppError(400, "recaptcha_failed", "Unable to verify you are not a robot. Please try again.");
  }

  const submission = await prisma.submission.create({
    data: {
      source: source as SubmissionSource,
      name: data.name,
      email: data.email,
      phone: data.phone,
      services: data.services,
      message: "message" in data && data.message ? data.message : null,
      // NFR-02: store a masked IP only, for spam metrics.
      ip: maskIp(req.ip ?? req.socket.remoteAddress ?? ""),
    },
  });

  const mailData: LeadMailData = {
    source,
    name: data.name,
    email: data.email,
    phone: data.phone,
    services: data.services,
    message: submission.message,
  };
  // FR-4: mailer logs its own failures and never throws — a saved lead still
  // gets a 200 even if SMTP is down.
  await sendCustomerConfirmation(mailData);
  await sendAdminNotification(mailData);

  res.json({ ok: true });
}

export function createLeadRouter(options: LeadRouterOptions = {}): Router {
  const router = Router();
  const limiter = submissionRateLimiter(options.rateLimit);

  router.post("/contact", limiter, async (req, res) => {
      console.log("🔥 CONTACT REQUEST REACHED EXPRESS");

    await handleSubmission(req, res, "CONTACT", contactSchema);
  });

  router.post("/quote", limiter, async (req, res) => {
    await handleSubmission(req, res, "QUOTE", quoteSchema);
  });

  return router;
}