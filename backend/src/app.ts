import cors from "cors";
import express from "express";
import helmet from "helmet";
import { getEnv } from "./config.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";
import { requestLogger } from "./middleware/request-logger.js";

export function createApp(): express.Express {
  const env = getEnv();
  const app = express();

  app.disable("x-powered-by");
  app.use(helmet());
  app.use(cors({ origin: env.CORS_ORIGIN }));
  app.use(express.json({ limit: "16kb" }));
  app.use(requestLogger());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "telal-backend" });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}