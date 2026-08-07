import { defineConfig, env } from "prisma/config";

try {
  process.loadEnvFile();
} catch {
  // No .env file present — rely on environment variables already set (e.g. production/CI).
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});