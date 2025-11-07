import { Request, Response } from 'express';

import { prisma } from '../prisma/client';
import { workStatusCreateSchema, workStatusUpdateSchema } from '../schemas/workstatus.schema';

export async function listWorkStatus(req: Request, res: Response) {
  const { userId, start, end } = req.query;
  const where: any = {};
  if (userId) where.userId = Number(userId);
  if (start || end) {
    where.date = {};
    if (start) where.date.gte = new Date(String(start));
    if (end) where.date.lte = new Date(String(end));
  }
  const logs = await prisma.workStatus.findMany({ where });
  res.json(logs);
}

export async function createWorkStatus(req: Request, res: Response) {
  const parsed = workStatusCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten() });
  const { userId, date, status } = parsed.data;

  // Normalize date to YYYY-MM-DD (strip time) to match @db.Date storage
  const normalizedDate = new Date(date);
  const existing = await prisma.workStatus.findUnique({
    where: {
      userId_date: { userId, date: normalizedDate },
    },
  });

  if (existing) {
    const updated = await prisma.workStatus.update({
      where: { id: existing.id },
      data: { status },
    });
    return res.status(200).json(updated);
  }

  const created = await prisma.workStatus.create({
    data: { userId, date: normalizedDate, status },
  });
  res.status(201).json(created);
}

export async function updateWorkStatus(req: Request, res: Response) {
  const id = Number(req.params.id);
  const parsed = workStatusUpdateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten() });
  const data: any = { ...parsed.data };
  if (data.date) data.date = new Date(data.date);
  const updated = await prisma.workStatus.update({ where: { id }, data });
  res.json(updated);
}
