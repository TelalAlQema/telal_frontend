import { Router } from "express";
import { z } from "zod";
import type { Prisma } from "../generated/prisma/client.js";
import { SubmissionSource } from "../generated/prisma/enums.js";
import { AppError } from "../lib/http-error.js";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/require-auth.js";
import { zodFieldErrors } from "../validation/lead.js";

const SOURCE_VALUES = Object.values(SubmissionSource) as [SubmissionSource, ...SubmissionSource[]];

// Query params drive a Prisma where/filter — never string-interpolated SQL.
const listQuerySchema = z.object({
  source: z.enum(SOURCE_VALUES).optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

const idSchema = z.coerce.number().int().positive();

export const adminRouter = Router();

adminRouter.use(requireAuth);

adminRouter.get("/submissions", async (req, res) => {
  const parsed = listQuerySchema.safeParse(req.query);
  if (!parsed.success) {
    throw new AppError(400, "validation_error", "Invalid query parameters.", zodFieldErrors(parsed.error));
  }

  const { source, page, pageSize } = parsed.data;
  const where: Prisma.SubmissionWhereInput = source !== undefined ? { source } : {};

  const [items, total] = await Promise.all([
    prisma.submission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.submission.count({ where }),
  ]);

  res.json({
    items,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  });
});

adminRouter.patch("/submissions/:id/read", async (req, res) => {
  const id = idSchema.safeParse(req.params.id);
  if (!id.success) {
    throw new AppError(400, "validation_error", "Invalid submission id.");
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const read = typeof body.read === "boolean" ? body.read : true;

  const existing = await prisma.submission.findUnique({ where: { id: id.data } });
  if (existing === null) {
    throw new AppError(404, "not_found", "Submission not found.");
  }

  const updated = await prisma.submission.update({ where: { id: id.data }, data: { read } });
  res.json(updated);
});

adminRouter.delete("/submissions/:id", async (req, res) => {
  const id = idSchema.safeParse(req.params.id);
  if (!id.success) {
    throw new AppError(400, "validation_error", "Invalid submission id.");
  }

  const existing = await prisma.submission.findUnique({ where: { id: id.data } });
  if (existing === null) {
    throw new AppError(404, "not_found", "Submission not found.");
  }

  await prisma.submission.delete({ where: { id: id.data } });
  res.status(204).send();
});