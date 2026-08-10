import type { CookieOptions, NextFunction, Request, RequestHandler, Response } from "express";
import { getEnv } from "../config.js";
import { AUTH_COOKIE_NAME, verifyAuthToken } from "../lib/auth-token.js";
import { AppError } from "../lib/http-error.js";

export interface AuthUser {
  id: number;
  email: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export const requireAuth: RequestHandler = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.[AUTH_COOKIE_NAME];
    if (typeof token !== "string" || token.length === 0) {
      throw new AppError(401, "unauthorized", "Authentication required.");
    }

    const claims = await verifyAuthToken(token);
    const id = Number.parseInt(claims.sub, 10);
    if (!Number.isInteger(id) || id <= 0) {
      throw new AppError(401, "unauthorized", "Authentication required.");
    }

    req.user = { id, email: claims.email };
    next();
  } catch (err) {
    if (err instanceof AppError) {
      next(err);
      return;
    }
    // Invalid/expired/tampered token look exactly like a missing one.
    next(new AppError(401, "unauthorized", "Authentication required."));
  }
};

export function authCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: getEnv().NODE_ENV === "production",
    path: "/",
    maxAge: 8 * 60 * 60 * 1000,
  };
}