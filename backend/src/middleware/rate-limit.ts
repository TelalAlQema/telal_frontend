import type { RequestHandler } from "express";
import { rateLimit } from "express-rate-limit";

// FR-5 / M3 DoD: both lead POSTs are limited to 5 requests/minute/IP.
// The limiter is created per app/router (see lead.routes) so every app
// instance gets its own in-memory counter.
export function submissionRateLimiter(limit = 5): RequestHandler {
  return rateLimit({
    windowMs: 60_000,
    limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    handler: (_req, res) => {
      res.status(429).json({
        status: "error",
        code: "rate_limited",
        message: "Too many submissions. Please try again in a minute.",
      });
    },
  });
}