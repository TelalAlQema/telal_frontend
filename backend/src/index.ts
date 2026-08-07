import type { AddressInfo } from "node:net";
import { createApp } from "./app.js";
import { loadEnv } from "./config.js";

const env = (() => {
  try {
    return loadEnv();
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }
})();

const app = createApp();

const server = app.listen(
  env.PORT,
  env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1",
  () => {
    // On bind failure (e.g. EADDRINUSE) Express may still invoke this callback
    // with the server not yet addressable; the server.on("error") handler is
    // the source of truth for bind failures.
    const addr = server.address();
    if (!addr) return;
    const { address, port } = addr as AddressInfo;
    console.log(`backend dev server listening on http://${address}:${port}`);
  },
);

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${env.PORT} is already in use. Set PORT in backend/.env to change it.`);
  } else {
    console.error("Server error:", err);
  }
  process.exitCode = 1;
});