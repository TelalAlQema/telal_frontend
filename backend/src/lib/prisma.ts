import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client.js";
import { getEnv } from "../config.js";

const globalForPrisma = globalThis as unknown as { __telalPrisma?: PrismaClient };

export const prisma =
  globalForPrisma.__telalPrisma ??
  new PrismaClient({ adapter: new PrismaMariaDb(getEnv().DATABASE_URL) });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.__telalPrisma = prisma;
}