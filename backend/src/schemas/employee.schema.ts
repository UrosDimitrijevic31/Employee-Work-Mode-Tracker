import { z } from 'zod';

export const employeeCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  title: z.string().optional(),
  role: z.enum(['employee', 'manager'])
});

export const employeeUpdateSchema = employeeCreateSchema.partial().extend({
  password: z.string().min(6).optional()
});

export type EmployeeCreateInput = z.infer<typeof employeeCreateSchema>;
export type EmployeeUpdateInput = z.infer<typeof employeeUpdateSchema>;
