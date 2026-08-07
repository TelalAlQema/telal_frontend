import express from "express";
import type { AddressInfo } from "node:net";

const PORT = Number(process.env.PORT ?? 4000);
const HOST = process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1";

const app = express();

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "telal-backend" });
});

app.use((_req, res) => {
  res.status(404).json({ status: "not_found" });
});

const server = app.listen(PORT, HOST, () => {
  const { address, port } = server.address() as AddressInfo;
  console.log(`backend dev server listening on http://${address}:${port}`);
});

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Set PORT in backend/.env to change it.`);
  } else {
    console.error("Server error:", err);
  }
  process.exitCode = 1;
});
