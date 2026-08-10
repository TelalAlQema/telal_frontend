import { getEnv } from "../config.js";

const SITEVERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";

interface SiteVerifyResponse {
  success?: boolean;
}

/**
 * Server-side reCAPTCHA verification via fetch (SRS FR-5). Fail-closed:
 * a network error, non-200, missing secret, or `success:false` all mean
 * "not verified" — the submission is rejected.
 */
export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = getEnv().RECAPTCHA_SECRET;
  if (!secret || secret.length === 0) {
    console.error("[recaptcha] RECAPTCHA_SECRET is not configured; submission rejected.");
    return false;
  }

  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    if (!res.ok) return false;
    const body = (await res.json()) as SiteVerifyResponse;
    return body.success === true;
  } catch (err) {
    console.error(
      "[recaptcha] verification failed:",
      err instanceof Error ? err.message : String(err),
    );
    return false;
  }
}