import { PrismaClient } from '@prisma/client';

// Declare global variable for PrismaClient to ensure it's not recreated on hot reloads in development
declare global {
  var prisma: PrismaClient | undefined;
}

// Create a singleton instance of PrismaClient
export const prisma = global.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// If not in production, attach the instance to the global object to prevent multiple instances during hot reloads
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
