import type { NextFunction, Request, RequestHandler, Response } from "express";
import { performance } from "node:perf_hooks";
import { maskIp } from "../lib/ip.js";

export function requestLogger(): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const startedAt = performance.now();

    res.once("finish", () => {
      const entry = {
        ts: new Date().toISOString(),
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        durationMs: Math.round((performance.now() - startedAt) * 100) / 100,
        // NFR-02: client IP is masked — never logged in plaintext.
        ip: maskIp(req.ip ?? req.socket.remoteAddress ?? "unknown"),
      };

      const line = JSON.stringify(entry);
      if (res.statusCode >= 500) {
        console.error(line);
      } else {
        console.log(line);
      }
    });

    next();
  };
}