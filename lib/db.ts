import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Log database URL configuration (without sensitive info)
const dbUrlForLogging = process.env.DATABASE_URL 
  ? `${process.env.DATABASE_URL.split('://')[0]}://${process.env.DATABASE_URL.split('@')[1] || '[redacted]'}`
  : 'DATABASE_URL not set';

console.log(`Initializing Prisma client in ${process.env.NODE_ENV} mode`);
console.log(`Database connection: ${dbUrlForLogging}`);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    // Adding connection timeout configuration for production environments
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

// Test database connection on initialization
(async () => {
  try {
    // Simple query to test connection
    await prisma.$queryRaw`SELECT 1 as connection_test`;
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error);
    console.error('This might cause API routes to fail');
  }
})();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma; 