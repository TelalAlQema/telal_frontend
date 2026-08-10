export type LeadFieldErrors = Record<string, string>;

export type LeadSubmitResult =
  | { ok: true }
  | { ok: false; kind: "validation"; fields: LeadFieldErrors; message: string }
  | { ok: false; kind: "recaptcha"; message: string }
  | { ok: false; kind: "rate_limit"; message: string }
  | { ok: false; kind: "server"; message: string }
  | { ok: false; kind: "network"; message: string };

type ApiErrorBody = {
  status?: string;
  code: string;
  message: string;
  details?: { fields?: LeadFieldErrors };
};

// Honeypot field accepted by the backend (see backend/src/validation/lead.ts).
// Must be submitted as the empty string — bots that autofill are dropped.
const HONEYPOT_FIELD = "website";
const RECAPTCHA_FIELD = "g-recaptcha-response";

/**
 * POSTs a lead to the same-origin /api/v1 endpoint (proxied to the Express
 * backend in dev via next.config rewrites; same origin in production).
 */
export async function submitContact(payload: {
  name: string;
  email: string;
  phone: string;
  services: string;
  message: string;
  recaptchaToken: string;
}): Promise<LeadSubmitResult> {
  const body: Record<string, string> = {
    name: payload.name,
    email: payload.email,
    phone: payload.phone,
    services: payload.services,
    message: payload.message,
    [RECAPTCHA_FIELD]: payload.recaptchaToken,
    [HONEYPOT_FIELD]: "",
  };

  let res: Response;
  try {
    res = await fetch("/api/v1/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return {
      ok: false,
      kind: "network",
      message:
        "We couldn't reach the server. Please check your connection and try again.",
    };
  }

  if (res.ok) return { ok: true };

  let data: ApiErrorBody | null = null;
  try {
    data = (await res.json()) as ApiErrorBody;
  } catch {
    // Non-JSON error body — fall through to status-based handling.
  }

  const { code = "internal_server_error", message = "", details } = data ?? {};

  switch (code) {
    case "validation_error":
      return {
        ok: false,
        kind: "validation",
        message,
        fields: details?.fields ?? {},
      };
    case "recaptcha_failed":
      return { ok: false, kind: "recaptcha", message };
    case "rate_limited":
      return { ok: false, kind: "rate_limit", message };
    case "invalid_json":
      return {
        ok: false,
        kind: "server",
        message: "The request could not be processed. Please try again.",
      };
    default:
      return {
        ok: false,
        kind: res.status >= 500 ? "server" : "network",
        message:
          res.status >= 500
            ? "Something went wrong on our side. Please try again shortly."
            : "The request failed. Please try again.",
      };
  }
}
