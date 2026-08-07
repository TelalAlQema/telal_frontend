import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma.js";

const SALT_ROUNDS = 12;

async function main(): Promise<void> {
  const email = process.env.ADMIN_SEED_EMAIL;
  const password = process.env.ADMIN_SEED_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD must be set in backend/.env " +
        "(gitignored) to seed the admin user.",
    );
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  // Idempotent: creates the admin on first run, does not clobber an existing
  // password hash afterwards.
  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash },
  });

  console.log(`Admin seeded: ${admin.email} (id=${admin.id})`);
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });