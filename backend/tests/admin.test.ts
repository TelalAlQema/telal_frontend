import assert from "node:assert/strict";
import type { Server } from "node:http";
import type { AddressInfo } from "node:net";
import { after, before, mock, test } from "node:test";
import bcrypt from "bcryptjs";

// Env must be present before the app module (which validates env on import) loads.
process.env.NODE_ENV = "test";
process.env.PORT ??= "4101";
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

interface StoredSubmission {
  id: number;
  source: string;
  name: string;
  email: string;
  phone: string;
  services: string;
  message: string | null;
  ip: string | null;
  read: boolean;
  createdAt: Date;
}

function submission(
  id: number,
  source: string,
  createdAt: Date,
  overrides: Partial<StoredSubmission> = {},
): StoredSubmission {
  return {
    id,
    source,
    name: `Lead ${id}`,
    email: `lead${id}@example.com`,
    phone: "0500000000",
    services: "HVAC",
    message: null,
    ip: "10.0.0.1",
    read: false,
    createdAt,
    ...overrides,
  };
}

const submissions = new Map<number, StoredSubmission>([
  [1, submission(1, "QUOTE", new Date("2026-08-01T10:00:00Z"))],
  [2, submission(2, "CONTACT", new Date("2026-08-02T10:00:00Z"), { read: true })],
  [3, submission(3, "QUOTE", new Date("2026-08-03T10:00:00Z"))],
  [4, submission(4, "CONTACT", new Date("2026-08-04T10:00:00Z"), { message: "Custom message." })],
]);

const fakePrisma = {
  adminUser: {
    findUnique: async ({ where }: { where: { email: string } }) =>
      where.email === adminRecord.email ? adminRecord : null,
    update: async () => adminRecord,
  },
  submission: {
    findMany: async ({
      where = {},
      skip = 0,
      take = 20,
    }: {
      where?: { source?: string };
      skip?: number;
      take?: number;
    }) => {
      const matching = Array.from(submissions.values())
        .filter((item) => where.source === undefined || item.source === where.source)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      return matching.slice(skip, skip + take);
    },
    count: async ({ where = {} }: { where?: { source?: string } }) =>
      Array.from(submissions.values()).filter(
        (item) => where.source === undefined || item.source === where.source,
      ).length,
    findUnique: async ({ where }: { where: { id: number } }) => submissions.get(where.id) ?? null,
    update: async ({
      where,
      data,
    }: {
      where: { id: number };
      data: { read: boolean };
    }) => {
      const existing = submissions.get(where.id);
      if (existing === undefined) throw new Error("record not found");
      const updated = { ...existing, ...data };
      submissions.set(where.id, updated);
      return updated;
    },
    delete: async ({ where }: { where: { id: number } }) => {
      const existing = submissions.get(where.id);
      if (existing === undefined) throw new Error("record not found");
      submissions.delete(where.id);
      return existing;
    },
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

async function login(): Promise<string> {
  const res = await request("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
  });
  assert.equal(res.status, 200);
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

test("GET /api/v1/submissions without a token returns 401", async () => {
  const res = await request("/api/v1/submissions");
  assert.equal(res.status, 401);
  assert.equal((await res.json() as { code: string }).code, "unauthorized");
});

test("PATCH and DELETE without a token return 401", async () => {
  const patch = await request("/api/v1/submissions/1/read", { method: "PATCH", body: "{}" });
  assert.equal(patch.status, 401);
  const del = await request("/api/v1/submissions/1", { method: "DELETE" });
  assert.equal(del.status, 401);
});

test("GET /api/v1/submissions returns items ordered newest-first with pagination", async () => {
  const cookie = await login();
  const res = await request("/api/v1/submissions?page=1&pageSize=2", { headers: { cookie } });

  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    items: Array<{ id: number; source: string }>;
    pagination: { page: number; pageSize: number; total: number; totalPages: number };
  };

  assert.deepEqual(body.pagination, { page: 1, pageSize: 2, total: 4, totalPages: 2 });
  assert.deepEqual(body.items.map((item) => item.id), [4, 3]);

  const pageTwo = await request("/api/v1/submissions?page=2&pageSize=2", { headers: { cookie } });
  const pageTwoBody = (await pageTwo.json()) as { items: Array<{ id: number }> };
  assert.deepEqual(pageTwoBody.items.map((item) => item.id), [2, 1]);
});

test("GET /api/v1/submissions?source= filters to a single source", async () => {
  const cookie = await login();
  const res = await request("/api/v1/submissions?source=QUOTE", { headers: { cookie } });

  assert.equal(res.status, 200);
  const body = (await res.json()) as {
    items: Array<{ id: number; source: string }>;
    pagination: { total: number };
  };
  assert.equal(body.pagination.total, 2);
  assert.ok(body.items.every((item) => item.source === "QUOTE"));
});

test("GET /api/v1/submissions with an invalid source returns 400", async () => {
  const cookie = await login();
  const res = await request("/api/v1/submissions?source=NOPE", { headers: { cookie } });
  assert.equal(res.status, 400);
  assert.equal((await res.json() as { code: string }).code, "validation_error");
});

test("PATCH /api/v1/submissions/:id/read marks the lead as read", async () => {
  const cookie = await login();
  const res = await request("/api/v1/submissions/1/read", {
    method: "PATCH",
    headers: { cookie },
    body: "{}",
  });

  assert.equal(res.status, 200);
  const body = (await res.json()) as { id: number; read: boolean };
  assert.equal(body.id, 1);
  assert.equal(body.read, true);
  assert.equal(submissions.get(1)?.read, true);
});

test("PATCH /api/v1/submissions/:id/read with read=false unmarks", async () => {
  const cookie = await login();
  const res = await request("/api/v1/submissions/2/read", {
    method: "PATCH",
    headers: { cookie },
    body: JSON.stringify({ read: false }),
  });

  assert.equal(res.status, 200);
  const body = (await res.json()) as { read: boolean };
  assert.equal(body.read, false);
  assert.equal(submissions.get(2)?.read, false);
});

test("PATCH /api/v1/submissions/:id/read on a missing id returns 404", async () => {
  const cookie = await login();
  const res = await request("/api/v1/submissions/999/read", {
    method: "PATCH",
    headers: { cookie },
    body: "{}",
  });
  assert.equal(res.status, 404);
  assert.equal((await res.json() as { code: string }).code, "not_found");
});

test("DELETE /api/v1/submissions/:id returns 204 and removes the record", async () => {
  const cookie = await login();
  const res = await request("/api/v1/submissions/4", { method: "DELETE", headers: { cookie } });
  assert.equal(res.status, 204);
  assert.equal(res.headers.get("content-type"), null);
  assert.equal(submissions.has(4), false);
});

test("DELETE /api/v1/submissions/:id on a missing id returns 404", async () => {
  const cookie = await login();
  const res = await request("/api/v1/submissions/999", { method: "DELETE", headers: { cookie } });
  assert.equal(res.status, 404);
  assert.equal((await res.json() as { code: string }).code, "not_found");
});

test("PATCH /api/v1/submissions/abc/read returns 400", async () => {
  const cookie = await login();
  const res = await request("/api/v1/submissions/abc/read", {
    method: "PATCH",
    headers: { cookie },
    body: "{}",
  });
  assert.equal(res.status, 400);
  assert.equal((await res.json() as { code: string }).code, "validation_error");
});