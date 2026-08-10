import assert from "node:assert/strict";
import type { Server } from "node:http";
import type { AddressInfo } from "node:net";
import { after, before, test } from "node:test";

// Env must be present before the app module (which validates env on import) loads.
process.env.NODE_ENV = "test";
process.env.PORT ??= "4099";
process.env.DATABASE_URL ??= "mysql://unused:unused@127.0.0.1:3301/unused";
process.env.JWT_SECRET ??= "test-only-secret-with-at-least-32-characters!";

const { createApp } = await import("../src/app.js");

let server: Server;
let baseUrl: string;

before(async () => {
  server = createApp().listen(0, "127.0.0.1");
  await new Promise<void>((resolve) => server.once("listening", resolve));
  const { port } = server.address() as AddressInfo;
  baseUrl = `http://127.0.0.1:${port}`;
});

after(async () => {
  await new Promise<void>((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
});

test("GET /health returns 200 ok", async () => {
  const res = await fetch(`${baseUrl}/health`);
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type") ?? "", /^application\/json/);
  assert.deepEqual(await res.json(), { status: "ok", service: "telal-backend" });
});

test("unknown route returns 404 JSON", async () => {
  const res = await fetch(`${baseUrl}/does-not-exist`);
  assert.equal(res.status, 404);
  assert.deepEqual(await res.json(), { status: "not_found" });
});

test("malformed JSON body returns 400 invalid_json", async () => {
  const res = await fetch(`${baseUrl}/health`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{not json",
  });
  assert.equal(res.status, 400);
  const body = (await res.json()) as { code: string };
  assert.equal(body.code, "invalid_json");
});

test("security headers are set and x-powered-by is hidden", async () => {
  const res = await fetch(`${baseUrl}/health`);
  assert.equal(res.headers.get("x-content-type-options"), "nosniff");
  assert.equal(res.headers.get("x-powered-by"), null);
});