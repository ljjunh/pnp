import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

prisma.$on('query', (e) => {
  console.log('Duration: ' + e.duration + 'ms');
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
