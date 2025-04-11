import { PrismaClient, Prisma } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Safely log database URL without exposing credentials
const getSecureDbUrl = (url?: string): string => {
  if (!url) return 'DATABASE_URL not set';
  try {
    // Extract protocol and domain parts only
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`;
  } catch {
    return 'Invalid DATABASE_URL format';
  }
};

// Connection options with performance settings
const connectionOptions: Prisma.PrismaClientOptions = {
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn'] as Prisma.LogLevel[]
    : ['error'] as Prisma.LogLevel[],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
};

// Create Prisma client with connection pooling
export const prisma = globalForPrisma.prisma ?? new PrismaClient(connectionOptions);

// Initialize database - Retry logic for better resilience
const initDatabase = async (retries = 3, delay = 1000): Promise<boolean> => {
  try {
    // Log connection attempt for debug purposes
    if (process.env.NODE_ENV === 'development') {
      console.log(`Initializing Prisma client in ${process.env.NODE_ENV} mode`);
      console.log(`Database connection: ${getSecureDbUrl(process.env.DATABASE_URL)}`);
    }
    
    // Ping the database to test connection
    await prisma.$queryRaw`SELECT 1 as connection_test`;
    
    if (process.env.NODE_ENV === 'development') {
      console.log('Database connection successful');
    }
    
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    
    if (retries > 0) {
      console.log(`Retrying database connection in ${delay}ms... (${retries} attempts remaining)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return initDatabase(retries - 1, delay * 1.5);
    } else {
      console.error('Database connection failed after multiple attempts');
      return false;
    }
  }
};

// Initialize the database connection
initDatabase()
  .catch(e => {
    console.error('Failed to initialize database:', e);
  });

// Save reference to global object in development
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Create a wrapper with automatic reconnection
export const db = {
  ...prisma,
  // Add auto-reconnection wrapper for common operations
  reconnect: async () => {
    await prisma.$disconnect();
    return initDatabase();
  }
}; 