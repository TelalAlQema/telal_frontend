import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(4000),
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required (e.g. mysql://user:pass@host:port/telalalqema)"),
  CORS_ORIGIN: z
    .string()
    .optional()
    .default("http://localhost:3000")
    .transform((value) =>
      value
        .split(",")
        .map((origin) => origin.trim())
        .filter((origin) => origin.length > 0),
    ),
});

export type Env = z.infer<typeof EnvSchema>;

export class EnvError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "EnvError";
  }
}

let cached: Env | undefined;

export function loadEnv(path = ".env"): Env {
  try {
    process.loadEnvFile(path);
  } catch (err) {
    // Missing .env is fine in production/CI where vars are injected. Any other
    // .env failure (bad syntax, unreadable) must surface loudly.
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") {
      throw new EnvError(`Failed to load environment file "${path}": ${(err as Error).message}`);
    }
  }

  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");
    throw new EnvError(`Invalid environment configuration:\n${details}`);
  }

  cached = parsed.data;
  return cached;
}

export function getEnv(): Env {
  if (!cached) cached = loadEnv();
  return cached;
}