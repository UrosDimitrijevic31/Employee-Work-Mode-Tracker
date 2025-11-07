import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

// Optional: log connection status
prisma.$connect().then(() => {
  console.log('[prisma] Connected to database');
});
