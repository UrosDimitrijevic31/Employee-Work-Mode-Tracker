import { Request, Response } from 'express';

import { prisma } from '../prisma/client';
import { employeeCreateSchema, employeeUpdateSchema } from '../schemas/employee.schema';
import { hashPassword } from '../utils/hash';

export async function listEmployees(_req: Request, res: Response) {
  const employees = await prisma.user.findMany();
  res.json(employees);
}

export async function createEmployee(req: Request, res: Response) {
  const parsed = employeeCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten() });
  const { name, email, password, title, role } = parsed.data;
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return res.status(409).json({ message: 'Email already in use' });
  const hashed = await hashPassword(password);
  const created = await prisma.user.create({
    data: { name, email, password: hashed, title, role },
  });
  res
    .status(201)
    .json({ id: created.id, name: created.name, email: created.email, role: created.role });
}

export async function updateEmployee(req: Request, res: Response) {
  const id = Number(req.params.id);
  const parsed = employeeUpdateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten() });
  const data: any = { ...parsed.data };
  if (data.password) {
    data.password = await hashPassword(data.password);
  }
  const updated = await prisma.user.update({ where: { id }, data });
  res.json({ id: updated.id, name: updated.name, email: updated.email, role: updated.role });
}

export async function deleteEmployee(req: Request, res: Response) {
  const id = Number(req.params.id);
  await prisma.user.delete({ where: { id } });
  res.status(204).send();
}
