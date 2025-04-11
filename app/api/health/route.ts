import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Specify Node.js runtime
export const runtime = 'nodejs';

export async function GET() {
  const startTime = Date.now();
  const healthStatus = {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'unknown',
    database: 'checking...',
    responseTime: 0,
  };

  try {
    // Test database connection with a simple query
    await prisma.$queryRaw`SELECT 1 as connection_test`;
    healthStatus.database = 'connected';
  } catch (error) {
    console.error('Health check database error:', error);
    healthStatus.database = 'error';
    
    // Add error details
    if (error instanceof Error) {
      // @ts-ignore - Adding custom field
      healthStatus.databaseError = error.message;
    }
  }

  // Calculate response time
  healthStatus.responseTime = Date.now() - startTime;
  
  return NextResponse.json(healthStatus);
} 