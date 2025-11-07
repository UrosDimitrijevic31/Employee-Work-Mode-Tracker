import dotenv from 'dotenv';

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT || 5000),
  DATABASE_URL: process.env.DATABASE_URL || '',
  JWT_SECRET: process.env.JWT_SECRET || 'dev_secret'
};

if (!env.DATABASE_URL) {
  console.warn('[env] DATABASE_URL is not set. Prisma will fail to connect.');
}
