import { z } from 'zod';

export const workStatusCreateSchema = z.object({
  userId: z.number().int().positive(),
  date: z.string().datetime(),
  status: z.enum(['remote', 'office', 'sick_leave', 'vacation', 'holiday'])
});

export const workStatusUpdateSchema = workStatusCreateSchema.partial();

export type WorkStatusCreateInput = z.infer<typeof workStatusCreateSchema>;
export type WorkStatusUpdateInput = z.infer<typeof workStatusUpdateSchema>;
