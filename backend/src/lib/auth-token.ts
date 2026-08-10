import { jwtVerify, SignJWT } from "jose";
import { getEnv } from "../config.js";

export const AUTH_COOKIE_NAME = "telal_admin_token";
export const AUTH_TOKEN_MAX_AGE_SECONDS = 8 * 60 * 60;

export interface AuthClaims {
  sub: string;
  email: string;
}

function secretKey(): Uint8Array {
  return new TextEncoder().encode(getEnv().JWT_SECRET);
}

export async function signAuthToken(claims: AuthClaims): Promise<string> {
  return new SignJWT({ email: claims.email })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(claims.sub)
    .setIssuedAt()
    .setExpirationTime(Math.floor(Date.now() / 1000) + AUTH_TOKEN_MAX_AGE_SECONDS)
    .sign(secretKey());
}

export async function verifyAuthToken(token: string): Promise<AuthClaims> {
  const { payload } = await jwtVerify(token, secretKey(), {
    algorithms: ["HS256"],
  });
  if (typeof payload.sub !== "string" || payload.sub.length === 0) {
    throw new Error("Invalid token: missing subject");
  }
  return {
    sub: payload.sub,
    email: typeof payload.email === "string" ? payload.email : "",
  };
}
