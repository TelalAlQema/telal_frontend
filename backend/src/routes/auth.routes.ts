import { Router } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../lib/http-error.js";
import { AUTH_COOKIE_NAME, signAuthToken } from "../lib/auth-token.js";
import { authCookieOptions, requireAuth } from "../middleware/require-auth.js";

export const authRouter = Router();

const GENERIC_LOGIN_ERROR = "Invalid email or password.";

authRouter.post("/login", async (req, res) => {
  const body = req.body as Record<string, unknown>;
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";

  if (email.length === 0 || password.length === 0) {
    throw new AppError(400, "validation_error", "Email and password are required.");
  }

  const admin = await prisma.adminUser.findUnique({ where: { email } });

  // Generic failure for unknown email and wrong password alike: never reveal
  // whether an account exists (prevents admin-user enumeration).
  const ok =
    admin !== null &&
    (await bcrypt.compare(password, admin.passwordHash).catch(() => false));

  if (!ok || admin === null) {
    throw new AppError(401, "invalid_credentials", GENERIC_LOGIN_ERROR);
  }

  await prisma.adminUser
    .update({ where: { id: admin.id }, data: { lastLoginAt: new Date() } })
    .catch(() => {
      // Non-fatal: a failed login-timestamp write must not break sign-in.
    });

  const token = await signAuthToken({ sub: String(admin.id), email: admin.email });
  res.cookie(AUTH_COOKIE_NAME, token, authCookieOptions());
  res.json({ status: "ok", user: { id: admin.id, email: admin.email } });
});

authRouter.get("/me", requireAuth, (req, res) => {
  res.json({ status: "ok", user: req.user });
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME, { path: "/" });
  res.json({ status: "ok" });
});