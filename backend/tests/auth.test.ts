import assert from "node:assert/strict";
import type { Server } from "node:http";
import type { AddressInfo } from "node:net";
import { after, before, mock, test } from "node:test";
import bcrypt from "bcryptjs";

// Env must be present before the app module (which validates env on import) loads.
process.env.NODE_ENV = "test";
process.env.PORT ??= "4098";
process.env.DATABASE_URL ??= "mysql://unused:unused@127.0.0.1:3301/unused";
process.env.JWT_SECRET ??= "test-only-secret-with-at-least-32-characters!";

const ADMIN_EMAIL = "admin@telal-contracting.com";
const ADMIN_PASSWORD = "correct-horse-battery-staple";

const adminRecord = {
  id: 1,
  email: ADMIN_EMAIL,
  passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 4),
  lastLoginAt: null,
};

// Prisma delegates expose lazily-recreated methods that node:test's
// mock.method cannot replace, so mock the whole prisma module before the
// app (and its routes) import it. Requires --experimental-test-module-mocks.
const fakePrisma = {
  adminUser: {
    findUnique: async ({ where }: { where: { email: string } }) =>
      where.email === adminRecord.email ? adminRecord : null,
    update: async () => adminRecord,
  },
};
mock.module("../src/lib/prisma.js", { namedExports: { prisma: fakePrisma } });

const { createApp } = await import("../src/app.js");

let server: Server;
let baseUrl: string;

async function request(path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

function cookieFrom(res: Response): string {
  const setCookie = res.headers.get("set-cookie") ?? "";
  const pair = setCookie.split(";")[0];
  assert.ok(pair, "expected a Set-Cookie header");
  return pair;
}

before(async () => {
  server = createApp().listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const { port } = server.address() as AddressInfo;
  baseUrl = `http://127.0.0.1:${port}`;
});

after(async () => {
  mock.reset();
  await new Promise<void>((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
});

test("POST /api/v1/auth/login with correct credentials returns 200 and an httpOnly cookie", async () => {
  const res = await request("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });
  assert.equal(res.status, 200);
  const body = (await res.json()) as { user: { id: number; email: string } };
  assert.deepEqual(body.user, { id: adminRecord.id, email: ADMIN_EMAIL });

  const setCookie = res.headers.get("set-cookie") ?? "";
  assert.match(setCookie, /telal_admin_token=/);
  assert.match(setCookie, /HttpOnly/i);
  assert.match(setCookie, /SameSite=Lax/i);
  assert.match(setCookie, /Path=/i);
});

test("GET /api/v1/auth/me returns the admin when the cookie is valid", async () => {
  const login = await request("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });
  const cookie = cookieFrom(login);

  const res = await request("/api/v1/auth/me", { headers: { cookie } });
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), {
    status: "ok",
    user: { id: adminRecord.id, email: ADMIN_EMAIL },
  });
});

test("POST /api/v1/auth/login with a wrong password returns 401 with a generic message", async () => {
  const res = await request("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email: ADMIN_EMAIL, password: "wrong-password" }),
  });
  assert.equal(res.status, 401);
  const body = (await res.json()) as { code: string; message: string };
  assert.equal(body.code, "invalid_credentials");
  assert.equal(body.message, "Invalid email or password.");
  assert.equal(res.headers.get("set-cookie"), null, "no cookie must be set on failure");
});

test("POST /api/v1/auth/login with an unknown email returns the same generic 401", async () => {
  const res = await request("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email: "nobody@example.com", password: "whatever" }),
  });
  assert.equal(res.status, 401);
  const body = (await res.json()) as { message: string };
  assert.equal(body.message, "Invalid email or password.");
});

test("GET /api/v1/auth/me without a token returns 401", async () => {
  const res = await request("/api/v1/auth/me");
  assert.equal(res.status, 401);
  assert.equal((await res.json() as { code: string }).code, "unauthorized");
});

test("GET /api/v1/auth/me with a tampered token returns 401", async () => {
  const login = await request("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });
  const cookie = cookieFrom(login);

  const [cookieName, value] = cookie.split("=");
  const tampered = `${cookieName}=${value ? value.slice(0, -4) : ""}AAAA`;
  const res = await request("/api/v1/auth/me", { headers: { cookie: tampered } });
  assert.equal(res.status, 401);
});

test("POST /api/v1/auth/login with a missing password returns 400", async () => {
  const res = await request("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email: ADMIN_EMAIL }),
  });
  assert.equal(res.status, 400);
  assert.equal((await res.json() as { code: string }).code, "validation_error");
});

test("POST /api/v1/auth/logout clears the auth cookie", async () => {
  const login = await request("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });
  const cookie = cookieFrom(login);

  const res = await request("/api/v1/auth/logout", {
    method: "POST",
    headers: { cookie },
  });
  assert.equal(res.status, 200);
  const setCookie = res.headers.get("set-cookie") ?? "";
  assert.match(setCookie, /telal_admin_token=;/);
  assert.match(setCookie, /Expires=Thu, 01 Jan 1970/i);
});