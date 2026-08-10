import assert from "node:assert/strict";
import type { Server } from "node:http";
import type { AddressInfo } from "node:net";
import { after, before, mock, test } from "node:test";

// Env must be present before the app module (which validates env on import) loads.
process.env.NODE_ENV = "test";
process.env.PORT ??= "4100";
process.env.DATABASE_URL ??= "mysql://unused:unused@127.0.0.1:3301/unused";
process.env.JWT_SECRET ??= "test-only-secret-with-at-least-32-characters!";

const VALID_CONTACT = {
  name: "John Smith",
  email: "john@example.com",
  phone: "0551234567",
  services: "HVAC",
  message: "Need a new AC unit installed.",
  "g-recaptcha-response": "captcha-token",
  website: "",
};

const VALID_QUOTE = {
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "0509876543",
  services: "Plumbing",
  "g-recaptcha-response": "captcha-token",
  website: "",
};

// Stateful fakes, keyed on the same module paths the routes import. The real
// modules must not load: mock.module rewires the import graph before app.ts.
const created: Array<Record<string, unknown>> = [];
const fakePrisma = {
  submission: {
    create: async ({ data }: { data: Record<string, unknown> }) => {
      created.push(data);
      return { id: created.length, ...data };
    },
  },
};
mock.module("../src/lib/prisma.js", { namedExports: { prisma: fakePrisma } });

interface MailCall {
  kind: "customer" | "admin";
  data: unknown;
}
const mailCalls: MailCall[] = [];
mock.module("../src/lib/mailer.js", {
  namedExports: {
    sendCustomerConfirmation: async (data: unknown) => {
      mailCalls.push({ kind: "customer", data });
    },
    sendAdminNotification: async (data: unknown) => {
      mailCalls.push({ kind: "admin", data });
    },
  },
});

let recaptchaOk = true;
mock.module("../src/lib/recaptcha.js", {
  namedExports: { verifyRecaptcha: async () => recaptchaOk },
});

const { createApp } = await import("../src/app.js");

let server: Server;
let baseUrl: string;

async function boot(): Promise<{ server: Server; baseUrl: string }> {
  const srv = createApp({ submissionRateLimit: 100 }).listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => srv.once("listening", resolve));
  const { port } = srv.address() as AddressInfo;
  return { server: srv, baseUrl: `http://127.0.0.1:${port}` };
}

async function request(path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

function post(body: unknown): Promise<Response> {
  return request("/api/v1/contact", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

before(async () => {
  ({ server, baseUrl } = await boot());
});

after(async () => {
  mock.reset();
  await new Promise<void>((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
});

test("POST /api/v1/contact with a valid payload returns 200, persists a CONTACT lead and sends both emails", async () => {
  const countBefore = created.length;
  const res = await post(VALID_CONTACT);

  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });

  const inserted = created[created.length - 1]!;
  assert.equal(created.length, countBefore + 1);
  assert.equal(inserted.source, "CONTACT");
  assert.equal(inserted.name, "John Smith");
  assert.equal(inserted.email, "john@example.com");
  assert.equal(inserted.phone, "0551234567");
  assert.equal(inserted.services, "HVAC");
  assert.equal(inserted.message, "Need a new AC unit installed.");
  assert.match(String(inserted.ip), /^\d+\.\d+\.\d+\.\*/);

  const customer = mailCalls.filter((call) => call.kind === "customer");
  const admin = mailCalls.filter((call) => call.kind === "admin");
  assert.equal(customer.length, 1);
  assert.equal(admin.length, 1);
  assert.equal((customer[0]!.data as { source: string }).source, "CONTACT");
  assert.equal((admin[0]!.data as { name: string }).name, "John Smith");
});

test("POST /api/v1/quote with a valid payload persists a QUOTE lead (no message)", async () => {
  const res = await request("/api/v1/quote", {
    method: "POST",
    body: JSON.stringify(VALID_QUOTE),
  });

  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });

  const inserted = created[created.length - 1]!;
  assert.equal(inserted.source, "QUOTE");
  assert.equal(inserted.message, null);
  assert.equal(inserted.name, "Jane Doe");
});

test("invalid payload returns 400 with per-field errors", async () => {
  const res = await post({
    name: "John123", // digits not allowed in name
    email: "not-an-email",
    phone: "abc123", // letters are not digits
    services: "",
    message: "ok",
    "g-recaptcha-response": "captcha-token",
  });

  assert.equal(res.status, 400);
  const body = (await res.json()) as { code: string; details: { fields: Record<string, string> } };
  assert.equal(body.code, "validation_error");
  assert.equal(typeof body.details.fields.name, "string");
  assert.equal(typeof body.details.fields.email, "string");
  assert.equal(typeof body.details.fields.phone, "string");
  assert.equal(typeof body.details.fields.services, "string");
});

test("message with <script> or links is rejected with a field error", async () => {
  const res = await post({
    ...VALID_CONTACT,
    message: "<script>alert(1)</script>",
  });
  assert.equal(res.status, 400);
  const body = (await res.json()) as { details: { fields: { message: string } } };
  assert.ok(body.details.fields.message.length > 0);
});

test("honeypot-filled submission is silently dropped (200, nothing persisted, no email)", async () => {
  const countBefore = created.length;
  const mailsBefore = mailCalls.length;
  const res = await post({ ...VALID_CONTACT, website: "https://spam.example" });

  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  assert.equal(created.length, countBefore);
  assert.equal(mailCalls.length, mailsBefore);
});

test("a rejected reCAPTCHA token returns 400 recaptcha_failed and persists nothing", async () => {
  recaptchaOk = false;
  try {
    const countBefore = created.length;
    const res = await post(VALID_CONTACT);
    assert.equal(res.status, 400);
    const body = (await res.json()) as { code: string };
    assert.equal(body.code, "recaptcha_failed");
    assert.equal(created.length, countBefore);
  } finally {
    recaptchaOk = true;
  }
});

test("more than 5 submissions per minute from one IP return 429", async () => {
  // A fresh app instance gets a fresh limiter with the real default of 5/min.
  recaptchaOk = true;
  const limited = createApp().listen(0, "127.0.0.1");
  try {
    await new Promise<void>((resolve) => limited.once("listening", resolve));
    const { port } = limited.address() as AddressInfo;
    const url = `http://127.0.0.1:${port}`;

    for (let i = 0; i < 5; i += 1) {
      const res = await fetch(`${url}/api/v1/quote`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(VALID_QUOTE),
      });
      assert.equal(res.status, 200, `request ${i + 1} should be allowed`);
    }

    const blocked = await fetch(`${url}/api/v1/contact`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(VALID_CONTACT),
    });
    assert.equal(blocked.status, 429);
    const body = (await blocked.json()) as { code: string };
    assert.equal(body.code, "rate_limited");
  } finally {
    await new Promise<void>((resolve, reject) => {
      limited.close((err) => (err ? reject(err) : resolve()));
    });
  }
});