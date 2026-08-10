import type { ErrorRequestHandler, RequestHandler } from "express";
import { AppError } from "../lib/http-error.js";

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ status: "not_found" });
};

function isBodyParserError(err: unknown): err is { status: number; type: string } {
  if (typeof err !== "object" || err === null) return false;
  const candidate = err as { status?: unknown; type?: unknown };
  return candidate.status === 400 && typeof candidate.type === "string" && candidate.type.endsWith(".parse.failed");
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (isBodyParserError(err)) {
    res.status(400).json({
      status: "error",
      code: "invalid_json",
      message: "Request body must be valid JSON.",
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      code: err.code,
      message: err.message,
      ...(err.details !== undefined ? { details: err.details } : {}),
    });
    return;
  }

  console.error("Unhandled error:", err);
  res.status(500).json({
    status: "error",
    code: "internal_server_error",
  });
};