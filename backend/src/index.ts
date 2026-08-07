import { createServer } from "node:http";
import type { AddressInfo } from "node:net";

const PORT = Number(process.env.PORT ?? 4000);
const HOST = process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1";

const server = createServer((req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (req.url === "/health") {
    res.writeHead(200);
    res.end(JSON.stringify({ status: "ok", service: "telal-backend" }));
    return;
  }
  res.writeHead(404);
  res.end(JSON.stringify({ status: "not_found" }));
});

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use. Set PORT in backend/.env to change it.`);
  } else {
    console.error("Server error:", err);
  }
  process.exitCode = 1;
});

server.listen(PORT, HOST, () => {
  const { address, port } = server.address() as AddressInfo;
  console.log(`backend dev server listening on http://${address}:${port}`);
});